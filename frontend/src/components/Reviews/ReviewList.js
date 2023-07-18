import React, { useEffect, useState } from 'react'
import axios from "axios";
import { getReviewRoute } from "../utils/APIRoutes";
import './ReviewList.css';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalPages, setTotalPages] = useState();
  const [sortOption, setSortOption] = useState(
    () => localStorage.getItem('sortOption') || 'date'
  );
  const fetchReviews = async () => {
    try {
      // console.log("Before API calling");
      const { data } = await axios.get(
        getReviewRoute, 
        {
        params: {
          page: currentPage,
          pageSize: pageSize,
          sortBy: sortOption,
        },
      });
      // console.log(data);
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    setCurrentPage(1);
    localStorage.setItem('sortOption', selectedOption);
  };
  
  useEffect(() => {
    fetchReviews();
  }, [currentPage, pageSize, sortOption]);

  return (
    <div>
      <div id="reviews-container">
        <section id="review-list">
          {/* Sort Dropdown */}
          <div>
            <label htmlFor="sort-option">Sort By:</label>
            <select id="sort-option" value={sortOption} onChange={handleSortChange}>
              <option value="date">Date</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          {/* Reviews */}
          {reviews.map((review) => {
            return (
              <div key={review._id} className="review">
                <h4>{review.name}</h4>
                <p>Rating: {review.rating} Stars</p>
                <p>{review.review}</p>
                <p className="date">Date: {new Date(review.createdAt).toLocaleString()}</p>
              </div>
            )
          })}
        </section>
      </div>
      {/* Pagination controls */}
      <div>

        <div id="pagination-container">
          <button id="previous-btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button id="next-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

      </div>

    </div>
  )
}

export default ReviewList
