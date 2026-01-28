import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../components/StarRating';
import './GetHotelReviews.css';

const GetHotelReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hotelId } = useParams();

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return '?';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Format date to relative or absolute format
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const reviewDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - reviewDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

    // Format as "January 27, 2026"
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return reviewDate.toLocaleDateString('en-US', options);
  };

  const retrieveAllReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/hotel/review/fetch?hotelId=${hotelId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return null;
    }
  };

  useEffect(() => {
    const getAllReviews = async () => {
      setLoading(true);
      const allReviews = await retrieveAllReviews();
      if (allReviews && allReviews.hotelReviews) {
        setReviews(allReviews.hotelReviews);
      }
      setLoading(false);
    };

    if (hotelId) {
      getAllReviews();
    }
  }, [hotelId]);

  if (loading) {
    return (
      <div className="reviews-section">
        <div className="reviews-header">
          <div className="reviews-header-title">
            <FontAwesomeIcon icon={faComments} />
            Reviews
          </div>
        </div>
        <div className="reviews-loading">
          <div className="reviews-loading-spinner"></div>
          <p className="reviews-loading-text">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="reviews-section">
        <div className="reviews-header">
          <div className="reviews-header-title">
            <FontAwesomeIcon icon={faComments} />
            Reviews
          </div>
          <span className="reviews-count">0 reviews</span>
        </div>
        <div className="reviews-empty">
          <FontAwesomeIcon icon={faCommentSlash} className="reviews-empty-icon" />
          <h3 className="reviews-empty-title">No reviews yet</h3>
          <p className="reviews-empty-text">
            Be the first to review this hotel!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <div className="reviews-header-title">
          <FontAwesomeIcon icon={faComments} />
          Reviews
        </div>
        <span className="reviews-count">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
      </div>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <div className="review-avatar">
                {getUserInitials(review.user)}
              </div>
              <div className="review-info">
                <div className="review-user">
                  <span className="review-user-name">{review.user || 'Anonymous'}</span>
                  <span className="review-date">{formatDate(review.createdDate)}</span>
                </div>
                <div className="review-rating">
                  <StarRating
                    rating={review.star || 0}
                    size="sm"
                    color="gold"
                  />
                </div>
              </div>
            </div>
            {review.review && (
              <div className="review-content">
                {review.review}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetHotelReviews;
