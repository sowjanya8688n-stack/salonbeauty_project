// 
import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

import "./styles/ManageOffers.css";

function ManageOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    discount: "",
    code: "",
    expiry: "",
  });

  const loadOffers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/offers");

      setOffers(response.data);
    } catch (error) {
      console.log("Error loading offers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addOffer = async (e) => {
    e.preventDefault();

    try {
      await api.post("/offers", {
        ...form,
        discount: Number(form.discount),
      });

      setForm({
        title: "",
        discount: "",
        code: "",
        expiry: "",
      });

      loadOffers();
    } catch (error) {
      console.log("Error adding offer:", error);
    }
  };

  const deleteOffer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this offer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/offers/${id}`);

      loadOffers();
    } catch (error) {
      console.log("Error deleting offer:", error);
    }
  };

  const filteredOffers = offers.filter((offer) => {
    const value = search.toLowerCase();

    return (
      offer.title?.toLowerCase().includes(value) ||
      offer.code?.toLowerCase().includes(value)
    );
  });

  const getOfferStatus = (expiry) => {
    if (!expiry) {
      return "No Expiry";
    }

    const today = new Date();
    const expiryDate = new Date(expiry);

    return expiryDate >= today ? "Active" : "Expired";
  };

  return (
    <div className="offers-layout">
      <AdminSidebar />

      <main className="offers-page">

        <section className="offers-header">
          <div>
            <p className="offers-label">
              ADMIN PANEL
            </p>

            <h1>Manage Offers</h1>

            <p className="offers-subtitle">
              Create and manage attractive promotional offers,
              discount codes and special salon deals.
            </p>
          </div>

          <div className="offers-count-card">
            <div className="offers-count-icon">
              🎁
            </div>

            <div>
              <p>Total Offers</p>
              <h2>{offers.length}</h2>
            </div>
          </div>
        </section>

        <section className="offer-form-card">

          <div className="offer-form-heading">
            <div>
              <h2>Create New Offer</h2>

              <p>
                Enter promotion details below.
              </p>
            </div>

            <span>
              ✨
            </span>
          </div>

          <form
            className="offer-form"
            onSubmit={addOffer}
          >

            <div className="offer-input-group">
              <label>
                Offer Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Example: Bridal Beauty Offer"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="offer-input-group">
              <label>
                Discount %
              </label>

              <input
                type="number"
                name="discount"
                min="1"
                max="100"
                placeholder="Example: 25"
                value={form.discount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="offer-input-group">
              <label>
                Offer Code
              </label>

              <input
                type="text"
                name="code"
                placeholder="Example: BEAUTY25"
                value={form.code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="offer-input-group">
              <label>
                Expiry Date
              </label>

              <input
                type="date"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="offer-add-button"
            >
              + Add Offer
            </button>

          </form>

        </section>

        <section className="offers-toolbar">

          <div className="offers-search-box">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search offer title or code..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <button
            className="offers-refresh-button"
            onClick={loadOffers}
          >
            ↻ Refresh
          </button>

        </section>

        {loading ? (
          <div className="offers-state">
            Loading offers...
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="offers-state">

            <div className="offers-empty-icon">
              🎁
            </div>

            <h2>No Offers Found</h2>

            <p>
              Add your first promotional offer using the form above.
            </p>

          </div>
        ) : (
          <section className="offers-grid">

            {filteredOffers.map((offer) => {

              const status =
                getOfferStatus(offer.expiry);

              return (
                <article
                  className="offer-card"
                  key={offer.id}
                >

                  <div className="offer-card-top">

                    <div className="offer-icon">
                      🎁
                    </div>

                    <span
                      className={
                        status === "Active"
                          ? "offer-status active-offer"
                          : status === "Expired"
                          ? "offer-status expired-offer"
                          : "offer-status no-expiry"
                      }
                    >
                      {status}
                    </span>

                  </div>

                  <div className="offer-card-content">

                    <h3>
                      {offer.title}
                    </h3>

                    <div className="offer-discount">
                      {offer.discount}% OFF
                    </div>

                    <div className="offer-details">

                      <div>
                        <span>
                          Promo Code
                        </span>

                        <strong className="offer-code">
                          {offer.code || "N/A"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Expiry Date
                        </span>

                        <strong>
                          {offer.expiry ||
                            "No Expiry"}
                        </strong>
                      </div>

                    </div>

                    <button
                      className="offer-delete-button"
                      onClick={() =>
                        deleteOffer(offer.id)
                      }
                    >
                      🗑 Delete Offer
                    </button>

                  </div>

                </article>
              );
            })}

          </section>
        )}

      </main>
    </div>
  );
}

export default ManageOffers;