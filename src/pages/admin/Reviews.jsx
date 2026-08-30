// 
import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

import "./styles/Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");

  const loadReviews = async () => {
    try {
      setLoading(true);

      const response = await api.get("/reviews");

      setReviews(response.data);
    } catch (error) {
      console.log("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const deleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/reviews/${id}`);

      loadReviews();
    } catch (error) {
      console.log("Error deleting review:", error);
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const searchValue = search.trim().toLowerCase();

    const matchesSearch =
      review.userName?.toLowerCase().includes(searchValue) ||
      review.name?.toLowerCase().includes(searchValue) ||
      review.serviceName?.toLowerCase().includes(searchValue) ||
      review.comment?.toLowerCase().includes(searchValue);

    const matchesRating =
      ratingFilter === "All" ||
      Number(review.rating) === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  const averageRating =
    reviews.length === 0
      ? 0
      : reviews.reduce(
          (total, review) =>
            total + Number(review.rating || 0),
          0
        ) / reviews.length;

  const fiveStarReviews = reviews.filter(
    (review) => Number(review.rating) === 5
  ).length;

  const positiveReviews = reviews.filter(
    (review) => Number(review.rating) >= 4
  ).length;

  const lowRatingReviews = reviews.filter(
    (review) => Number(review.rating) <= 2
  ).length;

  const renderStars = (rating) => {
    const value = Math.max(
      0,
      Math.min(5, Number(rating || 0))
    );

    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={
          index < value
            ? "review-star-filled"
            : "review-star-empty"
        }
      >
        ★
      </span>
    ));
  };

  return (
    <div className="reviews-layout">
      <AdminSidebar />

      <main className="reviews-page">
        <section className="reviews-header">
          <div className="reviews-header-content">
            <span className="reviews-admin-tag">
              ADMIN PANEL
            </span>

            <h1>Customer Reviews</h1>

            <p>
              Monitor customer feedback, service ratings and
              overall salon experience.
            </p>
          </div>

          <div className="reviews-average-card">
            <div className="reviews-average-icon">
              ⭐
            </div>

            <div>
              <span>Average Rating</span>

              <h2>
                {averageRating.toFixed(1)}
                <small>/5</small>
              </h2>

              <div className="reviews-average-stars">
                {renderStars(
                  Math.round(averageRating)
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="reviews-stats-grid">
          <div className="reviews-stat-card">
            <div className="reviews-stat-icon reviews-stat-purple">
              💬
            </div>

            <div>
              <span>Total Reviews</span>
              <h3>{reviews.length}</h3>
              <p>Customer feedback</p>
            </div>
          </div>

          <div className="reviews-stat-card">
            <div className="reviews-stat-icon reviews-stat-yellow">
              ⭐
            </div>

            <div>
              <span>5 Star Reviews</span>
              <h3>{fiveStarReviews}</h3>
              <p>Excellent ratings</p>
            </div>
          </div>

          <div className="reviews-stat-card">
            <div className="reviews-stat-icon reviews-stat-green">
              😊
            </div>

            <div>
              <span>Positive Reviews</span>
              <h3>{positiveReviews}</h3>
              <p>4 stars and above</p>
            </div>
          </div>

          <div className="reviews-stat-card">
            <div className="reviews-stat-icon reviews-stat-red">
              ⚠️
            </div>

            <div>
              <span>Low Ratings</span>
              <h3>{lowRatingReviews}</h3>
              <p>2 stars and below</p>
            </div>
          </div>
        </section>

        <section className="reviews-toolbar">
          <div className="reviews-search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search customer, service or review..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <select
            className="reviews-filter-select"
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(e.target.value)
            }
          >
            <option value="All">
              All Ratings
            </option>

            <option value="5">
              ⭐ 5 Stars
            </option>

            <option value="4">
              ⭐ 4 Stars
            </option>

            <option value="3">
              ⭐ 3 Stars
            </option>

            <option value="2">
              ⭐ 2 Stars
            </option>

            <option value="1">
              ⭐ 1 Star
            </option>
          </select>

          <button
            className="reviews-refresh-btn"
            onClick={loadReviews}
          >
            ↻ Refresh
          </button>
        </section>

        {loading ? (
          <div className="reviews-state-box">
            <div className="reviews-state-icon">
              ✨
            </div>

            <h2>Loading Reviews</h2>

            <p>
              Please wait while customer reviews are being
              loaded.
            </p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="reviews-state-box">
            <div className="reviews-state-icon">
              💬
            </div>

            <h2>No Reviews Found</h2>

            <p>
              No reviews match your current search or rating
              filter.
            </p>
          </div>
        ) : (
          <section className="reviews-grid">
            {filteredReviews.map((review) => (
              <article
                className="reviews-card"
                key={review.id}
              >
                <div className="reviews-card-top">
                  <div className="reviews-user">
                    <div className="reviews-user-avatar">
                      {(
                        review.userName ||
                        review.name ||
                        "C"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h3>
                        {review.userName ||
                          review.name ||
                          "Customer"}
                      </h3>

                      <span className="reviews-verified">
                        ✓ Verified Customer
                      </span>
                    </div>
                  </div>

                  <span className="reviews-rating-badge">
                    ⭐ {review.rating || 0}/5
                  </span>
                </div>

                <div className="reviews-stars">
                  {renderStars(review.rating)}
                </div>

                <div className="reviews-service-box">
                  <div className="reviews-service-icon">
                    ✂️
                  </div>

                  <div>
                    <small>
                      SERVICE
                    </small>

                    <strong>
                      {review.serviceName ||
                        "Salon Service"}
                    </strong>
                  </div>
                </div>

                <div className="reviews-comment-box">
                  <span className="reviews-quote">
                    “
                  </span>

                  <p>
                    {review.comment ||
                      "No written feedback provided."}
                  </p>
                </div>

                <div className="reviews-card-footer">
                  <div>
                    <span className="reviews-review-id">
                      Review #{review.id}
                    </span>
                  </div>

                  <button
                    className="reviews-delete-btn"
                    onClick={() =>
                      deleteReview(review.id)
                    }
                  >
                    🗑 Delete
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default Reviews;