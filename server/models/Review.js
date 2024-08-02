const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  bookId: {
    type: String, // or ObjectId if it's supposed to be a MongoDB ObjectId
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  userId: {
    type: String, // or ObjectId if it's supposed to be a MongoDB ObjectId
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
