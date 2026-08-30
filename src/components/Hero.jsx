import { Link } from "react-router-dom";

import "./styles/Hero.css";

function Hero() {

  return (
    <section className="hero">

      <div className="hero-content">

        <p className="eyebrow">
          WELCOME TO SALONBEAUTY
        </p>

        <h1>
          Look Beautiful.
          <br />
          Feel Beautiful.
        </h1>

        <p className="hero-text">
          Discover professional salon and beauty
          services and book your appointment easily
          from anywhere.
        </p>

        <div className="hero-actions">

          <Link
            to="/services"
            className="btn"
          >
            Explore Services
          </Link>

          <Link
            to="/booking"
            className="outline-btn"
          >
            Book Appointment
          </Link>

        </div>

      </div>

      <div className="hero-image">

        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1100&q=80"
          alt="Salon"
        />

      </div>

    </section>
  );
}

export default Hero;