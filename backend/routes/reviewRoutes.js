const {
    submitReview,
    getReviews
  } = require("../controllers/reviewControllers");
  
  const router = require("express").Router();
  
  router.post("/submitReview", submitReview);
  router.get("/getReviews", getReviews);
  
  module.exports = router;
  