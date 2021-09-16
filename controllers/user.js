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

const bcrypt = require("bcrypt");
const saltRounds = 10;
const emailVerification = require("./emailVerification");
let referralCodeGenerator = require("referral-code-generator");

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
          if (image.size > 5000000) {
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
      let hash = 0;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(parseInt(saltRounds));
        hash = await bcrypt.hash(req.body.password, salt);
      }
      const user = new User({
        name: req.body.fullName,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        email: { address: emailAddress },
        password: hash,
        inviteCode: inviteCode,
        role: req.body.role,
        avatar: avatar,
      });
      var newuser = await user.save();
      const x = emailVerification.emailVeriFunction(
        newuser._id,
        newuser.email.address
      );
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
            return res.send({
              status: 401,
              message: "Error Occurred",
            });
          } else {
            if (!user) {
              return res.status(401).send({
                status: 401,
                message: "User not found",
              });
            }
            //            if (!user.email.isVerified) {

            if (!user.email) {
              return res.send({
                status: 401,
                message: "Please verify your email address",
              });
            } else {
              bcrypt.compare(password, user.password, async (err, result) => {
                if (err || !result) {
                  return res
                    .status(403)
                    .send({ status: 403, message: "Wrong password." });
                } else {
                  const EMAIL_SECRET = process.env.secretOrPrivateKey;
                  const userId = user._id;
                  const accessToken = jwt.sign({ userId }, EMAIL_SECRET, {
                    expiresIn: "10h",
                  });
                  var decoded = jwtDecode(accessToken);

                  var data = {
                    userName: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    role: user.role,
                  };
                  // console.log("accessToken", data);

                  const id = user._id;

                  return res.status(200).send({
                    status: 200,
                    accessToken: accessToken,
                    user: data,
                    id: id,
                    message: "Log In successfully!",
                  });
                }
              });
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

      var to = em.address;

      var emailCheck = await User.findOne({ "email.address": to }).exec();
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
