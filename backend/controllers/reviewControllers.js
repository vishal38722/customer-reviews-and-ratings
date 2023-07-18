const Review = require("../models/reviewSchema");

module.exports.submitReview = async (req, res) => {
    const reviewData = req.body;
    const review = new Review(reviewData);
    review.save()
        .then(() => {
            res.status(201).json({ message: 'Review saved successfully!' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to save review.' });
        });
};

module.exports.getReviews = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 3;
    const sortBy = req.query.sortBy || 'date'; // Default sorting option is 'date'
  
    try {
      const totalReviewsCount = await Review.countDocuments();
      const totalPages = Math.ceil(totalReviewsCount / pageSize);
  
      let sortQuery = {};
  
      // Set the sorting option based on the selected option
      switch (sortBy) {
        case 'date':
          sortQuery = { createdAt: -1 }; // Sort by descending order of createdAt field
          break;
        case 'rating':
          sortQuery = { rating: -1 }; // Sort by descending order of rating field
          break;
        default:
          sortQuery = { createdAt: -1 }; // Default sorting by date
          break;
      }
  
      const reviews = await Review.find()
        .sort(sortQuery)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
  
      res.status(200).json({
        reviews,
        currentPage: page,
        totalPages,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve reviews.' });
    }
  };
  