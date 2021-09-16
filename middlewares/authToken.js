const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  } else if (req.headers.token) {
    token = req.headers.token;
  }

  //make sure token exists
  if (!token) {
    return res.status(400).send("Please Login to view that resource");
  } else {
    try {
      //verify token

      const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);

      req.user = await User.findById(decoded.userId);
      next();
    } catch (err) {
      console.log("THIS IS ERROR OF TOKEN", err);
      return res.status(400).send("Please Login to view that resource");
    }
  }
};

exports.access = function (role) {
  return async (req, res, next) => {
    try {
      var reqRole = req.user.role;
      var i;
      for (i = 0; i < role.length; i++) {
        if ((reqRole = role[i])) {
          next();
          return;
        } else {
          return res.status(400).send({ message: "Access Denied!!" });
        }
      }
    } catch (e) {
      return res.json(e.message);
    }
  };
};
