import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/Wishlist.css";

function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);

  // =========================
  // LOAD WISHLIST
  // =========================

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  // =========================
  // REMOVE ITEM
  // =========================

  const removeFromWishlist = (serviceId) => {
    const updatedWishlist = wishlist.filter(
      (service) => service.id !== serviceId
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  // =========================
  // CLEAR ALL
  // =========================

  const clearWishlist = () => {
    if (wishlist.length === 0) {
      return;
    }

    const confirmClear = window.confirm(
      "Are you sure you want to clear your wishlist?"
    );

    if (!confirmClear) {
      return;
    }

    setWishlist([]);

    localStorage.removeItem("wishlist");
  };

  // =========================
  // BOOK SERVICE
  // =========================

  const handleBookNow = (service) => {
    navigate("/booking", {
      state: {
        service,
      },
    });
  };

  // =========================
  // BACK TO SERVICES
  // =========================

  const exploreServices = () => {
    navigate("/services");
  };

  return (
    <section className="wishlist-page">

      <div className="wishlist-container">

        {/* =========================
            HEADER
        ========================= */}

        <div className="wishlist-header">

          <div>
            <p className="wishlist-small-title">
              YOUR FAVOURITES
            </p>

            <h1>
              My Wishlist
            </h1>

            <p className="wishlist-subtitle">
              Save your favourite salon and beauty
              services and book them whenever you are ready.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              type="button"
              className="clear-wishlist-btn"
              onClick={clearWishlist}
            >
              Clear Wishlist
            </button>
          )}

        </div>

        {/* =========================
            COUNT
        ========================= */}

        {wishlist.length > 0 && (
          <div className="wishlist-summary">

            <span className="wishlist-summary-icon">
              ♥
            </span>

            <div>
              <strong>
                {wishlist.length}
              </strong>

              <span>
                {wishlist.length === 1
                  ? " service saved"
                  : " services saved"}
              </span>
            </div>

          </div>
        )}

        {/* =========================
            EMPTY WISHLIST
        ========================= */}

        {wishlist.length === 0 ? (

          <div className="wishlist-empty">

            <div className="wishlist-empty-icon">
              ♡
            </div>

            <h2>
              Your wishlist is empty
            </h2>

            <p>
              You haven't saved any beauty services yet.
              Explore our services and add your favourites.
            </p>

            <button
              type="button"
              className="explore-services-btn"
              onClick={exploreServices}
            >
              Explore Services
            </button>

          </div>

        ) : (

          /* =========================
             WISHLIST CARDS
          ========================= */

          <div className="wishlist-grid">

            {wishlist.map((service) => (

              <div
                className="wishlist-card"
                key={service.id}
              >

                {/* IMAGE */}

                <div className="wishlist-image-wrapper">

                  <img
                    src={service.image}
                    alt={service.name}
                    className="wishlist-image"
                  />

                  <span className="wishlist-category">
                    {service.category}
                  </span>

                  <button
                    type="button"
                    className="wishlist-heart-btn"
                    onClick={() =>
                      removeFromWishlist(service.id)
                    }
                    title="Remove from wishlist"
                  >
                    ♥
                  </button>

                </div>

                {/* CONTENT */}

                <div className="wishlist-card-content">

                  <h3>
                    {service.name}
                  </h3>

                  <p className="wishlist-description">
                    {service.description ||
                      "Professional salon and beauty service designed for your care and comfort."}
                  </p>

                  {/* DETAILS */}

                  <div className="wishlist-details">

                    <span>
                      ⏱ {service.duration}
                    </span>

                    <span>
                      ⭐ 4.8
                    </span>

                  </div>

                  {/* PRICE */}

                  <div className="wishlist-price">

                    <div>
                      <small>
                        Starting from
                      </small>

                      <h4>
                        ₹{service.price}
                      </h4>
                    </div>

                  </div>

                  {/* BUTTONS */}

                  <div className="wishlist-actions">

                    <button
                      type="button"
                      className="remove-wishlist-btn"
                      onClick={() =>
                        removeFromWishlist(service.id)
                      }
                    >
                      Remove
                    </button>

                    <button
                      type="button"
                      className="wishlist-book-btn"
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

export default Wishlist;