const Listing = require("../models/listing.js");
// Index Route
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

//New Route
module.exports.newListing = (req, res) => {
  res.render("listings/new.ejs");
};

// Show Route
module.exports.showRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    }).populate("owner");
   
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// Create route
module.exports.createListing = async (req, res, next) => {

    const place = req.body.listing.location;
  const response = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(
      place
    )}.json?key=YbR2mS3rAaOElYz54MyE`
  );
  const data = await response.json();
  console.log(data);
   if (!data.features || data.features.length === 0) {
    req.flash("error", "Location not found!");
    return res.redirect("/listings/new");
  }
    const [lng, lat] = data.features[0].geometry.coordinates;

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing); 
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = data.features[0].geometry;
  
  let savedListing = await newListing.save();
  console.log(savedListing);
  
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

//   Edit Route
module.exports.editRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  let originalUrl = listing.image.url;
  originalUrl = originalUrl.replace("/upload", "/upload/h_100,w_100");
  res.render("listings/edit.ejs", { listing, originalUrl });
};

// Update Route
module.exports.updateRoute = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof(req.file != "undefined")) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    let newlocation = req.body.listing.location;

   const response = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(
      newlocation
    )}.json?key=YbR2mS3rAaOElYz54MyE`
  );
  const data = await response.json();
  console.log(data);
   if (!data.features || data.features.length === 0) {
    req.flash("error", "Location not found!");
    return res.redirect("/listings/new");
  }
    listing.geometry = data.features[0].geometry;
    await listing.save();
    

  }

  req.flash("success", " Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Delete Route
module.exports.deleteRoute = async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findByIdAndDelete(id);
  console.log(list);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
