const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a review model based on the schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;