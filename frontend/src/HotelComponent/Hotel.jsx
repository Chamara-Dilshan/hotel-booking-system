import GetAllLocations from "../LocationComponent/GetAllLocations";
import LocationNavigator from "../LocationComponent/LocationNavigator";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import HotelCard from "./HotelCard";
import HotelCarousel from "./HotelCarousel";
import GetHotelFacilities from "../FacilityComponent/GetHotelFacilities";
import GetHotelReviews from "../HotelReviewComponent/GetHotelReviews";
import Footer from "../page/Footer";
import { redirect, Link, useNavigate, useParams } from "react-router-dom";
import Payment from "../Payment/Payment";
import "./HotelDetail.css";

const Hotel = (setTotal) => {
  const { hotelId, locationId } = useParams();

  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  let admin = JSON.parse(sessionStorage.getItem("active-admin"));

  const [quantity, setQuantity] = useState("");

  const [hotels, setHotels] = useState([]);

const navigate = useNavigate();


  const [facilitiesToPass, setFacilitiesToPass] = useState([]);

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

  const [booking, setBooking] = useState({
    userId: "",
    hotelId: "",
    checkIn: "",
    checkOut: "",
    totalRoom: "",
    totalDay: "",
  });

  const currency = (e) => {
    navigate("/currencyC");
    
  };

  const handleBookingInput = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
    
  };
  
  const retrieveHotel = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/hotel/id?hotelId=" + hotelId
    );

    return response.data;
  };

  useEffect(() => {
    const getHotel = async () => {
      const retrievedHotel = await retrieveHotel();

      setHotel(retrievedHotel.hotel);
    };

    const getHotelsByLocation = async () => {
      const allHotels = await retrieveHotelsByLocation();
      if (allHotels) {
        setHotels(allHotels.hotels);
      }
    };

    getHotel();
    getHotelsByLocation();

    console.log("Print hotel");
    console.log(hotel.json);

    setFacilitiesToPass(hotel.facility);
  }, [hotelId]);

  const retrieveHotelsByLocation = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/hotel/location?locationId=" + locationId
    );
    console.log(response.data);
    return response.data;
  };

  const saveProductToCart = (userId) => {
    fetch("http://localhost:8080/api/user/cart/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
        userId: userId,
        hotelId: hotelId,
      }),
    }).then((result) => {
      console.log("result", result);

      toast.success("Products added to Cart Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      result.json().then((res) => {
        console.log("response", res);
      });
    });
  };

  const bookHotel = (e) => {
    if (user == null) {
      alert("Please login to book the hotels!!!");
      e.preventDefault();

      let totalPrice = 0;

      if (
        booking.checkIn !== "0" &&
  booking.checkOut !== "0" &&
  booking.totalRoom !== 0 &&
  booking.totalDay !== 0
      ) { 
       
        
        alert("Please fill in all the booking details.");
        setTotal(0); // Assign zero to the total price
    return;
      }
    } else {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("hotelId", hotelId);
      formData.append("checkIn", booking.checkIn);
      formData.append("checkOut", booking.checkOut);
      formData.append("totalRoom", booking.totalRoom);
      formData.append("totalDay", booking.totalDay);

      console.log(formData);

      axios
        .post("http://localhost:8080/api/book/hotel/", formData)
        .then((result) => {
          result.json().then((res) => {
            console.log(res);
            console.log(res.responseMessage);
            alert("Hotel Booked Successfully!!!");
            console.log("Hotel Booked Successfully!!!");

          });
        }); 
              
        navigate('/pay') 

    
    
    }
  };

  const navigateToAddHotelFacility = () => {
    navigate("/hotel/" + hotelId + "/add/facility");
  };
  const totalPrice = hotel.pricePerDay * booking.totalDay * booking.totalRoom;
  const navigateToAddReviewPage = () => {
    navigate("/hotel/" + hotelId + "/location/" + locationId + "/add/review");
  };

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const dateDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  // Use the `dateDifference` variable as needed
  console.log("Date difference:", dateDifference);

  return (
    <div className="hotel-detail-container">
      <div className="hotel-detail-main">
        <div className="hotel-detail-grid">
          <div className="hotel-carousel-section">
            <div className="carousel-wrapper">
              <HotelCarousel
                item={{
                  image1: hotel.image1,
                  image2: hotel.image2,
                  image3: hotel.image3,
                }}
              />
            </div>
          </div>

          <div className="hotel-info-card">
            <div className="hotel-info-header">
              <h1>{hotel.name}</h1>
            </div>

            <div className="hotel-info-body">
              <div className="hotel-description-section">
                <h3>Description</h3>
                <p>{hotel.description}</p>
              </div>
            </div>

            <div className="hotel-info-footer">
              <div className="price-badge">
                <h4>Price Per Day: LKR {hotel.pricePerDay}</h4>
              </div>

              <p className="room-count">
                <b>Total Rooms: {hotel.totalRoom}</b>
              </p>

              <form className="booking-form" onSubmit={bookHotel}> 
                <div className="form-group">
                  <label htmlFor="checkin">Check-in</label>
                  <input
                    type="date"
                    id="checkin"
                    name="checkIn"
                    onChange={handleBookingInput}
                    value={booking.checkIn}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkout">Check-out</label>
                  <input
                    type="date"
                    id="checkout"
                    name="checkOut"
                    onChange={handleBookingInput}
                    value={booking.checkOut}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="totalroom">Total Rooms</label>
                  <input
                    type="number"
                    id="totalroom"
                    name="totalRoom"
                    onChange={handleBookingInput}
                    value={booking.totalRoom}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="totalDay">Total Days</label>
                  <input
                    type="number"
                    id="totalDay"
                    name="totalDay"
                    onChange={handleBookingInput}
                    value={booking.totalDay}
                    required
                  />
                </div>
                {user && (
                  <div className="payment-section">
                    <Payment totalAmount={totalPrice !== 0 ? totalPrice : 0} />
                  </div>
                )}

                {totalPrice > 0 && (
                  <div className="total-price-display">
                    <h4>Total Payable Amount: LKR {totalPrice}</h4>
                  </div>
                )}

                {(!booking.checkIn || !booking.checkOut) && (
                  <div className="alert-warning" role="alert">
                    Please fill in check-in and check-out dates.
                  </div>
                )}
              </form>

              <div className="action-buttons">
                {admin && (
                  <button
                    className="btn-action btn-secondary-action"
                    onClick={navigateToAddHotelFacility}
                  >
                    Add Facilities
                  </button>
                )}

                <button
                  className="btn-action btn-primary-action"
                  onClick={currency}
                >
                  Change Currency
                </button>

                {user && (
                  <button
                    className="btn-action btn-primary-action"
                    onClick={navigateToAddReviewPage}
                  >
                    Add Review
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <GetHotelFacilities item={hotel} />
          </div>

          <div className="sidebar-section">
            <GetHotelReviews item={hotel} />
          </div>
        </div>

        <div className="related-hotels-section">
          <h2 className="section-heading">
            All Hotels in <span className="city-name">{hotel.location.city}</span> Location
          </h2>
          <div className="hotels-grid-related">
            {hotels.map((h) => (
              <HotelCard key={h.id} item={h} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Hotel;
