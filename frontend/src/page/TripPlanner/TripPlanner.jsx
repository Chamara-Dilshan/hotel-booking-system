import React, { useState } from 'react';
import Footer from '../Footer';
import { categories, tripPlannerData } from '../../data/tripPlannerData';
import './tripPlanner.css';

const TripPlanner = () => {
  const [activeTab, setActiveTab] = useState('cultural');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeCategory = categories.find(cat => cat.id === activeTab);
  const activeItems = tripPlannerData[activeTab] || [];

  const getCategoryIcon = (iconType) => {
    switch (iconType) {
      case 'cultural':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
      case 'religious':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        );
      case 'historical':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21h18" />
            <path d="M5 21V7l8-4v18" />
            <path d="M19 21V11l-6-4" />
            <path d="M9 9v.01" />
            <path d="M9 12v.01" />
            <path d="M9 15v.01" />
            <path d="M9 18v.01" />
          </svg>
        );
      case 'waterfalls':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v6" />
            <path d="M12 22v-6" />
            <path d="M4.93 4.93l4.24 4.24" />
            <path d="M14.83 14.83l4.24 4.24" />
            <path d="M2 12h6" />
            <path d="M16 12h6" />
            <path d="M4.93 19.07l4.24-4.24" />
            <path d="M14.83 9.17l4.24-4.24" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="trip-planner-page">
      {/* Hero Section */}
      <div className="trip-planner-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Explore Sri Lanka</h1>
            <p>Discover the rich culture, sacred traditions, ancient history, and natural wonders of the Pearl of the Indian Ocean</p>
          </div>
        </div>
      </div>

      <div className="trip-planner-container">
        {/* Tab Navigation - Desktop */}
        <div className="tabs-container">
          <div className="tabs-wrapper">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`tab-btn ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <span className="tab-icon">{getCategoryIcon(category.icon)}</span>
                <span className="tab-text">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className="mobile-dropdown">
          <button
            className="dropdown-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="dropdown-icon">{getCategoryIcon(activeCategory?.icon)}</span>
            <span>{activeCategory?.name}</span>
            <svg
              className={`chevron ${mobileMenuOpen ? 'open' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {mobileMenuOpen && (
            <div className="dropdown-menu">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`dropdown-item ${activeTab === category.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(category.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="dropdown-item-icon">{getCategoryIcon(category.icon)}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Section Header */}
        <div className="section-header">
          <h2>{activeCategory?.name}</h2>
          <p>
            {activeTab === 'cultural' && 'Experience the vibrant cultural celebrations of Sri Lanka'}
            {activeTab === 'religious' && 'Discover sacred festivals and spiritual traditions'}
            {activeTab === 'historical' && 'Journey through ancient kingdoms and colonial heritage'}
            {activeTab === 'waterfalls' && 'Marvel at breathtaking cascades across the island'}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="cards-grid">
          {activeItems.map((item) => (
            <div key={item.id} className="trip-card">
              <div className="card-image-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x250?text=Sri+Lanka';
                  }}
                />
                <div className="card-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {item.date}
                </div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>

                <div className="card-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {item.location}
                </div>

                <p className="card-description">{item.description}</p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-content">
            <h3>Plan Your Perfect Sri Lankan Adventure</h3>
            <p>Find the best hotels near these amazing destinations and create unforgettable memories.</p>
            <a href="/" className="cta-btn">
              Browse Hotels
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TripPlanner;
