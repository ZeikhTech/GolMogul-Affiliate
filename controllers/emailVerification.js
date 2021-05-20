const jwt = require("jsonwebtoken");
var config = require("../config");
var User = require("../models/user");
var Promise = require("bluebird");
var nodeMailer = require("nodemailer");
sgTransport = require("nodemailer-sendgrid-transport");
// var transporter = nodeMailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "myemailtesting18@gmail.com",
//     pass: "aq1sw2??",
//   },
// });

var API_KEY = "key-7bf2b6e195e2345640c4c34886a99628";
var DOMAIN = "mg.goalmogul.com";
var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

const emailVeriFunction = (id, email) => {
  const EMAIL_SECRET = config.TOKEN_SECRET;
  jwt.sign(
    {
      user: id,
    },
    EMAIL_SECRET,
    {
      expiresIn: "10d",
    },
    (err, emailToken) => {
      const url = `${config.serverURL}api/auth/emailVerification/${emailToken}`;
      console.log("emailToken is ", emailToken);
      var msg = {
        from: `"GoalMogul" <noreply@mg.goalmogul.com>`,
        to: email,
        subject: "Please verify your GolMogul account",
        html: `Hi,
          <p>Thank you for creating an account with The golMogul.</p>
          <p>
          Your email address is not yet verified. To create and launch a project on  The GolMogul, please click this link to verify your email
          <a href = ${url}>Click Here</a></p>
          <p>
          You can then login at ${config.baseURL} to view and edit all your projects  or delete them.
          </p>
          <p>
          If you have further questions, please do not hesitate to ask:)
          </p>
          <p>
          All the best</p>
          `,
      };
      // transporter.sendMail(msg, (error, info) => {
      //   if (error) {
      //     console.log(error);
      //   }
      //   console.log(info.response);
      // });
      mailgun.messages().send(msg, function (error, body) {
        if (error) {
          console.log(error.message);
        }
        if (body) {
          console.log(body);
        }
      });
    }
  );
};

exports.emailVeriFunction = emailVeriFunction;

const forgetPassEmailVeriFunction = (id, email) => {
  console.log("email a a     ", email);
  const EMAIL_SECRET = config.TOKEN_SECRET;
  jwt.sign(
    {
      user: id,
    },
    EMAIL_SECRET,
    {
      expiresIn: "10d",
    },
    (err, emailToken) => {
      const url = `${config.baseURL}forgetPassword/${emailToken}`;
      var msg = {
        from: `"GoalMogul" <noreply@mg.goalmogul.com>`,
        to: email.address,
        subject: "GolMogul Reset Password",
        html: `<h4>We are from Team GolMogul! </h4> 
        <br/>To reset your password, <a href = ${url}>Click Here</a>. <br/><h3> Stay plugged👊🏿👊🏾👊🏽 </h3>`,
      };
      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log("Email sent: " + info.response);
      //   }
      // });
      mailgun.messages().send(msg, function (error, body) {
        if (error) {
          console.log(error.message);
        }
        if (body) {
          console.log(body);
        }
      });
    }
  );
};
exports.forgetPassEmailVeriFunction = forgetPassEmailVeriFunction;
