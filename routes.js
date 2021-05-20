const auth = require("./controllers/user");
const errorFunction = require("./middlewares/error");
const { protect, access } = require("./middlewares/authToken");
const AdminController = require("./controllers/adminController");
const AffiliteController = require("./controllers/affiliateController");
require("express-async-errors");

var multer = require("multer");

var upload = multer({ dest: "./upload" });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    var fileExtension = file.mimetype.split("/")[1];
    cb(null, "1" + Date.now() + "." + fileExtension);
  },
});

var upload = multer({ storage: storage });

module.exports = function (app) {
  // Authentication APIs

  app.post("/api/auth/register", upload.single("avatar"), auth.register);
  app.post("/api/auth/login", auth.login);
  app.post("/api/auth/forgetPasswordEmail", auth.forgetPasswordEmail);
  app.get("/api/auth/emailVerification/:emailToken", auth.emailVerification);

  app.post("/api/auth/forgetPassword", AffiliteController.forgetPassword);

  //Open ApIs
  app.post("/api/Admin/count", AdminController.usersCount);
  app.post(
    "/api/affiliate/editPassword/:id",
    protect,
    access(["Admin", "Affiliate"]),
    AffiliteController.editPassword
  );

  //Admin APIs

  app.post(
    "/api/affiliate/affiliatesCount",
    protect,
    access(["Admin", "Affiliate"]),
    AdminController.usersCount
  );

  app.post(
    "/api/affiliate/editPassword/:id",
    protect,
    access(["Admin", "Affiliate"]),
    AffiliteController.editPassword
  );
  app.post(
    "/api/auth/registerNewUser",
    upload.single("avatar"),
    protect,
    access(["Admin"]),
    AdminController.registerNewUser
  );
  app.post(
    "/api/admin/onTrash",
    protect,
    access(["Admin"]),
    AdminController.onTrash
  );
  app.post(
    "/api/admin/onRevover",
    protect,
    access(["Admin"]),
    AdminController.onRevover
  );

  app.post(
    "/api/admin/usersAgainstRole",
    protect,
    access(["Admin"]),
    AdminController.usersAgainstRole
  );
  app.post(
    "/api/admin/deletedUsersListing",
    protect,
    access(["Admin"]),
    AdminController.deletedUsersListing
  );

  app.get(
    "/api/admin/followersListing",
    protect,
    access(["Admin", "Affiliate"]),
    AdminController.followersListing
  );
  app.get(
    "/api/admin/affiliatesListing",
    protect,
    access(["Admin"]),
    AdminController.usersAgainstRole
  );
  app.get(
    "/api/affiliate/affiliatesInThisMonth",
    protect,
    access(["Admin"]),
    AdminController.affiliatesInThisMonth
  );
  app.get(
    "/api/affiliate/PiChartData",
    protect,
    access(["Admin"]),
    AdminController.PiChartData
  );

  app.get(
    "/api/affiliate/currentYearAffiliates",
    protect,
    access(["Admin"]),
    AdminController.currentYearAffiliates
  );
  //Affiliate APIs
  app.post(
    "/api/affiliate/editInviteCode",
    protect,
    access(["Affiliate"]),
    AffiliteController.editInviteCode
  );
  app.post(
    "/api/affiliate/followersAgainstAffiliate",
    protect,
    access(["Admin", "Affiliate"]),

    AffiliteController.followersAgainstAffiliate
  );
  app.get(
    "/api/affiliate/Profile/:id",
    protect,
    access(["Admin", "Affiliate"]),
    AffiliteController.affiliateProfile
  );
  app.post(
    "/api/affiliate/followersInThisMonth",
    protect,
    access(["Admin", "Affiliate"]),
    AffiliteController.followersInThisMonth
  );
  app.post(
    "/api/affDashboard/PiChartData",
    protect,
    access(["Admin", "Affiliate"]),
    AffiliteController.PiChartData
  );
  app.post(
    "/api/affiliate/CurrentYearFollowers",
    protect,
    access(["Admin", "Affiliate"]),
    AffiliteController.followersInThisYear
  );
  app.put(
    "/api/affiliate/editProfile/:id",
    upload.single("avatar"),
    protect,
    access(["Admin", "Affiliate"]),
    AffiliteController.editProfile
  );

  //app.use(errorFunction);
};
