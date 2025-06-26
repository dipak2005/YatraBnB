const { saveRedirectUrl } = require("../middleware.js");
const passport = require("passport");
const User = require('../models/user.js'); 


module.exports.getSignup = (req, res) => {
  res.render("users/signup.ejs");
}


module.exports.postSignup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);

      req.login(registeredUser, (err) => {
        if (err) {
           return next(err);
        }
        req.flash("success" , "you are logged out!");
        res.redirect("/listings");
    });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }


module.exports.getLogin = (req, res) => {
  res.render("users/login.ejs");
}


 


module.exports.logout = (req,res) => {
    req.logOut((err) => {
        if (err) {
            next(err);
        }
        req.flash("success" , "you are logged out!");
        res.redirect("/listings");
    })
}