const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
router;

router.route("/signup")
.get(userController.getSignup)
.post(
  wrapAsync(userController.postSignup));

router.route("/login")
.get(userController.getLogin)
.post(saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
   

    let redirectUrl  = res.locals.redirectUrl || "/listings";
    req.flash("success","welcome back to YatraBnB!");
    res.redirect(redirectUrl);

});


router.get("/logout", userController.logout);


module.exports = router;
