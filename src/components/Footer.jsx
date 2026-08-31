// 
import { Link } from "react-router-dom";
import "./styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* Main Footer */}
      <div className="footer-container">

        {/* About */}
        <div className="footer-section footer-about">

          <h2 className="footer-logo">
            Salon<span>Beauty</span>
          </h2>

          <p>
            Your beauty, our passion. Discover professional
            salon and beauty services designed to make you
            look and feel your best.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              f
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              ◎
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
            >
              ▶
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              in
            </a>
          </div>

        </div>

        {/* Quick Links */}
        <div className="footer-section">

          <h3>Quick Links</h3>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/services">Services</Link>
            </li>

            <li>
              <Link to="/bookings">My Bookings</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>

        </div>

        {/* Services */}
        <div className="footer-section">

          <h3>Our Services</h3>

          <ul>
            <li>
              <Link to="/services">Hair Styling</Link>
            </li>

            <li>
              <Link to="/services">Hair Spa</Link>
            </li>

            <li>
              <Link to="/services">Facial & Skin Care</Link>
            </li>

            <li>
              <Link to="/services">Makeup</Link>
            </li>

            <li>
              <Link to="/services">Manicure & Pedicure</Link>
            </li>
          </ul>

        </div>

        {/* Contact */}
        <div className="footer-section footer-contact">

          <h3>Contact Us</h3>

          <p>
            📍 Hyderabad, Telangana
          </p>

          <p>
            📞 +91 98765 43210
          </p>

          <p>
            ✉️ salonbeauty@gmail.com
          </p>

          <p>
            🕐 Mon - Sun: 9:00 AM - 9:00 PM
          </p>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">

        <p>
          © 2026 <strong>SalonBeauty</strong>.
          All Rights Reserved.
        </p>

        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>

          <span>|</span>

          <Link to="/terms">Terms & Conditions</Link>
        </div>

      </div>

    </footer>
  );
}

export default Footer;
