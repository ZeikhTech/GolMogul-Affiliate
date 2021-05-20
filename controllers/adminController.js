const Joi = require("joi");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
var Cryptr = require("cryptr");
var config = require("../config");
var jwtDecode = require("jwt-decode");
Cryptr = new Cryptr("my");
var moment = require("moment");
var cron = require("node-cron");
const emailVerification = require("./emailVerification");
let referralCodeGenerator = require("referral-code-generator");

const currentDay = new Date();
const dateNow = Date.now();
const myDate = moment(dateNow).format();
presentMonth = myDate.toString().substr(0, 7);
presentYear = myDate.toString().substr(0, 4);
var daysInMonth = moment(presentMonth).daysInMonth();

exports.registerNewUser = async (req, res, next) => {
  try {
    const scheme = Joi.object({
      //JOI Validations
      fullName: Joi.string().min(3).max(30).required(),
      gender: Joi.string().min(3).max(10).required(),
      dateOfBirth: Joi.string().min(3).required(),
      emailAddress: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string(),
      inviteCode: Joi.string(),
      role: Joi.string().min(3).max(30).required(),
    });
    const result = scheme.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: result.error.message });
    } else {
      var { emailAddress } = req.body;
      // var avatar = 'dummy.jpg';
      var emailCheck = await User.find({ email: { address: emailAddress } });

      if (emailCheck.length) {
        return res
          .status(400)
          .send({ status: 400, message: "Email already exists" });
      }
      const image = req.file;
      if (image) {
        if (
          image.mimetype == "image/jpeg" ||
          image.mimetype == "image/png" ||
          image.mimetype == "image/jpg"
        ) {
          if (image.size > 5000000) {
            return res
              .send(400)
              .send({ message: "File should be less than 5mbs" });
          } else {
            avatar = req.file.filename;
          }
        } else {
          return res.status(400).send({ message: "Invalid file type" });
        }
      } else {
        avatar = req.body.avatarName;
      }
      let inviteCode = await generatePersonalizedInviteCode(req.body.fullName);
      const user = new User({
        name: req.body.fullName,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        email: { address: emailAddress, isVerified: true },
        password: await Cryptr.encrypt(req.body.password),
        inviteCode: inviteCode,
        role: req.body.role,
        avatar: avatar,
      });

      const newuser = await user.save();
      return res.status(200).json({
        status: 200,
        message: "success",
        user: newuser,
        code: newuser.inviteCode,
      });
    }
  } catch (e) {
    console.log("Error", e.message);
  }
};
async function generatePersonalizedInviteCode(name) {
  let count = await User.countDocuments({
    name,
  });
  let username = `${name.replace(/\s/g, "")}${count}`;
  while (await User.findOne({ inviteCode: username })) {
    count++;
    username = `${name.replace(/\s/g, "")}${count}`;
  }
  return username;
}
exports.affiliatesListing = async (req, res) => {
  try {
    // const reqRole = req.params.role;
    // const reqRole = "Affiliate";
    const role = "Affiliate";
    const result = await User.find({ role: role, isDeleted: false });
    return res.status(200).json({ status: 200, data: result });
  } catch (e) {
    return res
      .status(200)
      .send({ status: 400, message: "No Affiliate found!" });
  }
};

exports.followersListing = async (req, res) => {
  try {
    const role = "Follower";
    const user = await User.find({ role: role, isDeleted: false });
    return res.status(200).json(user);
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No Follower Found!" });
  }
};

exports.usersAgainstRole = async (req, res) => {
  try {
    var pageNumber = req.body.pageNumber - 1;
    var perPage = 5;

    const role = req.body.type;

    if (role === "all") {
      queryObject = {
        isDeleted: false,
      };
      User.aggregate(
        [
          {
            $match: queryObject,
          },
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $limit: pageNumber * perPage + 5,
          },
          {
            $skip: pageNumber * perPage,
          },
        ],
        async function (err, documents) {
          if (err) {
            res.json({
              status: "error",
              message: err,
            });
            return;
          } else {
            return res.status(200).json({ status: 200, users: documents });
          }
        }
      );
    } else {
      queryObject = {
        isDeleted: false,
        role: role,
      };
      User.aggregate(
        [
          {
            $match: queryObject,
          },
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $limit: pageNumber * perPage + 5,
          },
          {
            $skip: pageNumber * perPage,
          },
        ],
        async function (err, documents) {
          if (err) {
            res.json({
              status: "error",
              message: err,
            });
            return;
          } else {
            return res.status(200).json({ status: 200, users: documents });
          }
        }
      );
    }
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No user found!" });
  }
};
exports.deletedUsersListing = async (req, res) => {
  try {
    var pageNumber = req.body.pageNumber - 1;
    var perPage = 5;

    queryObject = {
      isDeleted: true,
    };
    User.aggregate(
      [
        {
          $match: queryObject,
        },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $limit: pageNumber * perPage + 5,
        },
        {
          $skip: pageNumber * perPage,
        },
      ],
      async function (err, documents) {
        if (err) {
          res.json({
            status: "error",
            message: err,
          });
          return;
        } else {
          return res.status(200).json({ status: 200, users: documents });
        }
      }
    );
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No user found!" });
  }
};
exports.onTrash = async (req, res) => {
  try {
    const id = req.body.id;
    const newUser = await User.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    return res
      .status(200)
      .json({ user: newUser, message: "Updated Successfully!", status: 200 });
  } catch (e) {
    return res
      .status(400)
      .json({ user: newUser, message: e.message, status: 400 });
  }
};

exports.onRevover = async (req, res) => {
  try {
    const id = req.body.id;
    const newUser = await User.findByIdAndUpdate(id, {
      isDeleted: false,
    });
    return res
      .status(200)
      .json({ user: newUser, message: "Updated Successfully!", status: 200 });
  } catch (e) {
    return res
      .status(400)
      .json({ user: newUser, message: e.message, status: 400 });
  }
};
exports.usersCount = async (req, res) => {
  try {
    const role = req.body.type;

    if (role == "deleted") {
      User.count({ isDeleted: true }, function (err, documentsCount) {
        if (err) {
          res.json({
            status: "error",
            message: err,
          });
          return;
        } else {
          return res
            .status(200)
            .json({ status: 200, recordsCount: documentsCount });
        }
      });
    } else if (role == "Admin") {
      User.count(
        { isDeleted: false, role: "Admin" },
        function (err, documentsCount) {
          if (err) {
            res.json({
              status: "error",
              message: err,
            });
            return;
          } else {
            return res
              .status(200)
              .json({ status: 200, recordsCount: documentsCount });
          }
        }
      );
    } else if (role == "Affiliate") {
      User.count(
        { isDeleted: false, role: "Affiliate" },
        function (err, documentsCount) {
          if (err) {
            res.json({
              status: "error",
              message: err,
            });
            return;
          } else {
            return res
              .status(200)
              .json({ status: 200, recordsCount: documentsCount });
          }
        }
      );
    } else if (role == "all") {
      User.count({ isDeleted: false }, function (err, documentsCount) {
        if (err) {
          res.json({
            status: "error",
            message: err,
          });
          return;
        } else {
          return res
            .status(200)
            .json({ status: 200, recordsCount: documentsCount });
        }
      });
    }
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No user found!" });
  }
};
exports.affiliatesInThisMonth = async (req, res) => {
  try {
    presentMonthYear = myDate.toString().substr(0, 7);

    var id = req.user._id;

    var affiliatesPerDay = [];
    const admin = await User.findOne({ _id: id }, (err, admin) => {
      if (admin) {
        for (var i = 0; i < admin.affiliatesPerDay.length; i++) {
          if (admin.affiliatesPerDay[i][0].substr(0, 7) == presentMonthYear) {
            affiliatesPerDay.push(admin.affiliatesPerDay[i]);
          }
        }
      }
    }).exec();
    return res.status(200).json({
      status: 200,
      affiliatesListings: affiliatesPerDay,
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
exports.PiChartData = async (req, res) => {
  try {
    var id = req.user._id;

    var currentMonthUsers = await currentMonthUsersCount(id);
    var LastMonthUsers = await lastMonthUsersCount(id);
    var lastYearUsers = await lastYearUsersCount(id);
    console.log("currentMonthUsers", currentMonthUsers);
    console.log("currentMonthUsers", LastMonthUsers);
    console.log("currentMonthUsers", lastYearUsers);

    return res.status(200).json({
      status: 200,
      currentMonthUsers: currentMonthUsers,
      LastMonthUsers: LastMonthUsers,
      lastYearUsers: lastYearUsers,
    });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};
exports.currentYearAffiliates = async (req, res) => {
  try {
    presentYear = myDate.toString().substr(0, 4);
    var id = req.user._id;

    const admin = await User.findOne({ _id: id }, (err, admin) => {
      const affiliatesPerMonth = admin.affiliatesPerMonth;
      currentYearAffil = [];
      if (affiliatesPerMonth.length <= 12) {
        for (let i = 0; i < affiliatesPerMonth.length; i++) {
          if (affiliatesPerMonth[i][0].substr(0, 4) == presentYear) {
            currentYearAffil.push(affiliatesPerMonth[i][1]);
          }
        }
        // return currentYearFoll;
      } else {
        var numofCurMonFoll = affiliatesPerMonth.length % 12;
        let i = affiliatesPerMonth.length + 1 - numofCurMonFoll;
        for (i; i < affiliatesPerMonth.length; i++) {
          currentYearAffil.push(affiliatesPerMonth[i][1]);
        }
        let y = 12 - currentYearAffil.length;
        for (var j = 0; j < y; j++) {
          currentYearAffil.push(0);
        }
        // return currentYearFoll;
      }
    }).exec();

    return res
      .status(200)
      .json({ status: 200, currentYearUsers: currentYearAffil });
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
    const admin = await User.find({ _id: id }, async (err, admin) => {
      if (admin) {
        affiliatesPerYear = admin[0].affiliatesPerDay;

        for (var i = 0; i < affiliatesPerYear.length; i++) {
          if (affiliatesPerYear[i][0].toString().substr(0, 4) == prevYear) {
            count = count + affiliatesPerYear[i][1];
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

    const adminn = await User.find({ _id: id }, async (err, admin) => {
      if (admin) {
        affiliatesPerDay = admin[0].affiliatesPerDay;
        for (let j = 0; j < affiliatesPerDay.length; j++) {
          if (affiliatesPerDay[j][0].substr(0, 7) == presentMonthYear) {
            count = count + affiliatesPerDay[j][1];
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
    const admin = await User.find({ _id: id }, async (err, admin) => {
      if (admin) {
        affiliatesPerMonth = admin[0].affiliatesPerMonth;

        for (var i = 0; i < affiliatesPerMonth.length; i++) {
          if (affiliatesPerMonth[i][0].toString() == prevMonthYear) {
            count = count + affiliatesPerMonth[i][1];
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

async function affiliatesCountPerDay() {
  try {
    presentDate = myDate.toString().substr(0, 10);
    const role = "Affiliate";

    var affiliatesPerDay = [];

    const admins = await User.find(
      { role: "Admin", isDeleted: false },
      async (err, admins) => {
        try {
          if (admins.length > 0) {
            for (var i = 0; i < admins.length; i++) {
              let affiliates = await User.find(
                {
                  role: role,
                  isDeleted: false,
                },
                async (err, affiliates) => {
                  try {
                    if (affiliates.length > 0) {
                      var count = 0;
                      for (var j = 0; j < affiliates.length; j++) {
                        if (
                          moment(affiliates[j].createdAt)
                            .format()
                            .toString()
                            .substr(0, 10) === presentDate
                        ) {
                          count++;
                        }
                      }

                      var array = admins[i].affiliatesPerDay;
                      affiliatesPerDay = [...array, [presentDate, count]];

                      var id = admins[i]._id;
                      const update = await User.updateOne(
                        { _id: id },
                        {
                          $set: {
                            affiliatesPerDay: affiliatesPerDay,
                          },
                        }
                      );
                    } else {
                      var dummy = [presentDate, 0];
                      var array = admins[i].affiliatesPerDay;
                      affiliatesPerDay = [...array, dummy];
                      var id = admins[i]._id;
                      const update = await User.updateOne(
                        { _id: id },
                        {
                          $set: {
                            affiliatesPerDay: affiliatesPerDay,
                          },
                        }
                      );
                    }
                  } catch (err) {
                    console.log(err.message);
                  }
                }
              );
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

async function affiliatesCountPerMonth() {
  try {
    presentMonth = myDate.toString().substr(0, 7);
    const role = "Affiliate";

    var affiliatesPerMonth = [];

    let Affiliates = await User.find({
      role: role,
      isDeleted: false,
    });
    const admins = await User.find(
      { role: "Admin", isDeleted: false },
      async (err, admins) => {
        try {
          for (var i = 0; i < admins.length; i++) {
            try {
              if (Affiliates.length > 0) {
                var count = 0;
                for (var j = 0; j < Affiliates.length; j++) {
                  if (
                    moment(Affiliates[j].createdAt)
                      .format()
                      .toString()
                      .substr(0, 7) === presentMonth
                  ) {
                    count++;
                  }
                }
                console.log("ifff");
                var array = admins[i].affiliatesPerMonth;
                affiliatesPerMonth = [...array, [presentMonth, count]];
                var id = admins[i]._id;
                const update = await User.updateOne(
                  { _id: id },
                  {
                    $set: {
                      affiliatesPerMonth: affiliatesPerMonth,
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
  "30 13 */ * *",
  () => {
    console.log("Running for affiliates Count Per Day");
    affiliatesCountPerDay();
  },
  {
    scheduled: true,
  }
);
cron.schedule(
  `58 23 ${daysInMonth} */ *`,
  () => {
    console.log("Running for affiliates Count Per Month");
    affiliatesCountPerMonth();
  },
  {
    scheduled: true,
  }
);
