import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import RoleNav from "./RoleNav";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <header className={`modern-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Brand */}
          <Link to="/" className="navbar-brand">
            <svg className="brand-logo" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.2"/>
              <path d="M10 28V12H14V16H18V12H22V16H26V12H30V28H26V20H22V28H18V20H14V28H10Z" fill="white"/>
              <circle cx="20" cy="8" r="2" fill="#ffd89b"/>
            </svg>
            <span className="brand-text">HotelHub</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Items */}
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/home" className={isActive("/home")}>
                  Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/TripPlanner" className={isActive("/TripPlanner")}>
                  Trip Planner
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className={isActive("/contact")}>
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Auth/Role Navigation */}
            <RoleNav />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
