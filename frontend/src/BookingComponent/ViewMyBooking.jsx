import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useAuthStore } from "../store/authStore";
import "./ViewMyBooking.css";

const ViewMyBooking = () => {
  const [allBookings, setAllBookings] = useState([]);
  const { user } = useAuthStore();

  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('confirm')) return 'confirmed';
    if (statusLower.includes('pending')) return 'pending';
    if (statusLower.includes('cancel')) return 'cancelled';
    if (statusLower.includes('complete')) return 'completed';
    return '';
  };

  useEffect(() => {
    const getAllBooking = async () => {
      const allBooking = await retrieveAllBooking();
      if (allBooking) {
        setAllBookings(allBooking.bookings);
      }
    };

    getAllBooking();
  }, []);

  const retrieveAllBooking = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/hotel/fetch?userId=" + user.id
    );
    console.log(response.data);
    return response.data;
  };

  return (
    <div className="my-bookings-container">
      <div className="my-bookings-wrapper">
        <div className="my-bookings-header">
          <h2>My Bookings</h2>
        </div>
        <div className="my-bookings-body">
          {allBookings.length > 0 ? (
            <div className="bookings-grid">
              {allBookings.map((booking, index) => (
                <div key={index} className="booking-card">
                  <div className="booking-card-content">
                    <img
                      src={`http://localhost:8080/api/hotel/${booking.hotelImage}`}
                      className="booking-image"
                      alt={booking.hotelName}
                    />
                    <div className="booking-details">
                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Hotel Name</span>
                        <span className="booking-detail-value">{booking.hotelName}</span>
                      </div>

                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Booking ID</span>
                        <span className="booking-detail-value">{booking.bookingId}</span>
                      </div>

                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Customer Name</span>
                        <span className="booking-detail-value">{booking.customerName}</span>
                      </div>

                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Contact</span>
                        <span className="booking-detail-value">{booking.customerContact}</span>
                      </div>

                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Check In</span>
                        <span className="booking-detail-value">{booking.checkIn}</span>
                      </div>

                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Check Out</span>
                        <span className="booking-detail-value">{booking.checkOut}</span>
                      </div>

                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Rooms</span>
                        <span className="booking-detail-value">{booking.totalRoom} room(s)</span>
                      </div>

                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Duration</span>
                        <span className="booking-detail-value">{booking.totalDay} day(s)</span>
                      </div>

                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Status</span>
                        <span className={`booking-status ${getStatusClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Total Amount</span>
                        <span className="booking-amount">LKR {booking.totalAmount?.toLocaleString()}</span>
                      </div>

                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Hotel Email</span>
                        <span className="booking-detail-value">{booking.hotelEmail}</span>
                      </div>

                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Hotel Contact</span>
                        <span className="booking-detail-value">{booking.hotelContact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-bookings">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <h3>No Bookings Found</h3>
              <p>You haven't made any bookings yet. Start exploring hotels to make your first booking!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMyBooking;
