// API Configuration - Hotel Booking System
// All API endpoints centralized here

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/user/login`,
  REGISTER: `${API_BASE_URL}/api/user/register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/user/forgot-password`,

  // Users
  USERS: `${API_BASE_URL}/api/user`,
  USER_BY_ID: (id) => `${API_BASE_URL}/api/user/id?userId=${id}`,
  USERS_BY_ROLE: (role) => `${API_BASE_URL}/api/user/role?role=${role}`,

  // Hotels
  HOTELS: `${API_BASE_URL}/api/hotel`,
  HOTEL_FETCH: `${API_BASE_URL}/api/hotel/fetch`,
  HOTEL_BY_ID: (id) => `${API_BASE_URL}/api/hotel/id?hotelId=${id}`,
  HOTELS_BY_LOCATION: (locationId) => `${API_BASE_URL}/api/hotel/location?locationId=${locationId}`,
  HOTEL_ADD: `${API_BASE_URL}/api/hotel/add`,
  HOTEL_IMAGE: (imageName) => `${API_BASE_URL}/api/hotel/${imageName}`,

  // Bookings
  BOOKINGS: `${API_BASE_URL}/api/book/hotel`,
  BOOKING_FETCH: `${API_BASE_URL}/api/book/hotel/fetch`,
  BOOKING_BY_ID: (bookingId) => `${API_BASE_URL}/api/book/hotel/fetch/id?bookingId=${bookingId}`,
  BOOKINGS_BY_USER: (userId) => `${API_BASE_URL}/api/book/hotel/fetch?userId=${userId}`,
  BOOKINGS_BY_HOTEL: (hotelId) => `${API_BASE_URL}/api/book/hotel/fetch/hotel?hotelId=${hotelId}`,
  BOOKING_STATUS: `${API_BASE_URL}/api/book/hotel/status/update`,

  // Locations
  LOCATIONS: `${API_BASE_URL}/api/location`,
  LOCATION_FETCH: `${API_BASE_URL}/api/location/fetch`,
  LOCATION_ADD: `${API_BASE_URL}/api/location/add`,

  // Facilities
  FACILITIES: `${API_BASE_URL}/api/facility`,
  FACILITY_FETCH: `${API_BASE_URL}/api/facility/fetch`,
  FACILITY_ADD: `${API_BASE_URL}/api/facility/add`,
  HOTEL_FACILITIES: `${API_BASE_URL}/api/hotel/facility`,
  HOTEL_FACILITY_ADD: `${API_BASE_URL}/api/hotel/facility/add`,
  FACILITIES_BY_HOTEL: (hotelId) => `${API_BASE_URL}/api/hotel/facility/fetch?hotelId=${hotelId}`,

  // Reviews
  REVIEWS: `${API_BASE_URL}/api/review`,
  REVIEW_ADD: `${API_BASE_URL}/api/review/add`,
  REVIEWS_BY_HOTEL: (hotelId) => `${API_BASE_URL}/api/review/hotel?hotelId=${hotelId}`,

  // Employees
  EMPLOYEES: `${API_BASE_URL}/api/employee`,
  EMPLOYEE_BY_ID: (id) => `${API_BASE_URL}/api/employee/${id}`,

  // Payment
  PAYMENT_CHARGE: `${API_BASE_URL}/api/payment/charge`,
};

// Stripe Configuration
export const STRIPE_CONFIG = {
  publicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
};

export default API_BASE_URL;
