import React, { useState, useEffect } from 'react';
import Stripe from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { STRIPE_CONFIG, API_ENDPOINTS } from '../config/api';
import './Payment.css';

function Payment({
  totalAmount,
  bookingDetails = {},
  onPaymentSuccess,
  onPaymentError
}) {
  const [usdToLkrRate, setUsdToLkrRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [fetchingRate, setFetchingRate] = useState(true);
  const margin = 1.762;

  // Default booking details for display
  const {
    hotelName = 'Hotel Booking',
    hotelImage = '',
    hotelLocation = '',
    checkIn = '',
    checkOut = '',
    guests = 1,
    rooms = 1,
    nights = 1,
    pricePerNight = totalAmount,
    taxes = 0,
  } = bookingDetails;

  const subtotal = pricePerNight * nights * rooms;
  const total = totalAmount || subtotal + taxes;

  useEffect(() => {
    async function fetchExchangeRate() {
      setFetchingRate(true);
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const rate = response.data.rates.LKR;
        setUsdToLkrRate(rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        toast.error('Failed to fetch exchange rate');
      } finally {
        setFetchingRate(false);
      }
    }

    fetchExchangeRate();
  }, []);

  async function handleToken(token) {
    setLoading(true);
    try {
      await axios.post(API_ENDPOINTS.PAYMENT_CHARGE, '', {
        headers: {
          token: token.id,
          amount: total / (usdToLkrRate + margin),
        },
      });

      setPaymentSuccess(true);
      toast.success('Payment successful!');

      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');

      if (onPaymentError) {
        onPaymentError(error);
      }
    } finally {
      setLoading(false);
    }
  }

  // Configuration error state
  if (!STRIPE_CONFIG.publicKey) {
    return (
      <div className="payment-container">
        <div className="config-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h2>Payment Configuration Error</h2>
          <p>Payment system is currently unavailable. Please contact support for assistance.</p>
        </div>
      </div>
    );
  }

  // Payment success state
  if (paymentSuccess) {
    return (
      <div className="payment-container">
        <div className="payment-wrapper">
          <div className="booking-summary-card">
            <div className="payment-success">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2>Payment Successful!</h2>
              <p>Your booking has been confirmed. A confirmation email will be sent to you shortly.</p>
              <button
                className="pay-button"
                onClick={() => window.location.href = '/user/bookings'}
              >
                View My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-wrapper">
        {/* Header */}
        <div className="payment-header">
          <h1>Complete Your Booking</h1>
          <p>Secure payment powered by Stripe</p>
        </div>

        <div className="payment-content">
          {/* Booking Summary */}
          <div className="booking-summary-card">
            <div className="summary-header">
              <h2>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                Booking Summary
              </h2>
            </div>

            <div className="summary-body">
              {/* Hotel Info */}
              <div className="hotel-summary">
                {hotelImage && (
                  <img
                    src={hotelImage.startsWith('http') ? hotelImage : `http://localhost:8080/api/hotel/${hotelImage}`}
                    alt={hotelName}
                    className="hotel-summary-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=Hotel';
                    }}
                  />
                )}
                <div className="hotel-summary-info">
                  <h3 className="hotel-summary-name">{hotelName}</h3>
                  {hotelLocation && (
                    <p className="hotel-summary-location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {hotelLocation}
                    </p>
                  )}
                </div>
              </div>

              {/* Booking Details */}
              <div className="booking-details-grid">
                {checkIn && (
                  <div className="detail-block">
                    <span className="detail-block-label">Check-in</span>
                    <span className="detail-block-value">{checkIn}</span>
                  </div>
                )}
                {checkOut && (
                  <div className="detail-block">
                    <span className="detail-block-label">Check-out</span>
                    <span className="detail-block-value">{checkOut}</span>
                  </div>
                )}
                <div className="detail-block">
                  <span className="detail-block-label">Guests</span>
                  <span className="detail-block-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
                </div>
                <div className="detail-block">
                  <span className="detail-block-label">Rooms</span>
                  <span className="detail-block-value">{rooms} Room{rooms > 1 ? 's' : ''}</span>
                </div>
                {nights > 0 && (
                  <div className="detail-block">
                    <span className="detail-block-label">Duration</span>
                    <span className="detail-block-value">{nights} Night{nights > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown">
                <h4 className="price-breakdown-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  Price Details
                </h4>

                {pricePerNight > 0 && nights > 0 && (
                  <div className="price-line">
                    <span className="price-line-label">
                      LKR {pricePerNight.toLocaleString()} x {nights} night{nights > 1 ? 's' : ''} x {rooms} room{rooms > 1 ? 's' : ''}
                    </span>
                    <span className="price-line-value">LKR {subtotal.toLocaleString()}</span>
                  </div>
                )}

                {taxes > 0 && (
                  <div className="price-line">
                    <span className="price-line-label">Taxes & Fees</span>
                    <span className="price-line-value">LKR {taxes.toLocaleString()}</span>
                  </div>
                )}

                <div className="price-line subtotal">
                  <span className="price-line-label">Subtotal</span>
                  <span className="price-line-value">LKR {subtotal.toLocaleString()}</span>
                </div>

                <div className="price-line total">
                  <span className="price-line-label">Total Amount</span>
                  <span className="price-line-value">LKR {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="payment-card">
            <div className="payment-card-header">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                <div className="payment-method-icon visa">VISA</div>
                <div className="payment-method-icon mastercard">MC</div>
                <div className="payment-method-icon amex">AMEX</div>
              </div>
            </div>

            <div className="payment-card-body">
              {fetchingRate ? (
                <div className="payment-loading">
                  <div className="spinner"></div>
                  <p>Loading payment options...</p>
                </div>
              ) : (
                <>
                  <div className="stripe-container">
                    {usdToLkrRate && (
                      <Stripe
                        stripeKey={STRIPE_CONFIG.publicKey}
                        token={handleToken}
                        amount={Math.round((total / (usdToLkrRate + margin)) * 100)}
                        currency="USD"
                        name={hotelName}
                        description={`Booking for ${nights} night${nights > 1 ? 's' : ''}`}
                        label={loading ? 'Processing...' : `Pay LKR ${total.toLocaleString()}`}
                        disabled={loading}
                      />
                    )}
                  </div>

                  {/* Security Badges */}
                  <div className="security-badges">
                    <div className="security-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>256-bit SSL Encrypted Payment</span>
                    </div>
                    <div className="security-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span>Secure Payment by Stripe</span>
                    </div>
                    <div className="security-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span>Instant Booking Confirmation</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Secure</span>
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Instant</span>
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <span>Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
