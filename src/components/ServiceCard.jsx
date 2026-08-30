import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectService
} from "../redux/serviceSlice";

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

      <div className="service-image-box">

        <img
          src={service.image}
          alt={service.name}
          className="service-image"
        />

        <span className="service-category">
          {service.category}
        </span>

        <span className="service-duration">
          {service.duration}
        </span>

      </div>

      <div className="service-content">

        <h3>
          {service.name}
        </h3>

        <p className="service-description">
          {service.description}
        </p>

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
          </button>

        </div>

      </div>

    </div>
  );
}

export default ServiceCard;