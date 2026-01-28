import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./VerifyBooking.css";

const VerifyBooking = () => {
  const [booking, setBooking] = useState([]);

  const { bookingId } = useParams();
  const [bookingStatus, setBookingStatus] = useState([]);

  const [updateBookingStatus, setUpdateBookingStatus] = useState({
    bookingId: "",
    status: "",
  });

  updateBookingStatus.bookingId = bookingId;

  const retrieveAllBookingStatus = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/hotel/fetch/status"
    );
    return response.data;
  };

  useEffect(() => {
    const getBooking = async () => {
      const b = await retrieveBooking();
      if (b) {
        setBooking(b);
      }
    };

    const getAllBookingStatus = async () => {
      const allBookingStatus = await retrieveAllBookingStatus();
      if (allBookingStatus) {
        setBookingStatus(allBookingStatus);
      }
    };

    getAllBookingStatus();
    getBooking();
  }, []);

  const retrieveBooking = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/hotel/fetch/id?bookingId=" + bookingId
    );
    console.log(response.data);
    return response.data;
  };

  const handleBookingInput = (e) => {
    setUpdateBookingStatus({
      ...updateBookingStatus,
      [e.target.name]: e.target.value,
    });
  };

  let navigate = useNavigate();

  const updateHotelBookingStatus = (e) => {
    e.preventDefault();

    console.log(updateBookingStatus);

    fetch("http://localhost:8080/api/book/hotel/update/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBookingStatus),
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        navigate("/user/hotel/bookings/all");
      });
    });
  };

  const currency = (e) => {
    navigate("/currencyC");
  };

  return (
    <div className="verify-booking-container">
      <div className="verify-booking-card">
        <div className="verify-booking-header">
          <h5>Booking Verification</h5>
        </div>
        <div className="verify-booking-body">
          <form>
            <div className="booking-form-grid">
              <div className="booking-form-field">
                <label htmlFor="bookingId">Booking ID</label>
                <input
                  type="text"
                  id="bookingId"
                  value={booking.bookingId || ''}
                  required
                  readOnly
                />
              </div>

              <div className="booking-form-field">
                <label htmlFor="customerName">Customer Name</label>
                <input
                  type="text"
                  id="customerName"
                  value={booking.customerName || ''}
                  required
                  readOnly
                />
              </div>

              <div className="booking-form-field">
                <label htmlFor="customerContact">Customer Contact</label>
                <input
                  type="text"
                  id="customerContact"
                  value={booking.customerContact || ''}
                  required
                  readOnly
                />
              </div>

              <div className="booking-form-field">
                <label htmlFor="checkIn">Check In</label>
                <input
                  type="text"
                  id="checkIn"
                  value={booking.checkIn || ''}
                  required
                  readOnly
                />
              </div>

              <div className="booking-form-field">
                <label htmlFor="checkOut">Check Out</label>
                <input
                  type="text"
                  id="checkOut"
                  value={booking.checkOut || ''}
                  required
                  readOnly
                />
              </div>

              <div className="booking-form-field">
                <label htmlFor="totalRoom">Total Rooms</label>
                <input
                  type="text"
                  id="totalRoom"
                  value={booking.totalRoom || ''}
                  required
                  readOnly
                />
              </div>

              <div className="booking-form-field">
                <label htmlFor="totalAmount">Total Amount</label>
                <input
                  type="text"
                  id="totalAmount"
                  value={booking.totalAmount ? `LKR ${booking.totalAmount}` : ''}
                  required
                  readOnly
                />
              </div>

              <div className="booking-form-field">
                <label htmlFor="status">Booking Status</label>
                <select
                  id="status"
                  name="status"
                  onChange={handleBookingInput}
                >
                  <option value="">Select Status</option>
                  {bookingStatus.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>


            <div className="booking-form-actions">
              <button
                type="button"
                className="btn-verify btn-currency"
                onClick={currency}
              >
                Convert Currency
              </button>
              <button
                type="submit"
                className="btn-verify btn-update"
                onClick={updateHotelBookingStatus}
              >
                Update Booking Status
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyBooking;
