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
  // REDUX DATA
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

  const [wishlist, setWishlist] = useState([]);

  // =========================
  // LOAD SERVICES
  // =========================

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // =========================
  // LOAD WISHLIST
  // =========================

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

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
      const serviceName =
        service.name?.toLowerCase() || "";

      const serviceCategory =
        service.category?.toLowerCase() || "";

      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        serviceName.includes(searchValue) ||
        serviceCategory.includes(searchValue);

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
  // CHECK WISHLIST
  // =========================

  const isWishlisted = (serviceId) => {
    return wishlist.some(
      (item) => item.id === serviceId
    );
  };

  // =========================
  // ADD / REMOVE WISHLIST
  // =========================

  const toggleWishlist = (service) => {
    const alreadyAdded = wishlist.some(
      (item) => item.id === service.id
    );

    let updatedWishlist;

    if (alreadyAdded) {
      updatedWishlist = wishlist.filter(
        (item) => item.id !== service.id
      );
    } else {
      updatedWishlist = [
        ...wishlist,
        service,
      ];
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  // =========================
  // OPEN WISHLIST
  // =========================

  const openWishlist = () => {
    navigate("/wishlist");
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
          Please wait while we load our beauty
          services.
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
        <h2>
          Unable to load services
        </h2>

        <p>{error}</p>

        <button
          onClick={() =>
            dispatch(fetchServices())
          }
          className="retry-btn"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="services-page">
      <div className="services-container">

        {/* HEADER */}

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

        {/* SEARCH + WISHLIST */}

        <div className="services-toolbar">

          <div className="services-search-box">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <button
            className="view-wishlist-btn"
            onClick={openWishlist}
          >
            ❤️ My Wishlist

            <span className="wishlist-count">
              {wishlist.length}
            </span>
          </button>

        </div>

        {/* CATEGORY BUTTONS */}

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

        {/* SERVICES */}

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

            {filteredServices.map(
              (service) => (

                <div
                  className="service-card"
                  key={service.id}
                >

                  {/* IMAGE */}

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

                    {/* HEART BUTTON */}

                    <button
                      type="button"
                      className={
                        isWishlisted(service.id)
                          ? "heart-btn heart-active"
                          : "heart-btn"
                      }
                      onClick={(e) => {
                        e.stopPropagation();

                        toggleWishlist(
                          service
                        );
                      }}
                      title={
                        isWishlisted(service.id)
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      {isWishlisted(service.id)
                        ? "♥"
                        : "♡"}
                    </button>

                  </div>

                  {/* CONTENT */}

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

                    {/* PRICE */}

                    <div className="service-price-section">

                      <small>
                        Starting from
                      </small>

                      <h4>
                        ₹{service.price}
                      </h4>

                    </div>

                    {/* BUTTONS */}

                    <div className="service-actions">

                      <button
                        type="button"
                        className={
                          isWishlisted(service.id)
                            ? "wishlist-btn wishlist-added"
                            : "wishlist-btn"
                        }
                        onClick={(e) => {
                          e.stopPropagation();

                          toggleWishlist(
                            service
                          );
                        }}
                      >
                        {isWishlisted(service.id)
                          ? "♥ Wishlisted"
                          : "♡ Wishlist"}
                      </button>

                      <button
                        type="button"
                        className="book-now-btn"
                        onClick={() =>
                          handleBookNow(
                            service
                          )
                        }
                      >
                        Book Now
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>
    </section>
  );
}

export default Services;