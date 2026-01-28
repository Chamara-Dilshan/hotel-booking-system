import { useEffect, useState } from "react";
import axios from "axios";

const GetAllFacility = () => {
  const [facilities, setFacilities] = useState([]);

  const retrieveAllFacilities = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/facility/fetch"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllFacilities = async () => {
      const allFacilities = await retrieveAllFacilities();
      if (allFacilities) {
        setFacilities(allFacilities.facilities);
      }
    };

    getAllFacilities();
  }, []);

  return (
    <div className="sidebar-card">
      <h6 className="sidebar-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        Amenities
      </h6>
      <div className="sidebar-list">
        {facilities.map((facility) => (
          <span key={facility.id} className="sidebar-tag">
            {facility.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GetAllFacility;
