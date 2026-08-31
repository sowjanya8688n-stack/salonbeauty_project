// 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchServices } from "../../redux/serviceSlice";

import "./styles/Services.css";

function Services() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================
  // GET DATA FROM REDUX
  // =========================

  const services = useSelector(
    (state) => state.services.items
  );

  const loading = useSelector(
    (state) => state.services.loading
  );

  const error = useSelector(
    (state) => state.services.error
  );

  // =========================
  // STATE
  // =========================

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // =========================
  // LOAD SERVICES
  // =========================

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "All",
    ...new Set(
      services.map((service) => service.category)
    ),
  ];

  // =========================
  // FILTER SERVICES
  // =========================

  const filteredServices = services.filter(
    (service) => {
      const matchesSearch =
        service.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        service.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }
  );

  // =========================
  // BOOK NOW
  // =========================

  const handleBookNow = (service) => {
    navigate("/booking", {
      state: {
        service,
      },
    });
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="services-loading">

        <div className="loading-spinner"></div>

        <h2>Loading Services...</h2>

        <p>
          Please wait while we load our beauty services.
        </p>

      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="services-error">

        <h2>Unable to load services</h2>

        <p>{error}</p>

        <button
          onClick={() => dispatch(fetchServices())}
          className="retry-btn"
        >
          Try Again
        </button>

      </div>
    );
  }

  // =========================
  // MAIN PAGE
  // =========================

  return (
    <section className="services-page">

      <div className="services-container">

        {/* =====================
            HEADING
        ===================== */}

        <div className="services-heading">

          <p className="services-small-title">
            BEAUTY & CARE
          </p>

          <h1>
            Our Beauty Services
          </h1>

          <p className="services-subtitle">
            Discover professional salon and beauty
            services designed to make you look and
            feel your best.
          </p>

        </div>

        {/* =====================
            SEARCH
        ===================== */}

        <div className="services-toolbar">

          <div className="services-search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

        {/* =====================
            CATEGORY BUTTONS
        ===================== */}

        <div className="category-buttons">

          {categories.map((category) => (

            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-btn active-category"
                  : "category-btn"
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>

        {/* =====================
            SERVICES
        ===================== */}

        {filteredServices.length === 0 ? (

          <div className="services-message">

            <h3>
              No services found
            </h3>

            <p>
              Try another service or category.
            </p>

          </div>

        ) : (

          <div className="services-grid">

            {filteredServices.map((service) => (

              <div
                className="service-card"
                key={service.id}
              >

                {/* SERVICE IMAGE */}

                <div className="service-image-wrapper">

                  <img
                    src={service.image}
                    alt={service.name}
                    className="service-image"
                  />

                  <span className="service-category">
                    {service.category}
                  </span>

                  <span className="service-price-badge">
                    ₹{service.price}
                  </span>

                </div>

                {/* SERVICE CONTENT */}

                <div className="service-content">

                  <h3>
                    {service.name}
                  </h3>

                  <p className="service-description">
                    {service.description}
                  </p>

                  {/* DETAILS */}

                  <div className="service-details">

                    <span>
                      ⏱ {service.duration}
                    </span>

                    <span>
                      ⭐ 4.8
                    </span>

                  </div>

                  {/* BOTTOM */}

                  <div className="service-bottom">

                    <div>

                      <small>
                        Starting from
                      </small>

                      <h4>
                        ₹{service.price}
                      </h4>

                    </div>

                    <button
                      className="book-now-btn"
                      onClick={() =>
                        handleBookNow(service)
                      }
                    >
                      Book Now
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default Services;