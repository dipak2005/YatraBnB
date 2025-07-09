// if(process.env.NODE_ENV !== "production") {
  require('dotenv').config()
// }

const express = require("express");
const app = express();
const crypto = require('crypto');
const mongoose = require("mongoose");
const path = require("path");
const method_Override = require("method-override"); // execute put ,patch ,delete request
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js"); // show express error
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js"); 

const listingRouter = require("./routes/listing.js"); // listing routes
const reviewsRouter = require("./routes/review.js"); // review routes
const usersRouter = require("./routes/user.js"); // user routes



const dbUrl = process.env.ATLASDB_URL;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});


store.on("error", () => {
  console.log("Error in MONGO SESSION STORE",err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());// initialize the passport
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// define locals
app.use((req,res, next) => {
 res.locals.success = req.flash("success");
 res.locals.error = req.flash("error");
 res.locals.currUser = req.user;
 next();
});



let port = 8080; // port no.:



async function main() {
  await mongoose.connect(dbUrl);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(method_Override("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingRouter); // redirect listings routes
app.use("/listings/:id/reviews", reviewsRouter); // redirect reviews routes
app.use("/",usersRouter); // redirect user routes

// listening on port no : ****
app.listen(port, () => {
  console.log(`server is listening on port no: ${port}`);
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
  // res.send("Page not Found!");
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
});
