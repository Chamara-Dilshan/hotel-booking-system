import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GetAllLocations = () => {
  const [locations, setLocations] = useState([]);

  const retrieveAllLocations = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/location/fetch"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllLocations = async () => {
      const allLocations = await retrieveAllLocations();
      if (allLocations) {
        setLocations(allLocations.locations);
      }
    };

    getAllLocations();
  }, []);

  return (
    <div className="sidebar-card">
      <h6 className="sidebar-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Locations
      </h6>
      <div className="sidebar-list">
        <Link to="/home/all/hotel/location" className="sidebar-link active">
          All Locations
        </Link>
        {locations.map((location) => (
          <Link
            key={location.id}
            to={`/home/hotel/location/${location.id}/${location.city}`}
            className="sidebar-link"
          >
            {location.city}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GetAllLocations;
