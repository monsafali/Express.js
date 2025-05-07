const express = require("express");

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const router = express.Router({ mergeParams: true });

const validateReview = (req, res, next) => {
  console.log(req.body);
  const { error } = reviewSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};

router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "review added");
    res.redirect(`/listings/${listing._id}`);
  })
);
// Delete Review rout

router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findById(reviewId);
    req.flash("success", "Reveiw deleted successfuly");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
