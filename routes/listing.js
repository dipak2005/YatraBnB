const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const multer  = require('multer');
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const Listing = require("../models/listing.js");

const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


const listingController = require("../controllers/listings.js");

router
.route("/")
.get(wrapAsync(listingController.index)) // index Route
.post(
  isLoggedIn,
  upload.single("listing[image]"),
  // validatelisting,
   wrapAsync(listingController.createListing)); // create Route



//New Route
router.get("/new", isLoggedIn, listingController.newListing);

// try {
  // Show Route
router.
route("/:id")
.get( wrapAsync(listingController.showRoute)) // Show Route
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  wrapAsync(listingController.updateRoute))  // Update Route
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteRoute)  // Delete Route
);  
 
// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(listingController.editRoute)
);



module.exports = router;
