import React, { useState } from 'react'
import ReviewList from './ReviewList';
import './Reviews.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { submitReviewRoute } from "../utils/APIRoutes";

function Reviews() {
  const [name, setName] = useState();
  const [rating, setRating] = useState();
  const [review, setReview] = useState();

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !rating || !review) {
      // console.log("Please fill all the fields");
      toast.error("Please fill all the fields.", toastOptions);
      return;
    }
    try {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        // navigate('./login');
        // console.log("You need to login to submit review");
        toast.error("You need to login to submit review.", toastOptions);
        return;
      }
      const ratingValue = parseInt(rating);
      const { data } = await axios.post(
        submitReviewRoute,
        {
          name,
          rating:6-ratingValue,
          review
        }
      );
      // console.log(data);
      console.log("Review submitted successfully");
    } catch (error) {
      console.log("Unable to submit the review");
    }
  };
  const logout = () => {
    localStorage.clear();
    navigate("./login")
  }
  return (
    <div>
      <div className="login-button-container">
      {localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY) ? (
        <button className="logout-button" onClick={()=>logout()}>
          Logout
        </button>
      ) : (
        <Link to="/login" className="login-button">
          Login
        </Link>
      )}
    </div>
      <div id="reviews-container">
        <h2>Reviews and Ratings</h2>
        <section id="new-review">
          <h4>Add a Review</h4>
          <form id="review-form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required onChange={(e) => setName(e.target.value)} />

            <label htmlFor="rating">Rating:</label>
            <div className="star-rating">
              <input type="radio" name="rating" id="rating-1" value="1" onChange={(e) => setRating(e.target.value)}/>
              <label htmlFor="rating-1">&#9733;</label>
              <input type="radio" name="rating" id="rating-2" value="2" onChange={(e) => setRating(e.target.value)}/>
              <label htmlFor="rating-2">&#9733;</label>
              <input type="radio" name="rating" id="rating-3" value="3" onChange={(e) => setRating(e.target.value)}/>
              <label htmlFor="rating-3">&#9733;</label>
              <input type="radio" name="rating" id="rating-4" value="4" onChange={(e) => setRating(e.target.value)}/>
              <label htmlFor="rating-4">&#9733;</label>
              <input type="radio" name="rating" id="rating-5" value="5" onChange={(e) => setRating(e.target.value)}/>
              <label htmlFor="rating-5">&#9733;</label>
            </div>


            <label htmlFor="comments">Comments:</label>
            <textarea id="review-text" name="review-text" rows="4" required onChange={(e) => setReview(e.target.value)}></textarea>

            <button type="submit" id="submit-btn" onClick={submitHandler}>Submit</button>
          </form>
          <div id="review-list">
          <ReviewList/>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Reviews
