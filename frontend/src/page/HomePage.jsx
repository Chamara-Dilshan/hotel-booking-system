import Carousel from "./Carousel";
import GetAllLocations from "../LocationComponent/GetAllLocations";
import GetAllFacility from "../FacilityComponent/GetAllFacility";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HotelCard from "../HotelComponent/HotelCard";
import Footer from "./Footer";
import "./HomePage.css";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const { locationId } = useParams();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const url = locationId 
          ? `http://localhost:8080/api/hotel/location?locationId=${locationId}`
          : "http://localhost:8080/api/hotel/fetch";
        
        const response = await axios.get(url);
        if (response.data?.hotels) {
          setHotels(response.data.hotels);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, [locationId]);

  return (
    <div className="homepage">
      {/* ...existing code... */}

      <Carousel />
      
      <main className="main-content">
        <div className="container-xl">
          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">Explore Hotels</h2>
            <p className="section-subtitle">Find your perfect stay from our curated collection</p>
          </div>

          <div className="content-layout">
            {/* Left Sidebar - Locations */}
            <aside className="sidebar sidebar-left">
              <GetAllLocations />
            </aside>

            {/* Main Content - Hotels Grid */}
            <section className="hotels-section">
              {hotels.length > 0 ? (
                <div className="hotels-grid">
                  {hotels.map((hotel) => (
                    <HotelCard key={hotel.id} item={hotel} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
                    <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>
                    <path d="M12 4v6"/>
                    <path d="M2 18h20"/>
                  </svg>
                  <h3>No Hotels Found</h3>
                  <p>Try selecting a different location or check back later.</p>
                </div>
              )}
            </section>

            {/* Right Sidebar - Facilities */}
            <aside className="sidebar sidebar-right">
              <GetAllFacility />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
