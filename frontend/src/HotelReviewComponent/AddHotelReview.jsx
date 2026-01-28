import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import HotelCarousel from "../HotelComponent/HotelCarousel";
import HotelCard from "../HotelComponent/HotelCard";
import StarRating from "../components/StarRating";
import { useAuthStore } from "../store/authStore";
import "./AddHotelReview.css";
import "react-toastify/dist/ReactToastify.css";

const AddHotelReview = () => {
  const { user } = useAuthStore();
  const { hotelId, locationId } = useParams();
  const navigate = useNavigate();

  const [userId] = useState(user ? user.id : "");
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");
  const [hotels, setHotels] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [hotel, setHotel] = useState({
    id: "",
    name: "",
    description: "",
    street: "",
    pincode: "",
    emailId: "",
    pricePerDay: "",
    totalRoom: "",
    image1: "",
    image2: "",
    image3: "",
    userId: "",
    location: { id: "", city: "", description: "" },
    facility: [{ id: "", name: "", description: "" }],
  });

  const MAX_CHARACTERS = 500;
  const MIN_CHARACTERS = 10;

  const retrieveHotel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/hotel/id?hotelId=${hotelId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching hotel:", error);
      toast.error("Failed to load hotel information");
      return null;
    }
  };

  const retrieveHotelsByLocation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/hotel/location?locationId=${locationId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching hotels:", error);
      return null;
    }
  };

  useEffect(() => {
    const getHotel = async () => {
      const retrievedHotel = await retrieveHotel();
      if (retrievedHotel && retrievedHotel.hotel) {
        setHotel(retrievedHotel.hotel);
      }
    };

    const getHotelsByLocation = async () => {
      const allHotels = await retrieveHotelsByLocation();
      if (allHotels && allHotels.hotels) {
        setHotels(allHotels.hotels);
      }
    };

    getHotel();
    getHotelsByLocation();
  }, [hotelId, locationId]);

  const validateForm = () => {
    const newErrors = {};

    if (!star || star === 0) {
      newErrors.star = "Please select a rating";
    }

    if (!review.trim()) {
      newErrors.review = "Review is required";
    } else if (review.trim().length < MIN_CHARACTERS) {
      newErrors.review = `Review must be at least ${MIN_CHARACTERS} characters`;
    } else if (review.length > MAX_CHARACTERS) {
      newErrors.review = `Review must not exceed ${MAX_CHARACTERS} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStarChange = (rating) => {
    setStar(rating);
    if (errors.star) {
      setErrors({ ...errors, star: "" });
    }
  };

  const handleReviewChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setReview(value);
      if (errors.review && value.trim().length >= MIN_CHARACTERS) {
        setErrors({ ...errors, review: "" });
      }
    }
  };

  const saveHotelReview = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login as a Customer to add your review!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (!validateForm()) {
      toast.warning("Please fix the errors in the form", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    setIsSubmitting(true);

    const data = { userId, hotelId, star, review: review.trim() };

    try {
      const response = await fetch("http://localhost:8080/api/hotel/review/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.responseMessage || "Review added successfully!", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate(`/hotel/${hotel.id}/location/${hotel.location.id}`);
        }, 2000);
      } else {
        toast.error(result.responseMessage || "Failed to add review", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred while submitting your review", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCharacterCountClass = () => {
    const length = review.length;
    if (length >= MAX_CHARACTERS) return "error";
    if (length >= MAX_CHARACTERS * 0.9) return "warning";
    return "";
  };

  return (
    <>
      <div className="add-review-container">
        <div className="add-review-layout">
          {/* Hotel Carousel */}
          <div className="image-border1234">
            <HotelCarousel
              item={{
                hotelName: hotel.name,
                image1: hotel.image1,
                image2: hotel.image2,
                image3: hotel.image3,
              }}
            />
          </div>

          {/* Review Form */}
          <div className="review-form">
            <div className="review-form-header">
              <h5 className="review-form-title">Add Hotel Review</h5>
            </div>

            <form onSubmit={saveHotelReview}>
              {/* Star Rating */}
              <div className="form-group">
                <label className="form-label required">Rating</label>
                <div className="star-rating-section">
                  <span className="star-rating-label">
                    How would you rate your experience?
                  </span>
                  <div className="star-rating-input">
                    <StarRating
                      rating={star}
                      onChange={handleStarChange}
                      interactive={true}
                      size="lg"
                      color="gold"
                    />
                  </div>
                  {star > 0 && (
                    <span className="selected-rating-text">
                      You selected {star} {star === 1 ? 'star' : 'stars'}
                    </span>
                  )}
                  {errors.star && (
                    <div className="error-message">
                      <FontAwesomeIcon icon={faExclamationCircle} />
                      {errors.star}
                    </div>
                  )}
                </div>
              </div>

              {/* Review Text */}
              <div className="form-group">
                <label htmlFor="review" className="form-label required">
                  Your Review
                </label>
                <textarea
                  className={`form-textarea ${errors.review ? 'error' : ''}`}
                  id="review"
                  rows="5"
                  placeholder="Share your experience about this hotel..."
                  onChange={handleReviewChange}
                  value={review}
                />
                <div className="character-counter">
                  <span className={`character-count ${getCharacterCountClass()}`}>
                    {review.length}/{MAX_CHARACTERS} characters
                  </span>
                  {review.trim().length > 0 && review.trim().length < MIN_CHARACTERS && (
                    <span className="error" style={{ fontSize: 'var(--text-xs)' }}>
                      {MIN_CHARACTERS - review.trim().length} more characters needed
                    </span>
                  )}
                </div>
                {errors.review && (
                  <div className="error-message">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    {errors.review}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Submit Review
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Related Hotels Section */}
      {hotels.length > 0 && (
        <div className="related-hotels-section">
          <h2 className="related-hotels-title">
            All Hotels in {hotel.location.city} Location
          </h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {hotels.map((h, index) => (
              <HotelCard key={index} item={h} />
            ))}
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default AddHotelReview;
