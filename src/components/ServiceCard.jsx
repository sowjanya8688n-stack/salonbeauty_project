// 
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectService } from "../redux/serviceSlice";

import "./styles/ServiceCard.css";

function ServiceCard({ service }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBook = () => {
    dispatch(selectService(service));
    navigate("/booking");
  };

  return (
    <div className="service-card">

      {/* IMAGE SECTION */}
      <div className="service-image-box">

        <img
          src={service.image}
          alt={service.name}
          className="service-image"
        />

        <div className="service-image-overlay"></div>

        <span className="service-category">
          {service.category}
        </span>

        <span className="service-duration">
          ⏱ {service.duration}
        </span>

        <button
          className="service-favorite-btn"
          type="button"
        >
          ♡
        </button>

      </div>

      {/* CONTENT SECTION */}
      <div className="service-content">

        <div className="service-title-row">
          <h3>
            {service.name}
          </h3>

          <span className="service-rating">
            ⭐ 4.9
          </span>
        </div>

        <p className="service-description">
          {service.description}
        </p>

        <div className="service-divider"></div>

        <div className="service-footer">

          <div className="service-price-box">

            <span>
              Starting from
            </span>

            <strong>
              ₹{service.price}
            </strong>

          </div>

          <button
            className="service-book-btn"
            onClick={handleBook}
          >
            Book Now
            <span>→</span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default ServiceCard;