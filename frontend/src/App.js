import "./App.css";
import "./styles/animations.css";
import "./styles/responsive.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import Header from "./NavbarComponent/Header";
import { LoadingOverlay } from "./components/Skeleton";

// Eager load critical paths
import Landing from './page/landing/landing';
import HomePage from "./page/HomePage";
import UserLoginForm from "./UserComponent/UserLoginForm";

// Lazy load less critical components
const TripPlanner = lazy(() => import("./page/TripPlanner/TripPlanner"));
const ContactUs = lazy(() => import("./page/ContactUs"));
const AddLocation = lazy(() => import("./LocationComponent/AddLocation"));
const AddFacility = lazy(() => import("./FacilityComponent/AddFacility"));
const AddHotelForm = lazy(() => import("./HotelComponent/AddHotelForm"));
const UserRegister = lazy(() => import("./UserComponent/UserRegister"));
const Hotel = lazy(() => import("./HotelComponent/Hotel"));
const AddHotelFacilities = lazy(() => import("./FacilityComponent/AddHotelFacilities"));
const AddHotelReview = lazy(() => import("./HotelReviewComponent/AddHotelReview"));
const ViewAllBooking = lazy(() => import("./BookingComponent/ViewAllBooking"));
const ViewMyBooking = lazy(() => import("./BookingComponent/ViewMyBooking"));
const ViewMyHotelBookings = lazy(() => import("./BookingComponent/ViewMyHotelBookings"));
const VerifyBooking = lazy(() => import("./BookingComponent/VerifyBooking"));
const Payment = lazy(() => import("./Payment/Payment"));
const ListEmployeeComponent = lazy(() => import("./page/AdminDashboard/ListEmployeeComponent"));
const ViewEmployeeComponent = lazy(() => import("./page/AdminDashboard/ViewEmployeeComponent"));
const CreateEmployeeComponent = lazy(() => import("./page/AdminDashboard/CreateEmployeeComponent"));
const OTP = lazy(() => import("./UserComponent/OTP"));
const CurrencyConverter = lazy(() => import("./Payment/CurrencyConverter"));
const ForgetPassword = lazy(() => import("./page/ForgetPassword/ForgetPassword"));

// Loading fallback component
const PageLoader = () => (
  <div className="page-loader">
    <LoadingOverlay message="Loading..." />
  </div>
);

function App() {
  const [totalAmount, setTotalAmount] = useState(0);
  
  return (
    <div className="app-container">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/all/hotel/location" element={<HomePage />} />
            <Route path="/home/hotel/location/:locationId/:locationName" element={<HomePage />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="TripPlanner" element={<TripPlanner />} />
            
            {/* Authentication */}
            <Route path="/user/login" element={<UserLoginForm />} />
            <Route path="user/hotel/register" element={<UserRegister />} />
            <Route path="user/customer/register" element={<UserRegister />} />
            <Route path="user/admin/register" element={<UserRegister />} />
            <Route path="/OTP" element={<OTP />} />
            <Route path="/forgetP" element={<ForgetPassword />} />
            
            {/* Admin Dashboard */}
            <Route path="/admindashb" element={<ListEmployeeComponent />} />
            <Route path="/admindashb/add-employee" element={<CreateEmployeeComponent />} />
            <Route path="/admindashb/view-employee/:id" element={<ViewEmployeeComponent />} />
            
            {/* Admin Functions */}
            <Route path="admin/add-location" element={<AddLocation />} />
            <Route path="admin/add-facility" element={<AddFacility />} />
            <Route path="admin/hotel/register" element={<AddHotelForm />} />
            
            {/* Hotel Pages */}
            <Route path="/hotel/:hotelId/location/:locationId" element={<Hotel setTotal={setTotalAmount} />} />
            <Route path="hotel/:hotelId/add/facility" element={<AddHotelFacilities />} />
            <Route path="hotel/:hotelId/location/:locationId/add/review" element={<AddHotelReview />} />
            
            {/* Booking & Payment */}
            <Route path="user/admin/booking/all" element={<ViewAllBooking />} />
            <Route path="user/hotel/bookings" element={<ViewMyBooking />} />
            <Route path="user/hotel/bookings/all" element={<ViewMyHotelBookings />} />
            <Route path="/hotel/verify/booking/:bookingId" element={<VerifyBooking />} />
            <Route path="/pay" element={<Payment total={totalAmount} />} />
            <Route path="/currencyC" element={<CurrencyConverter />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
