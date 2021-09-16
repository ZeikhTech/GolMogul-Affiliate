require("dotenv").config();
var morgan = require("morgan");
var express = require("express");
var app = express();
var cors = require("cors");
var path = require("path");
global.appRoot = path.resolve(__dirname);
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config");
const session = require("express-session");
app.use(cors());

mongoose
  .connect(
    process.env.DATABASE_URL,
    // "mongodb://localhost/Users",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(console.log("Database connected Successfully"))
  .catch((err) => console.log(err.message));

app.use(morgan("dev"));
app.use(express.json());
require("./routes")(app);
app.use(passport.initialize());
app.use(passport.session());

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error.message);
});
db.on("open", () => {
  console.log("connected to database");
});

app.use(express.static("upload"));
app.use(express.static("pdfImgaes"));
app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.client == "./client/public/templates/") {
  app.use(express.static("static"));
} else {
  app.use(express.static(path.join(__dirname, "client/build")));
}

if (app.get("env") === "production") {
  app.use(function (req, res, next) {
    var protocol = req.get("x-forwarded-proto");
    protocol == "https"
      ? next()
      : res.redirect("https://" + req.hostname + req.url);
  });
}
var port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log("Listening to port " + `${port}`);
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}




















console.log("hello");
setTimeout(() => {
  console.log("hello 1");
}, 1000);

console.log("hello 2");



