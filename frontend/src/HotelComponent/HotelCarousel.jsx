import React from 'react';
import './HotelCarousel.css';

const HotelCarousel = ({ item }) => {
  return (
    <div
      id="carouselExampleCaptions2"
      className="carousel slide hotel-carousel"
      data-bs-ride="carousel"
      data-bs-interval="5000"
      data-bs-touch="true"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions2"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions2"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions2"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={`http://localhost:8080/api/hotel/${item.image1}`}
            className="d-block w-100"
            alt={`${item.hotelName || 'Hotel'} - Image 1`}
          />
        </div>
        <div className="carousel-item">
          <img
            src={`http://localhost:8080/api/hotel/${item.image2}`}
            className="d-block w-100"
            alt={`${item.hotelName || 'Hotel'} - Image 2`}
          />
        </div>
        <div className="carousel-item">
          <img
            src={`http://localhost:8080/api/hotel/${item.image3}`}
            className="d-block w-100"
            alt={`${item.hotelName || 'Hotel'} - Image 3`}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions2"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions2"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HotelCarousel;
