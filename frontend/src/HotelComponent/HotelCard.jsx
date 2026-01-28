import { Link } from "react-router-dom";
import LocationNavigator from "../LocationComponent/LocationNavigator";
import "./Hotel.css";

const HotelCard = ({ item }) => {
  return (
    <article className="hotel-card">
      {/* Image Container */}
      <Link
        to={`/hotel/${item.id}/location/${item.location.id}`}
        className="hotel-card-image-wrapper"
      >
        <img
          src={`http://localhost:8080/api/hotel/${item.image2}`}
          className="hotel-card-image"
          alt={item.name}
        />
        <div className="hotel-card-badge">
          <LocationNavigator
            item={{
              id: item.location.id,
              city: item.location.city,
            }}
          />
        </div>
      </Link>

      {/* Card Body */}
      <div className="hotel-card-body">
        <h3 className="hotel-card-title">{item.name}</h3>
        <p className="hotel-card-description">{item.description}</p>
        
        <div className="hotel-card-meta">
          <span className="hotel-card-rooms">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
              <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>
              <path d="M12 4v6"/>
              <path d="M2 18h20"/>
            </svg>
            {item.totalRoom} rooms
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="hotel-card-footer">
        <div className="hotel-card-price">
          <span className="price-label">per night</span>
          <span className="price-value">LKR {item.pricePerDay?.toLocaleString()}</span>
        </div>
        <Link
          to={`/hotel/${item.id}/location/${item.location.id}`}
          className="btn btn-primary btn-sm"
        >
          Book Now
        </Link>
      </div>
    </article>
  );
};

export default HotelCard;
