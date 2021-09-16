const Joi = require("joi");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
var Cryptr = require("cryptr");
var config = require("../config");
var jwtDecode = require("jwt-decode");
Cryptr = new Cryptr("my");
var ObjectId = require("mongodb").ObjectId;

const bcrypt = require("bcrypt");
const saltRounds = 10;
var moment = require("moment");
var cron = require("node-cron");
const emailVerification = require("./emailVerification");
let referralCodeGenerator = require("referral-code-generator");
const { count } = require("../models/user");

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
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().min(5),
      gender: Joi.string().min(3).max(10).required(),
      countryCode: Joi.string(),
      phone: Joi.string(),
      dateOfBirth: Joi.string().min(3).required(),
      inviterCode: Joi.string(),
      role: Joi.string().min(3).max(30).required(),
    });
    const result = scheme.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: result.error.message });
    } else {
      var { email } = req.body;
      // var avatar = 'dummy.jpg';
      var emailCheck = await User.find({
        "email.address": email,
      });

      if (emailCheck.length > 0) {
        return res
          .status(400)
          .send({ status: 400, message: "Email already exists" });
      }
      //const image = req.file;
      // if (image) {
      //   if (
      //     image.mimetype == "image/jpeg" ||
      //     image.mimetype == "image/png" ||
      //     image.mimetype == "image/jpg"
      //   ) {
      //     if (image.size > 5000000) {
      //       return res
      //         .send(400)
      //         .send({ message: "File should be less than 5mbs" });
      //     } else {
      //       avatar = req.file.filename;
      //     }
      //   } else {
      //     return res.status(400).send({ message: "Invalid file type" });
      //   }
      // } else {
      //   avatar = req.body.avatarName;
      // }
      let hash = 0;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(parseInt(saltRounds));
        hash = await bcrypt.hash(req.body.password, salt);
      }
      let inviteCode = await generatePersonalizedInviteCode(req.body.name);
      const user = new User({
        name: req.body.name,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        email: { address: emailAddress, isVerified: true },
        password: hash,
        countryCode: req.body.countryCode,
        phone: req.body.phone,
        inviteCode: inviteCode,
        invitedBy: ObjectId(inviterCode),
        role: req.body.role,
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

exports.affiliatesListing = async (req, res) => {
  try {
    // const reqRole = req.params.role;
    // const reqRole = "Affiliate";
    const role = "Affiliate";
    const result = await User.find({ role: role, isDeleted: false }).select(
      "_id name followersPerDay followersPerMonth followersPerYear"
    );
    return res.status(200).json({ status: 200, data: result });
  } catch (e) {
    return res
      .status(200)
      .send({ status: 400, message: "No Affiliate found!" });
  }
};
exports.newuserInvitecode = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.find({ _id: id }).select("inviteCode");
    console.log("inviteCode", user[0].inviteCode);
    return res
      .status(200)
      .json({ status: 200, inviteCode: user[0].inviteCode });
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
        $or: [{ role: "Affiliate" }, { role: "Admin" }],

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
      User.count(
        { $or: [{ role: "Affiliate" }, { role: "Admin" }], isDeleted: false },
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
    }
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No user found!" });
  }
};
//Badges API's for Admin Dashboard
exports.greenBadge = async (req, res) => {
  try {
    var reqId = req.body.id;

    var id;
    if (typeof req.body.id === "string") {
      id = ObjectId(reqId);
    } else {
      id = reqId;
    }

    const greenBadgesCount = await User.count({
      invitedBy: id,
      "profile.badges.milestoneBadge.currentMilestone": 1,
    });

    return res
      .status(200)
      .json({ status: 200, greenBadgesCount: greenBadgesCount });
  } catch (e) {
    return res.status(200).send({ status: 400, message: e.message });
  }
};

exports.brownBadge = async (req, res) => {
  try {
    var id;
    var reqId = req.body.id;

    if (typeof req.body.id === "string") {
      id = ObjectId(reqId);
    } else {
      id = reqId;
    }
    const brownBadgesCount = await User.count({
      invitedBy: id,
      "profile.badges.milestoneBadge.currentMilestone": 2,
    });

    return res
      .status(200)
      .json({ status: 200, brownBadgesCount: brownBadgesCount });
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No user found!" });
  }
};
exports.silverBadge = async (req, res) => {
  try {
    var id;
    var reqId = req.body.id;

    if (typeof req.body.id === "string") {
      id = ObjectId(reqId);
    } else {
      id = reqId;
    }
    const silverBadgesCount = await User.count({
      invitedBy: id,
      "profile.badges.milestoneBadge.currentMilestone": 3,
    });

    return res
      .status(200)
      .json({ status: 200, silverBadgesCount: silverBadgesCount });
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No user found!" });
  }
};
exports.goldBadge = async (req, res) => {
  try {
    var id;
    var reqId = req.body.id;

    if (typeof req.body.id === "string") {
      id = ObjectId(reqId);
    } else {
      id = reqId;
    }
    const goldBadgesCount = await User.count({
      invitedBy: id,
      "profile.badges.milestoneBadge.currentMilestone": 4,
    });
    return res
      .status(200)
      .json({ status: 200, goldBadgesCount: goldBadgesCount });
  } catch (e) {
    return res.status(200).send({ status: 400, message: "No user found!" });
  }
};
////////////////////////////////////////Affiliates Graphs///////////////////////////////////////////////////
exports.degreeFollowers = async (req, res) => {
  try {
    //   tiersCount: {
    //     tier1Count: Number,
    //     tier2Count: Number,
    // },

    const { id } = req.body;

    var firstDegreeCount = 0,
      secondDegreeCount = 0;
    const user = await User.findOne({ _id: ObjectId(id) }).exec();

    if (user) {
      if (user.tiersCount) {
        if ("user.tiersCount.tier1Count") {
          console.log(user.tiersCount.tier1Count);
          firstDegreeCount = user.tiersCount.tier1Count;
        }
        if ("user.tiersCount.tier2Count") {
          secondDegreeCount = user.tiersCount.tier2Count;
        }
      }

      return res.status(200).json({
        status: 200,
        firstDegreeCount: firstDegreeCount,
        secondDegreeCount: secondDegreeCount,
      });
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "No User exists with this ID" });
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.affiliatesInThisMonth = async (req, res) => {
  try {
    presentMonthYear = myDate.toString().substr(0, 7);
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();
    // queryObject.userId = new mongoose.Types.ObjectId(projectId);

    User.aggregate(
      [
        {
          $match: {
            role: "Affiliate",

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
          return res
            .status(200)
            .json({ status: 200, affiliatesListings: result });
        }
      }
    );
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
exports.affiliatesPiChartData = async (req, res) => {
  try {
    var thisWeekAffilCount = await thisWeekAffiliatesCount();
    var thisMonthAffilCount = await thisMonthAffiliatesCount();
    var totalAffilCount = await totalAffiliatesCount();
    var prevWeekAffilCount = await prevWeekAffiliatesCount();
    // console.log("thisWeekAffilCount", thisWeekAffilCount);
    // console.log("thisMonthAffilCount", thisMonthAffilCount);
    // console.log("totalAffilCount", totalAffilCount);
    // console.log("prevWeekAffilCount", prevWeekAffilCount);

    return res.status(200).json({
      status: 200,
      thisWeekAffilCount: thisWeekAffilCount,
      thisMonthAffilCount: thisMonthAffilCount,
      totalAffilCount: totalAffilCount,
      prevWeekAffilCount: prevWeekAffilCount,
    });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};
exports.currentYearAffiliates = async (req, res) => {
  try {
    presentMonthYear = myDate.toString().substr(0, 7);
    const startOfYear = moment().startOf("year").toDate();
    const endOfMonth = moment().endOf("month").toDate();
    var id = req.user._id;
    // queryObject.userId = new mongoose.Types.ObjectId(projectId);

    const result = await User.aggregate([
      {
        $match: {
          role: "Affiliate",

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
    var currentYearAffil = [];
    for (var i = 0; i < 12; i++) {
      currentYearAffil.push(0);
    }
    if (result.length > 0) {
      for (var i = 0; i < result.length; i++) {
        currentYearAffil[parseInt(result[i]._id.month) - 1] = result[i].count;
      }
    }
    return res
      .status(200)
      .json({ status: 200, currentYearUsers: currentYearAffil });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
  // try {
  //   presentYear = myDate.toString().substr(0, 4);
  //   var id = req.user._id;

  //   const admin = await User.findOne({ _id: id }, (err, admin) => {
  //     const affiliatesPerMonth = admin.affiliatesPerMonth;
  //     currentYearAffil = [0];
  //     if (affiliatesPerMonth.length <= 12) {
  //       currentYearAffil = [];
  //       console.log("affiliatesPerMonth.length", affiliatesPerMonth.length);
  //       for (let i = 0; i < affiliatesPerMonth.length; i++) {
  //         if (affiliatesPerMonth[i][0].substr(0, 4) == presentYear) {
  //           currentYearAffil.push(affiliatesPerMonth[i][1]);
  //         }
  //       }
  //       // return currentYearFoll;
  //     } else {
  //       currentYearAffil = [];

  //       var numofCurMonFoll = affiliatesPerMonth.length % 12;
  //       let i = affiliatesPerMonth.length - numofCurMonFoll;
  //       for (i; i < affiliatesPerMonth.length; i++) {
  //         currentYearAffil.push(affiliatesPerMonth[i][1]);
  //       }
  //       let y = 12 - currentYearAffil.length;
  //       if (y != 0) {
  //         for (var j = 0; j < y; j++) {
  //           currentYearAffil.push(0);
  //         }
  //       }
  //       // return currentYearFoll;
  //     }
  //   }).exec();

  //   return res
  //     .status(200)
  //     .json({ status: 200, currentYearUsers: currentYearAffil });
  // } catch (err) {
  //   return res.status(400).send(err.message);
  // }
};
//1st graph
// async function affiliatesCountPerDay() {
//   try {
//     presentDate = myDate.toString().substr(0, 10);
//     const role = "Affiliate";

//     var affiliatesPerDay = [0];

//     const admins = await User.find(
//       { role: "Admin", isDeleted: false },
//       async (err, admins) => {
//         try {
//           if (admins.length > 0) {
//             for (var i = 0; i < admins.length; i++) {
//               let affiliates = await User.find(
//                 {
//                   role: role,
//                   isDeleted: false,
//                 },
//                 async (err, affiliates) => {
//                   try {
//                     if (affiliates.length > 0) {
//                       var count = 0;
//                       for (var j = 0; j < affiliates.length; j++) {
//                         if (
//                           moment(affiliates[j].created)
//                             .format()
//                             .toString()
//                             .substr(0, 10) == presentDate
//                         ) {
//                           count++;
//                         }
//                       }

//                       var array = admins[i].affiliatesPerDay;
//                       affiliatesPerDay = [...array, [presentDate, count]];

//                       var id = admins[i]._id;
//                       const update = await User.updateOne(
//                         { _id: id },
//                         {
//                           $set: {
//                             affiliatesPerDay: affiliatesPerDay,
//                           },
//                         }
//                       );
//                     } else {
//                       var dummy = [presentDate, 0];
//                       var array = admins[i].affiliatesPerDay;
//                       affiliatesPerDay = [...array, dummy];
//                       var id = admins[i]._id;
//                       const update = await User.updateOne(
//                         { _id: id },
//                         {
//                           $set: {
//                             affiliatesPerDay: affiliatesPerDay,
//                           },
//                         }
//                       );
//                     }
//                   } catch (err) {
//                     console.log(err.message);
//                   }
//                 }
//               );
//             }
//           } else {
//             console.log(err.message);
//           }
//         } catch (err) {
//           console.log(err.message);
//         }
//       }
//     );
//   } catch (err) {
//     console.log(err.message);
//   }
// }
//all Users pichart

async function thisWeekAffiliatesCount() {
  try {
    const start = moment().weekday(1).format();
    const end = moment().weekday(7).format();

    const result = await User.aggregate([
      // $match is a query to select the week
      {
        $match: {
          role: "Affiliate",
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
    return res.status(400).send(err.message);
  }
}

async function prevWeekAffiliatesCount() {
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
          role: "Affiliate",
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
    return res.status(400).send(err.message);
  }
}
async function thisMonthAffiliatesCount() {
  try {
    const startOfMonth = moment().startOf("month").toDate();

    // Run the aggregation

    const result = await User.aggregate([
      // $match is a query to select the week
      {
        $match: {
          role: "Affiliate",
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
    return res.status(400).send(err.message);
  }
}
async function totalAffiliatesCount(idd) {
  try {
    const result = await User.aggregate([
      // $match is a query to select the week
      {
        $match: {
          role: "Affiliate",
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
}
//3rd graph
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
                    moment(Affiliates[j].created)
                      .format()
                      .toString()
                      .substr(0, 7) === presentMonth
                  ) {
                    count++;
                  }
                }
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
                var array = admins[i].affiliatesPerMonth;
                affiliatesPerMonth = [...array, dummy];
                var id = admins[i]._id;
                const update = await User.updateOne(
                  { _id: id },
                  {
                    $set: {
                      affiliatesPerMonth: affiliatesPerMonth,
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
/////////////////////////////////////////All Users Functions////////////////////////////////////////
exports.allUsersInThisMonth = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
exports.allUsersPiChartData = async (req, res) => {
  try {
    var id = req.user._id;

    var currentMonthUsers = await currentMonthAllUsersCount(id);
    var LastMonthUsers = await lastMonthAllUsersCount(id);
    var lastYearUsers = await lastYearAllUsersCount(id);
    // console.log("currentMonthUsers", currentMonthUsers);
    // console.log("currentMonthUsers", LastMonthUsers);
    // console.log("currentMonthUsers", lastYearUsers);

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
exports.allUserscurrentYear = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
//1st graph

async function allUsersCountPerDay() {
  try {
    presentDate = myDate.toString().substr(0, 10);

    var allUsersPerDay = [];

    const admins = await User.find(
      { role: "Admin", isDeleted: false },
      async (err, admins) => {
        try {
          if (admins.length > 0) {
            for (var i = 0; i < admins.length; i++) {
              let users = await User.find(
                {
                  isDeleted: false,
                },
                async (err, users) => {
                  try {
                    if (users.length > 0) {
                      var count = 0;
                      for (var j = 0; j < users.length; j++) {
                        if (
                          moment(users[j].created)
                            .format()
                            .toString()
                            .substr(0, 10) === presentDate
                        ) {
                          count++;
                        }
                      }

                      var array = admins[i].allUsersPerDay;
                      allUsersPerDay = [...array, [presentDate, count]];
                      var id = admins[i]._id;
                      const update = await User.updateOne(
                        { _id: id },
                        {
                          $set: {
                            allUsersPerDay: allUsersPerDay,
                          },
                        }
                      );
                    } else {
                      var dummy = [presentDate, 0];
                      var array = admins[i].allUsersPerDay;
                      allUsersPerDay = [...array, dummy];
                      var id = admins[i]._id;
                      const update = await User.updateOne(
                        { _id: id },
                        {
                          $set: {
                            allUsersPerDay: allUsersPerDay,
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
//all Users pichart

async function currentMonthAllUsersCount(idd) {
  try {
  } catch (err) {}
}
async function lastMonthAllUsersCount(idd) {
  try {
  } catch (err) {
    console.log(err.message);
  }
}
async function lastYearAllUsersCount(idd) {
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
        allUsersPerYear = admin[0].allUsersPerDay;

        for (var i = 0; i < allUsersPerYear.length; i++) {
          if (allUsersPerYear[i][0].toString().substr(0, 4) == prevYear) {
            count = count + allUsersPerYear[i][1];
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
//3rd graph
async function allUsersCountPerMonth() {
  try {
  } catch (err) {
    console.log(err.message);
  }
}
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
