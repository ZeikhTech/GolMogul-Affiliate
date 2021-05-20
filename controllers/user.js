const Joi = require("joi");
require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
var Cryptr = require("cryptr");
const passport = require("passport");
const session = require("express-session");
var config = require("../config");
var jwtDecode = require("jwt-decode");
Cryptr = new Cryptr("my");
const emailVerification = require("./emailVerification");
let referralCodeGenerator = require("referral-code-generator");

///////////////////////////////////////////////////
// To Register Follower from postman
///////////////////////////////////////////////////

// exports.register = async (req, res, next) => {
//   console.log("in register");
//   try {
//     const scheme = Joi.object({
//       //JOI Validations
//       fullName: Joi.string().min(3).max(30).required(),
//       gender: Joi.string().min(3).max(10).required(),
//       dateOfBirth: Joi.string().min(3).max(10).required(),
//       // emailAddress: Joi.string().email({
//       //   minDomainSegments: 2,
//       //   tlds: { allow: ["com", "net"] },
//       // }),
//       password: Joi.string(),
//       inviteCode: Joi.string(),

//       // inviteCode: Joi.string(),
//       role: Joi.string().min(3).max(30).required(),
//     });
//     const result = scheme.validate(req.body);
//     if (result.error) {
//       console.log(req.body);
//       return res.status(400).json({ message: result.error.message });
//     } else {
//       console.log("Request dot body ye ha ", req.body);
//       var { emailAddress } = req.body;

//       // console.log("has this value", req.body.user);
//       // var avatar = 'dummy.jpg';
//       var emailCheck = await User.find({
//         email: { address: "teasdsadsadadasdster@gmail.com" },
//       });
//       console.log("emailCheck", emailCheck);
//       if (emailCheck.length !== 0) {
//         console.log("emaillllllll", res);
//         return res
//           .status(400)
//           .send({ status: 400, message: "Email already exists" });
//       } else {
//         console.log("Success");
//       }
//       // const { address } = req.body.email;
//       // console.log("ttttttttttttttt", address);
//       const image = req.file;
//       console.log(image);
//       if (image) {
//         if (
//           image.mimetype == "image/jpeg" ||
//           image.mimetype == "image/png" ||
//           image.mimetype == "image/jpg"
//         ) {
//           if (image.size > 5000000) {
//             return res
//               .send(400)
//               .send({ message: "File should be less than 5mbs" });
//           } else {
//             avatar = req.file.filename;
//             console.log(req.file);
//           }
//         } else {
//           return res.status(400).send({ message: "Invalid file type" });
//         }
//         console.log(avatar);
//       } else {
//         avatar = req.body.avatarName;
//         console.log(avatar);
//       }
//       let inviteCode = await generatePersonalizedInviteCode(req.body.fullName);
//       // let inviteCode = "asds123456773456744233455677677";
//       const user = new User({
//         name: req.body.fullName,
//         gender: req.body.gender,
//         dateOfBirth: req.body.dateOfBirth,
//         email: { address: "teasdsadadasdster@gmail.com" },
//         password: await Cryptr.encrypt(req.body.password),
//         inviteCode: "Zahoor01",
//         // inviteCode: inviteCode,
//         role: req.body.role,
//         avatar: avatar,
//       });

//       const newuser = await user.save();

//       emailVerification.emailVeriFunction(newuser._id, newuser.email.address);

//       return res.status(200).json({
//         status: 200,
//         message: "success",
//         user: newuser,
//       });
//     }
//   } catch (e) {
//     console.log("Error", e.message);
//   }
// };

///////////////////////////////////////////////////
// To Register Affiliate
///////////////////////////////////////////////////
exports.register = async (req, res, next) => {
  console.log("in register");
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
      var emailCheck = await User.find({
        "email.address": emailAddress,
      });

      if (emailCheck.length > 0) {
        return res
          .status(409)
          .send({ status: 409, message: "Email already exists" });
      }
      const image = req.file;
      avatar = "";
      if (image) {
        if (
          image.mimetype == "image/jpeg" ||
          image.mimetype == "image/png" ||
          image.mimetype == "image/jpg" ||
          image.mimetype == "image/bmp"
        ) {
          console.log(image.size);
          console.log(typeof image.size);

          if (image.size > 5000000) {
            console.log("comming");
            return res
              .status(413)
              .send({ status: 413, message: "File should be less than 5mbs" });
          } else {
            avatar = req.file.filename;
          }
        } else {
          return res.status(415).send({
            status: 415,
            message: "The image must be a file of type: jpeg, bmp, png, jpg. ",
          });
        }
      } else {
        avatar = req.body.avatarName;
      }
      let inviteCode = await generatePersonalizedInviteCode(req.body.fullName);

      const user = new User({
        name: req.body.fullName,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        email: { address: emailAddress },
        password: await Cryptr.encrypt(req.body.password),
        inviteCode: inviteCode,
        role: req.body.role,
        avatar: avatar,
      });
      var newuser = await user.save();
      const x = emailVerification.emailVeriFunction(
        newuser._id,
        newuser.email.address
      );
      console.log("ye email ka response ha ", x);
      return res.status(200).json({
        status: 200,
        message: "success",
        user: newuser,
      });
    }
  } catch (e) {
    console.log("Error", e.message);
  }
};
exports.emailVerification = async (req, res) => {
  const token = req.params.emailToken;

  var decoded = jwtDecode(token);
  const userId = decoded.user;
  try {
    var result = await User.update(
      { _id: userId },
      { $set: { "email.isVerified": true } }
    );
  } catch (err) {
    res.send("error");
  }
  return res.redirect(`${config.baseURL}login`);
};
exports.login = async (req, res) => {
  try {
    const Schema = Joi.object({
      email: Joi.object({
        address: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
      }),
      password: Joi.string(),
    });

    const result = Schema.validate(req.body);

    if (result.error) {
      return res.status(400).send({ message: result.message });
    } else {
      var { email, password } = req.body;
      var emailAddress = email.address;

      const updatedUser = await User.findOne(
        { "email.address": emailAddress },
        function (err, user) {
          if (err) {
            console.log("hey1");
            console.log("user => ", user);

            return res.send({
              status: 401,
              message: "Error Occurred",
            });
          } else {
            console.log("hey2");

            // console.log("value ye ha", user.email.isVerified);
            if (!user) {
              return res.status(401).send({
                status: 401,
                message: "User not found",
              });
            }
            if (!user.email.isVerified) {
              return res.send({
                status: 401,
                message: "Please verify your email address",
              });
            } else {
              var upassword = Cryptr.decrypt(user.password);
              const EMAIL_SECRET = process.env.secretOrPrivateKey;
              if (upassword === password) {
                console.log("pass match");
                const accessToken = jwt.sign({ user: user.id }, EMAIL_SECRET, {
                  expiresIn: "10h",
                });
                var decoded = jwtDecode(accessToken);
                console.log("accessToken", decoded);

                var data = {
                  userName: user.username,
                  email: user.email,
                  avatar: user.avatar,
                  role: user.role,
                };
                console.log("accessToken", data);

                const id = user._id;

                return res.status(200).send({
                  status: 200,
                  accessToken: accessToken,
                  user: data,
                  id: id,
                  message: "Log In successfully!",
                });
              } else {
                return res.status(200).send({
                  status: 401,
                  message: "Invalid email or Password",
                });
              }
            }
          }
        }
      );
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.forgetPasswordEmail = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.object({
        address: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
      }),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).send({ message: error.message });
    } else {
      var em = req.body.email;
      console.log("nai yaha", em);

      var to = em.address;
      console.log("to   >>>>", to);

      var emailCheck = await User.findOne({ "email.address": to }).exec();
      console.log("emailCheck", emailCheck);
      if (emailCheck) {
        var id = emailCheck._id;

        emailVerification.forgetPassEmailVeriFunction(id, emailCheck.email);

        return res.status(200).json({ status: 200, user: emailCheck });
      } else {
        return res
          .status(200)
          .json({ status: 302, message: "email does not exists!!" });
      }
    }
  } catch (error) {
    return res.status(200).json({ status: 500, message: error.message });
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
