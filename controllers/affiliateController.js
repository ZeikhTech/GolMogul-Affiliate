const User = require("../models/user");
const jwt = require("jsonwebtoken");
var Cryptr = require("cryptr");
var config = require("../config");
var jwtDecode = require("jwt-decode");
Cryptr = new Cryptr("my");
const emailVerification = require("./emailVerification");
const Joi = require("joi");
var moment = require("moment");
var cron = require("node-cron");
const { func } = require("joi");

const currentDay = new Date();
const dateNow = Date.now();
const myDate = moment(dateNow).format();
presentMonth = myDate.toString().substr(0, 7);
presentYear = myDate.toString().substr(0, 4);
var daysInMonth = moment(presentMonth).daysInMonth();

exports.editInviteCode = async (req, res, next) => {
  try {
    const schema = Joi.object({
      newCode: Joi.string().min(4),
    });
    // generatePersonalizedInviteCode(req.body.newCode);
    const result = schema.validate(req.body);
    if (result.error) {
      return res
        .status(400)
        .json({ status: 400, message: result.error.details[0].message });
    }

    const userId = req.user.id;
    const newCode = req.body.newCode;

    const user = await User.findOne({ _id: userId }).exec();
    if (!user) {
      return res.status(200).send({
        status: 400,
        message: "No Affiliate exists!",
      });
    } else {
      const role = "Follower";
      let followers = await User.find({
        role: role,
        inviteCode: user.inviteCode,
      });

      if (followers.length === 0) {
        try {
          let userWithSameCode = await User.find({ inviteCode: newCode });
          if (!userWithSameCode.length) {
            const updatedUser = await User.findByIdAndUpdate(req.user.id, {
              $set: { inviteCode: newCode },
            });
            return res.status(200).send({
              status: 200,
              message: "Successfully updated the Code1!!",
            });
          } else {
            return res
              .status(200)
              .send({ status: 402, message: "Code already exists!!" });
          }
        } catch (e) {
          return res
            .status(200)
            .send({ status: 400, message: "Something went wrong!" });
        }
      } else {
        try {
          let userWithSameCode = await User.find({ inviteCode: newCode });
          if (!userWithSameCode.length) {
            const updatedCelebrity = await User.findByIdAndUpdate(req.user.id, {
              $set: { inviteCode: newCode },
            });
            const updatedFollwers = await User.update(
              { inviteCode: req.user.inviteCode },
              {
                $set: { inviteCode: newCode },
              },
              { multi: true }
            );

            // var updated = User.find({inviteCode:newCode})

            return res.status(200).send({
              status: 200,
              message: "Successfully updated the Code!!",
              user: updatedFollwers,
            });
          } else {
            return res
              .status(200)
              .send({ status: 402, message: "Code already exists!!" });
          }
        } catch (e) {
          return res.status(400).send({ message: "Something went wrong!!" });
        }
      }
    }
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No user found!" });
  }
};

exports.followersAgainstAffiliate = async (req, res, next) => {
  try {
    const id = req.user._id;
    const affiliate = await User.findOne({ _id: id }).exec();
    const affiliateinviteCode = affiliate.inviteCode;

    const role = "Follower";
    const user = await User.find({
      role: role,
      inviteCode: affiliateinviteCode,
      isDeleted: false,
    });
    return res.status(200).json({ status: 200, users: user });
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No Follower Found!" });
  }
};

exports.affiliateProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await User.findOne({ _id: id }).exec();
    var upassword = Cryptr.decrypt(user.password);
    return res.json({ message: "success", user: user, password: upassword });
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No user found!" });
  }
};
exports.editProfile = async (req, res, next) => {
  const id = req.params.id;

  // const id = req.body.id;
  const scheme = Joi.object({
    //JOI Validations
    name: Joi.string().min(3).max(30).required(),
  });
  const result = scheme.validate(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error.message });
  }
  const image = req.file;
  if (image) {
    if (
      !(
        image.mimetype == "image/jpeg" ||
        image.mimetype == "image/png" ||
        image.mimetype == "image/jpg"
      )
    ) {
      return res.status(400).send({ message: "Invalid file type" });
    }
    if (image.size < 5000000) {
      avatar = req.file.filename;
      console.log("ye avatr ha", avatar);
    } else {
      return res.send(400).send({ message: "File should be less than 5mbs" });
    }
  } else {
    avatar = "No file";
  }

  /////////////////Update the User //////////////////////////////

  const newUser = await User.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      avatar: avatar,
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ user: newUser, message: "Updated Successfully!", status: 201 });
};
exports.forgetPassword = async (req, res, next) => {
  try {
    const schema = Joi.object({
      password: Joi.string().max(10).min(3).required(),
      confirmPassword: Joi.string().max(10).min(3).required(),
      token: Joi.string().required(),
    });
    const joiResult = schema.validate(req.body);
    if (joiResult.error) {
      return res.status(400).send({ message: result.error.details[0].message });
    } else {
      if (req.body.password === req.body.confirmPassword) {
        var data = {
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
          token: req.body.token,
        };
        var decoded = jwtDecode(data.token);
        const userId = decoded.user;
        var result = await User.findOne({
          _id: userId,
        }).exec();
        if (result) {
          var data2 = {
            password: await Cryptr.encrypt(data.password),
          };
          var update = await User.update(
            {
              _id: userId,
            },
            {
              $set: data2,
            }
          );
          return res.status(200).json({
            status: 200,
            user: update,
          });
        } else {
          res.status(200).json({
            status: 400,
            message: "Token has been expired!!",
          });
        }
      } else {
        return res.status(400).send({ message: "passwords are not same!!" });
      }
    }
  } catch (error) {
    return res.status(200).json({
      status: 500,
      message: error,
    });
  }
};
exports.editPassword = async (req, res, next) => {
  try {
    const scheme = Joi.object({
      //JOI Validations
      password: Joi.string().min(3).max(30).required(),
    });
    const result = scheme.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: result.error.message });
    } else {
      const id = req.params.id;

      var data = {
        password: await Cryptr.encrypt(req.body.password),
      };

      var update = await User.findByIdAndUpdate(id, {
        password: data.password,
      });

      return res.status(200).json({
        status: 200,
        user: update,
      });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.followersInThisMonth = async (req, res) => {
  try {
    presentMonthYear = myDate.toString().substr(0, 7);

    const reqId = req.body.id;

    var id;
    if (reqId) {
      id = reqId;
    } else {
      id = req.user._id;
    }
    var followersPerDay = [];
    const affiliate = await User.findOne({ _id: id }, (err, affiliate) => {
      if (affiliate) {
        for (var i = 0; i < affiliate.followersPerDay.length; i++) {
          if (
            affiliate.followersPerDay[i][0].substr(0, 7) == presentMonthYear
          ) {
            followersPerDay.push(affiliate.followersPerDay[i]);
          }
        }
      }
    }).exec();
    return res.status(200).json({
      status: 200,
      followersPerDay: followersPerDay,
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
exports.PiChartData = async (req, res) => {
  try {
    const reqId = req.body.id;

    var id;
    if (reqId) {
      id = reqId;
    } else {
      id = req.user._id;
    }
    var currentMonthUsers = await currentMonthUsersCount(id);
    var LastMonthUsers = await lastMonthUsersCount(id);
    var lastYearUsers = await lastYearUsersCount(id);
    console.log("currentMonthUsers", currentMonthUsers);
    console.log("LastMonthUsers", LastMonthUsers);

    console.log("lastYearUsers", lastYearUsers);

    return res.status(200).json({
      status: 200,
      currentMonthUsers: currentMonthUsers,
      LastMonthUser: LastMonthUsers,
      lastYearUsers: lastYearUsers,
    });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};
exports.followersInThisYear = async (req, res) => {
  try {
    presentYear = myDate.toString().substr(0, 4);

    reqId = req.body.id;
    var id;
    if (reqId) {
      id = reqId;
    } else {
      id = req.user._id;
    }
    const affiliate = await User.findOne({ _id: id }, (err, affiliate) => {
      const followersPerMonth = affiliate.followersPerMonth;
      currentYearFoll = [];
      if (followersPerMonth.length <= 12) {
        for (let i = 0; i < followersPerMonth.length; i++) {
          if (followersPerMonth[i][0].substr(0, 4) == presentYear) {
            currentYearFoll.push(followersPerMonth[i][1]);
          }
        }
        // return currentYearFoll;
      } else {
        var numofCurMonFoll = followersPerMonth.length % 12;
        let i = followersPerMonth.length + 1 - numofCurMonFoll;
        for (i; i < followersPerMonth.length; i++) {
          currentYearFoll.push(followersPerMonth[i][1]);
        }
        let y = 12 - currentYearFoll.length;
        for (var j = 0; j < y; j++) {
          currentYearFoll.push(0);
        }
        // return currentYearFoll;
      }
    }).exec();

    return res
      .status(200)
      .json({ status: 200, currentYearFoll, currentYearFoll });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
async function lastYearUsersCount(idd) {
  try {
    var prevYear = moment()
      .subtract(1, "year")
      .format()
      .toString()
      .substr(0, 4);
    const id = idd;
    var count = 0;
    const affiliate = await User.find({ _id: id }, async (err, affiliate) => {
      if (affiliate) {
        followersPerYear = affiliate[0].followersPerMonth;

        for (var i = 0; i < followersPerYear.length; i++) {
          if (followersPerYear[i][0].toString().substr(0, 4) == prevYear) {
            count = count + followersPerYear[i][1];
          } else {
            count = count + 0;
          }
        }
      } else {
        console.log(err.message);
      }
    });
    return count;
  } catch (err) {
    console.log(err.message);
  }
}
async function currentMonthUsersCount(idd) {
  try {
    presentMonthYear = myDate.toString().substr(0, 7);
    const id = idd;
    var count = 0;

    const affiliatee = await User.find({ _id: id }, async (err, affiliate) => {
      if (affiliate) {
        followersPerDay = affiliate[0].followersPerDay;
        for (let j = 0; j < followersPerDay.length; j++) {
          if (followersPerDay[j][0].substr(0, 7) == presentMonthYear) {
            count = count + followersPerDay[j][1];
          } else {
            count = count + 0;
          }
        }
      } else {
        console.log(err.message);
      }
    });
    return count;
  } catch (err) {
    console.log(err.message);
  }
}
async function lastMonthUsersCount(idd) {
  try {
    var prevMonthYear = moment().date(0).format().toString().substr(0, 7);
    const id = idd;
    var count = 0;
    const affiliatee = await User.find({ _id: id }, async (err, affiliate) => {
      if (affiliate) {
        followersPerMonth = affiliate[0].followersPerMonth;

        for (var i = 0; i < followersPerMonth.length; i++) {
          if (followersPerMonth[i][0].toString() == prevMonthYear) {
            count = count + followersPerMonth[i][1];
          } else {
            count = count + 0;
          }
        }
      } else {
        console.log(err.message);
      }
    });
    return count;
  } catch (err) {
    console.log(err.message);
  }
}
async function followersCountPerDay() {
  try {
    presentDate = myDate.toString().substr(0, 10);
    const role = "Follower";

    var followersPerDay = [];

    const affiliate = await User.find(
      { role: "Affiliate", isDeleted: false },
      async (err, affiliates) => {
        if (affiliates.length > 0) {
          for (var i = 0; i < affiliates.length; i++) {
            try {
              let followers = await User.find({
                role: role,
                inviteCode: affiliates[i].inviteCode,
                isDeleted: false,
              });
              if (followers.length > 0) {
                var count = 0;
                for (var j = 0; j < followers.length; j++) {
                  if (
                    moment(followers[j].createdAt)
                      .format()
                      .toString()
                      .substr(0, 10) === presentDate
                  ) {
                    count++;
                  }
                }

                var array = affiliates[i].followersPerDay;
                followersPerDay = [...array, [presentDate, count]];

                var id = affiliates[i]._id;
                const update = await User.updateOne(
                  { _id: id },
                  {
                    $set: {
                      followersPerDay: followersPerDay,
                    },
                  }
                );
              } else {
                var dummy = [presentDate, 0];
                var array = affiliates[i].followersPerDay;
                followersPerDay = [...array, dummy];
                var id = affiliates[i]._id;
                const update = await User.updateOne(
                  { _id: id },
                  {
                    $set: {
                      followersPerDay: followersPerDay,
                    },
                  }
                );
              }
            } catch (err) {
              console.log(err.message);
            }
          }
        } else {
          console.log(err.message);
        }
      }
    );
  } catch (err) {
    console.log(err.message);
  }
}
async function followersCountPerMonth() {
  try {
    presentMonth = myDate.toString().substr(0, 7);
    const role = "Follower";

    var followersPerMonth = [];

    const affiliate = await User.find(
      { role: "Affiliate", isDeleted: false },
      async (err, affiliates) => {
        try {
          if (affiliates.length > 0) {
            for (var i = 0; i < affiliates.length; i++) {
              let followers = await User.find({
                role: role,
                inviteCode: affiliates[i].inviteCode,
                isDeleted: false,
              });
              try {
                if (followers.length > 0) {
                  var count = 0;
                  for (var j = 0; j < followers.length; j++) {
                    if (
                      moment(followers[j].createdAt)
                        .format()
                        .toString()
                        .substr(0, 7) === presentMonth
                    ) {
                      count++;
                    }
                  }

                  var array = affiliates[i].followersPerMonth;
                  followersPerMonth = [...array, [presentMonth, count]];

                  var id = affiliates[i]._id;
                  const update = await User.updateOne(
                    { _id: id },
                    {
                      $set: {
                        followersPerMonth: followersPerMonth,
                      },
                    }
                  );
                } else {
                  var dummy = [presentMonth, 0];
                  var array = affiliates[i].followersPerMonth;
                  followersPerMonth = [...array, dummy];
                  var id = affiliates[i]._id;
                  const update = await User.updateOne(
                    { _id: id },
                    {
                      $set: {
                        followersPerMonth: followersPerMonth,
                      },
                    }
                  );
                }
              } catch (err) {
                console.log(err.message);
              }
            }
          } else {
            console.log(err.message);
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  } catch (err) {
    console.log(err.message);
  }
}
cron.schedule(
  "58 23 */ * *",
  () => {
    console.log("Running for affiliates Count Per Day");
    followersCountPerDay();
  },
  {
    scheduled: true,
  }
);
cron.schedule(
  `58 23 ${daysInMonth} */ *`,
  () => {
    console.log("Running for affiliates Count Per Month");
    followersCountPerMonth();
  },
  {
    scheduled: true,
  }
);
