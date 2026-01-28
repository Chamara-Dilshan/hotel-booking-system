import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span className="logo-accent">Hotel Booking</span>
            </h3>
            <p className="footer-tagline">
              Discover your perfect stay. We connect travelers with exceptional hotels 
              across Sri Lanka for unforgettable experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-list">
              <li><Link to="/home">Browse Hotels</Link></li>
              <li><Link to="/TripPlanner">Trip Planner</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-links">
            <h4 className="footer-heading">Account</h4>
            <ul className="footer-list">
              <li><Link to="/user/customer/register">Create Account</Link></li>
              <li><Link to="/user/login">Sign In</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-list">
              <li>
                <span className="contact-icon">✉</span>
                chamaradilshan.dev@gmail.com
              </li>
              <li>
                <span className="contact-icon">☎</span>
                +94 00 000 0000
              </li>
              <li>
                <span className="contact-icon">📍</span>
                Colombo, Sri Lanka
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Hotel Booking. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
