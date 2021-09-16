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
const bcrypt = require("bcrypt");
const saltRounds = 10;
var ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
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
      try {
        let userWithSameCode = await User.find({ inviteCode: newCode });
        if (!userWithSameCode.length) {
          const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            $set: { inviteCode: newCode },
          });
          return res.status(200).send({
            status: 200,
            message: "Successfully updated the Code!!",
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
    }
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No user found!" });
  }
};
// exports.bank = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findOne({ _id: userId }).exec();

//     if (!user) {
//       return res.status(200).send({
//         status: 400,
//         message: "Something went wrong!",
//       });
//     } else {
//       const firstDegreeFols = await User.find({ invitedBy: user._id });
//       const firstDegreeFolsLength = firstDegreeFols.length;
//       let secondDegreeFolsLength = 0;

//       await Promise.all(
//         firstDegreeFols.map(async (user) => {
//           await User.find({ invitedBy: user._id }, (err, users) => {
//             var update = User.findByIdAndUpdate(
//               user._id,
//               {
//                 FirstDegreeCount: users.length,
//               },
//               { new: true }
//             );
//             secondDegreeFolsLength = secondDegreeFolsLength + users.length;
//           });

//           return secondDegreeFolsLength;
//         })
//       );

//       // for (let i = 0; i < firstDegreeFolsLength; i++) {
//       //   await User.find(
//       //     { invitedBy: firstDegreeFols[i]._id },
//       //     async (err, users) => {
//       //       var update = await User.findByIdAndUpdate(
//       //         firstDegreeFols[i]._id,
//       //         {
//       //           FirstDegreeCount: users.length,
//       //         },
//       //         { new: true }
//       //       );
//       //       console.log("length", users.length);
//       //       secondDegreeFolsLength += users.length;
//       //     }
//       //   );
//       // }
//       var update = await User.findByIdAndUpdate(
//         userId,
//         {
//           FirstDegreeCount: firstDegreeFolsLength,
//           SecondDegreeCount: secondDegreeFolsLength,
//         },
//         { new: true }
//       );
//       console.log("update", update);
//     }
//   } catch (e) {
//     return res.status(200).send({ status: 400, message: "No user found!" });
//   }
// };

exports.followersAgainstAffiliate = async (req, res, next) => {
  try {
    const id = req.user._id;
    const users = await User.find({
      invitedBy: id,
    });
    const count = await User.count({
      invitedBy: id,
    });
    return res.status(200).json({ status: 200, users: users, count: count });
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No Follower Found!" });
  }
};

exports.affiliateProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).exec();
    // console.log("p ",user.password);

    return res.json({ user: user, password: user.password });
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
          let hash = 0;
          if (data.password) {
            const salt = await bcrypt.genSalt(parseInt(saltRounds));
            hash = await bcrypt.hash(data.password, salt);
          }
          var data2 = {
            password: hash,
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
        return res.status(400).send({ message: "Passwords are not same!!" });
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
      oldPassword: Joi.string().min(8).max(30).required(),
      password: Joi.string().min(8).max(30).required(),
    });
    const result = scheme.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: result.error.message });
    } else {
      const id = req.params.id;
      const user = await User.findOne({ _id: id }).exec();
      let hashedOldPass = 0;
      if (req.body.oldPassword) {
        bcrypt.compare(
          req.body.oldPassword,
          user.password,
          async (err, result) => {
            if (err || !result) {
              return res.status(403).send({
                status: 403,
                message: "You entered incorect old password!",
              });
            } else {
              let hash = 0;
              if (req.body.password) {
                const salt = await bcrypt.genSalt(parseInt(saltRounds));
                hash = await bcrypt.hash(req.body.password, salt);
              }
              var data = {
                password: hash,
              };

              var update = await User.findByIdAndUpdate(id, {
                password: data.password,
              });

              return res.status(200).json({
                status: 200,
                user: update,
              });
            }
          }
        );
      }

      // if (hashedOldPass != user.password) {
      //   return res
      //     .status(403)
      //     .send({ status: 403, message: "You entered incorect old password!" });
      // } else {

      // }
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.followersInThisMonth = async (req, res) => {
  try {
    presentMonthYear = myDate.toString().substr(0, 7);
    const startOfMonth = moment().startOf("month").toDate();

    const reqId = req.body.id;

    let id;
    if (reqId) {
      id = ObjectId(reqId);
    } else {
      id = req.user._id;
    }
    User.aggregate(
      [
        {
          $match: {
            invitedBy: id,

            created: {
              $gte: new Date(startOfMonth),
              $lt: new Date(Date.now()),
            },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
            count: { $sum: 1 },
          },
        },
      ],

      function (err, result) {
        if (err) {
          return res.send(err);
        } else {
          return res.status(200).json({ status: 200, followersPerDay: result });
        }
      }
    );
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
exports.PiChartData = async (req, res) => {
  try {
    const reqId = req.body.id;

    var id;
    if (reqId) {
      id = ObjectId(reqId);
    } else {
      id = req.user._id;
    }
    var thisWeekFoll = await thisWeekFollowersCount(id);
    var thisMonthFoll = await thisMonthFollCount(id);
    var totalFollCount = await totalFollowersCount(id);
    var lastWeekFolls = await lastWeekFollCount(id);

    // console.log("thisWeekFoll", thisWeekFoll);
    // console.log("thisMonthFoll", thisMonthFoll);
    // console.log("totalFollCount", totalFollCount);
    // console.log("lastWeekFolls", lastWeekFolls);

    return res.status(200).json({
      status: 200,
      thisWeekFoll: thisWeekFoll,
      thisMonthFoll: thisMonthFoll,
      totalFollCount: totalFollCount,
      lastWeekFolls: lastWeekFolls,
    });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

exports.followersInThisYear = async (req, res) => {
  try {
    const startOfYear = moment().startOf("year").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    reqId = req.body.id;
    var id;
    if (reqId) {
      id = ObjectId(reqId);
    } else {
      id = req.user._id;
    }

    const result = await User.aggregate([
      {
        $match: {
          invitedBy: id,
          created: {
            $gte: new Date(startOfYear.toString()),
            $lt: new Date(Date.now()),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$created" },
            year: { $year: "$created" },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    var currentYearfoll = [];
    for (var i = 0; i < 12; i++) {
      currentYearfoll.push(0);
    }
    if (result.length > 0) {
      for (var i = 0; i < result.length; i++) {
        currentYearfoll[parseInt(result[i]._id.month) - 1] = result[i].count;
      }
    }
    return res
      .status(200)
      .json({ status: 200, currentYearFoll: currentYearfoll });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }

  // try {
  //   presentYear = myDate.toString().substr(0, 4);

  //   reqId = req.body.id;
  //   var id;
  //   if (reqId) {
  //     id = reqId;
  //   } else {
  //     id = req.user._id;
  //   }
  //   const affiliate = await User.findOne({ _id: id }, (err, affiliate) => {
  //     const followersPerMonth = affiliate.followersPerMonth;
  //     currentYearFoll = [];
  //     if (followersPerMonth.length <= 12) {
  //       for (let i = 0; i < followersPerMonth.length; i++) {
  //         if (followersPerMonth[i][0].substr(0, 4) == presentYear) {
  //           currentYearFoll.push(followersPerMonth[i][1]);
  //         }
  //       }
  //       // return currentYearFoll;
  //     } else {
  //       var numofCurMonFoll = followersPerMonth.length % 12;
  //       let i = followersPerMonth.length + 1 - numofCurMonFoll;
  //       for (i; i < followersPerMonth.length; i++) {
  //         currentYearFoll.push(followersPerMonth[i][1]);
  //       }
  //       let y = 12 - currentYearFoll.length;
  //       for (var j = 0; j < y; j++) {
  //         currentYearFoll.push(0);
  //       }
  //       // return currentYearFoll;
  //     }
  //   }).exec();

  //   return res
  //     .status(200)
  //     .json({ status: 200, currentYearFoll, currentYearFoll });
  // } catch (err) {
  //   return res.status(400).send(err.message);
  // }
};
async function followersCountPerDay() {
  try {
    presentDate = myDate.toString().substr(0, 10);

    var followersPerDay = [];

    const affiliate = await User.find(
      { role: "Affiliate", isDeleted: false },
      async (err, affiliates) => {
        if (affiliates.length > 0) {
          for (var i = 0; i < affiliates.length; i++) {
            try {
              let followers = await User.find({
                invitedBy: affiliates[i]._id,
              });
              if (followers.length > 0) {
                var count = 0;
                for (var j = 0; j < followers.length; j++) {
                  if (
                    moment(followers[j].created)
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
async function thisWeekFollowersCount(id) {
  try {
    const start = moment().weekday(1).format();
    const end = moment().weekday(7).format();

    const result = await User.aggregate([
      {
        $match: {
          invitedBy: ObjectId(id),
          created: {
            $gte: new Date(start),
            $lt: new Date(end),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
        },
        $group: { _id: null, count: { $sum: 1 } },
      },
    ]);
    if (result.length > 0) {
      return result[0].count;
    } else {
      return 0;
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
}
async function lastWeekFollCount(id) {
  try {
    const oneDay = 1000 * 60 * 60 * 24,
      oneWeek = oneDay * 7;

    const last = moment().weekday(-1);
    const lastDay = last - (last % oneDay) + oneDay;
    const firstDay = lastDay - oneWeek;
    // Run the aggregation
    var count = 0;
    const result = await User.aggregate([
      // $match is a query to select the week
      {
        $match: {
          invitedBy: id,
          created: {
            $gte: new Date(moment(firstDay).format()),
            $lt: new Date(moment(last).format()),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
        },
        $group: { _id: null, count: { $sum: 1 } },
      },
    ]);
    if (result.length > 0) {
      return result[0].count;
    } else {
      return 0;
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
  // try {
  //   var prevYear = moment()
  //     .subtract(1, "year")
  //     .format()
  //     .toString()
  //     .substr(0, 4);
  //   const id = idd;
  //   var count = 0;
  //   const affiliate = await User.find({ _id: id }, async (err, affiliate) => {
  //     if (affiliate) {
  //       followersPerYear = affiliate[0].followersPerMonth;

  //       for (var i = 0; i < followersPerYear.length; i++) {
  //         if (followersPerYear[i][0].toString().substr(0, 4) == prevYear) {
  //           count = count + followersPerYear[i][1];
  //         } else {
  //           count = count + 0;
  //         }
  //       }
  //     } else {
  //       console.log(err.message);
  //     }
  //   });
  //   return count;
  // } catch (err) {
  //   console.log(err.message);
  // }
}
async function thisMonthFollCount(id) {
  try {
    const startOfMonth = moment().startOf("month").toDate();

    // Run the aggregation

    const result = await User.aggregate([
      // $match is a query to select the week
      {
        $match: {
          invitedBy: id,
          created: {
            $gte: new Date(startOfMonth),
            $lt: new Date(Date.now()),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
        },
        $group: { _id: null, count: { $sum: 1 } },
      },

      // $group to count the total
    ]);
    if (result.length > 0) {
      return result[0].count;
    } else {
      return 0;
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }

  // try {
  //   presentMonthYear = myDate.toString().substr(0, 7);
  //   const id = idd;
  //   var count = 0;

  //   const affiliatee = await User.find({ _id: id }, async (err, affiliate) => {
  //     if (affiliate) {
  //       followersPerDay = affiliate[0].followersPerDay;
  //       for (let j = 0; j < followersPerDay.length; j++) {
  //         if (followersPerDay[j][0].substr(0, 7) == presentMonthYear) {
  //           count = count + followersPerDay[j][1];
  //         } else {
  //           count = count + 0;
  //         }
  //       }
  //     } else {
  //       console.log(err.message);
  //     }
  //   });
  //   return count;
  // } catch (err) {
  //   console.log(err.message);
  // }
}
async function totalFollowersCount(id) {
  try {
    const result = await User.aggregate([
      {
        $match: {
          invitedBy: id,
          created: {
            $gte: new Date("01-01-2000"),
            $lt: new Date(Date.now()),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
        },
        $group: { _id: null, count: { $sum: 1 } },
      },

      // $group to count the total
    ]);
    if (result.length > 0) {
      return result[0].count;
    } else {
      return 0;
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
  // try {
  //   var prevMonthYear = moment().date(0).format().toString().substr(0, 7);
  //   const id = idd;
  //   var count = 0;
  //   const affiliatee = await User.find({ _id: id }, async (err, affiliate) => {
  //     if (affiliate) {
  //       followersPerMonth = affiliate[0].followersPerMonth;

  //       for (var i = 0; i < followersPerMonth.length; i++) {
  //         if (followersPerMonth[i][0].toString() == prevMonthYear) {
  //           count = count + followersPerMonth[i][1];
  //         } else {
  //           count = count + 0;
  //         }
  //       }
  //     } else {
  //       console.log(err.message);
  //     }
  //   });
  //   return count;
  // } catch (err) {
  //   console.log(err.message);
  // }
}

async function followersCountPerMonth() {
  try {
    presentMonth = myDate.toString().substr(0, 7);

    var followersPerMonth = [];

    const affiliate = await User.find(
      { role: "Affiliate", isDeleted: false },
      async (err, affiliates) => {
        try {
          if (affiliates.length > 0) {
            for (var i = 0; i < affiliates.length; i++) {
              let followers = await User.find({
                invitedBy: affiliates[i]._id,
              });

              try {
                if (followers.length > 0) {
                  var count = 0;
                  for (var j = 0; j < followers.length; j++) {
                    if (
                      moment(followers[j].created)
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
