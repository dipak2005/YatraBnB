const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedIn =  (req,res,next) => {

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login"); 
  }
  next();
}

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; 
    }
    next();
};

module.exports.isOwner = async (req,res,next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the Owner of the listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validatelisting = (req,res,next) => {

   let {error} = Listing.validate(req.body);
    if (error) {
      let errMsg =  error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400 , error);
    }else {
      next();
    }
}

module.exports.validateReview = (req,res,next) => {

   let {error} = Review.validate(req.body);
    console.log(error);
    if (error) {
      let errMsg =  error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400 , error);
    }else {
      next();
    }
}

module.exports.isAuthor = async (req,res,next) => {
    let { reviewid } = req.params;
    let review = await Review.findById(reviewid);
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${reviewid}`);
  }
  next();
};