import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchServices } from "../../redux/serviceSlice";
import Hero from "../../components/Hero";

import "./styles/Home.css";

function Home() {
  const dispatch = useDispatch();

  const services = useSelector(
    (state) => state.services.items
  );

  useEffect(() => {
    if (!services.length) {
      dispatch(fetchServices());
    }
  }, [dispatch, services.length]);

  return (
    <>
      <Hero />

      <section className="home-section">
        <p className="section-label">
          WHY CHOOSE US
        </p>

        <h2>
          Everything You Need to Feel Beautiful
        </h2>

        <p className="section-text">
          Professional salon services,
          experienced beauty experts and
          easy online booking.
        </p>
      </section>

      <section className="home-section services-preview">
        <p className="section-label">
          OUR SERVICES
        </p>

        <h2>
          Popular Beauty Services
        </h2>

        <div className="home-services-grid">
          {services.slice(0, 3).map((service) => (
            <div
              className="home-service-card"
              key={service.id}
            >
              <div className="home-service-image-box">
                <img
                  src={service.image}
                  alt={service.name}
                  className="home-service-image"
                />

                <span className="home-service-category">
                  {service.category}
                </span>

                <span className="home-service-duration">
                  {service.duration}
                </span>
              </div>

              <div className="home-service-content">
                <h3>{service.name}</h3>

                <p>
                  {service.description}
                </p>

                <div className="home-service-footer">
                  <div>
                    <small>
                      Starting from
                    </small>

                    <h4>
                      ₹{service.price}
                    </h4>
                  </div>

                  <Link
                    to="/booking"
                    state={{ service }}
                    className="home-book-btn"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/services"
          className="view-services-btn"
        >
          View All Services
        </Link>
      </section>
    </>
  );
}

export default Home;