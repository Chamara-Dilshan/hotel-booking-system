import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWifi,
  faSwimmingPool,
  faDumbbell,
  faParking,
  faUtensils,
  faCoffee,
  faSpa,
  faConciergeBell,
  faTv,
  faSnowflake,
  faShieldAlt,
  faSmoking,
  faDog,
  faWheelchair,
  faElevator,
  faBriefcase,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import './GetHotelFacilities.css';

const GetHotelFacilities = () => {
  const { hotelId } = useParams();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping for common facilities
  const getFacilityIcon = (facilityName) => {
    const name = facilityName.toLowerCase();

    if (name.includes('wifi') || name.includes('internet')) return faWifi;
    if (name.includes('pool') || name.includes('swimming')) return faSwimmingPool;
    if (name.includes('gym') || name.includes('fitness')) return faDumbbell;
    if (name.includes('parking')) return faParking;
    if (name.includes('restaurant') || name.includes('dining')) return faUtensils;
    if (name.includes('breakfast') || name.includes('cafe')) return faCoffee;
    if (name.includes('spa') || name.includes('massage')) return faSpa;
    if (name.includes('concierge') || name.includes('reception')) return faConciergeBell;
    if (name.includes('tv') || name.includes('television')) return faTv;
    if (name.includes('air') || name.includes('conditioning') || name.includes('ac')) return faSnowflake;
    if (name.includes('security') || name.includes('safe')) return faShieldAlt;
    if (name.includes('smoking')) return faSmoking;
    if (name.includes('pet') || name.includes('dog')) return faDog;
    if (name.includes('wheelchair') || name.includes('accessible')) return faWheelchair;
    if (name.includes('elevator') || name.includes('lift')) return faElevator;
    if (name.includes('business') || name.includes('meeting')) return faBriefcase;

    return faCheckCircle; // Default icon
  };

  const retrieveAllFacilities = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/facility/hotel?hotelId=${hotelId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching facilities:", error);
      return null;
    }
  };

  useEffect(() => {
    const getAllFacilities = async () => {
      setLoading(true);
      const allFacilities = await retrieveAllFacilities();
      if (allFacilities && allFacilities.facilities) {
        setFacilities(allFacilities.facilities);
      }
      setLoading(false);
    };

    if (hotelId) {
      getAllFacilities();
    }
  }, [hotelId]);

  if (loading) {
    return (
      <div className="facilities-section">
        <div className="facilities-header">
          <FontAwesomeIcon icon={faCheckCircle} />
          Hotel Facilities
        </div>
        <div className="facilities-loading">
          Loading facilities...
        </div>
      </div>
    );
  }

  if (facilities.length === 0) {
    return (
      <div className="facilities-section">
        <div className="facilities-header">
          <FontAwesomeIcon icon={faCheckCircle} />
          Hotel Facilities
        </div>
        <div className="facilities-empty">
          <FontAwesomeIcon icon={faCheckCircle} />
          <p>No facilities information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="facilities-section">
      <div className="facilities-header">
        <FontAwesomeIcon icon={faCheckCircle} />
        Hotel Facilities
      </div>
      <div className="facilities-grid">
        {facilities.map((facility, index) => (
          <div key={index} className="facility-card">
            <div className="facility-icon">
              <FontAwesomeIcon icon={getFacilityIcon(facility.name)} />
            </div>
            <span className="facility-name">{facility.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetHotelFacilities;
