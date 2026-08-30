// 
import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

import "./styles/ManageProfessionals.css";

function ManageProfessionals() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    image: "",
  });

  const loadProfessionals = async () => {
    try {
      setLoading(true);

      const response = await api.get("/professionals");

      setProfessionals(response.data);
    } catch (error) {
      console.log("Error loading professionals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfessionals();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProfessional = async (e) => {
    e.preventDefault();

    try {
      await api.post("/professionals", {
        ...form,
      });

      setForm({
        name: "",
        specialization: "",
        experience: "",
        image: "",
      });

      loadProfessionals();
    } catch (error) {
      console.log("Error adding professional:", error);
    }
  };

  const deleteProfessional = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this professional?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/professionals/${id}`);

      loadProfessionals();
    } catch (error) {
      console.log("Error deleting professional:", error);
    }
  };

  const filteredProfessionals = professionals.filter((professional) => {
    const searchValue = search.toLowerCase();

    return (
      professional.name?.toLowerCase().includes(searchValue) ||
      professional.specialization
        ?.toLowerCase()
        .includes(searchValue) ||
      professional.experience
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  return (
    <div className="professionals-layout">
      <AdminSidebar />

      <main className="professionals-page">
        <section className="professionals-hero">
          <div>
            <p className="professionals-small-title">
              ADMIN PANEL
            </p>

            <h1>Manage Professionals</h1>

            <p className="professionals-description">
              Add, view and manage salon professionals, stylists,
              beauticians and makeup artists.
            </p>
          </div>

          <div className="professionals-total-card">
            <div className="total-professional-icon">
              👩‍🎨
            </div>

            <div>
              <span>Total Professionals</span>
              <h2>{professionals.length}</h2>
            </div>
          </div>
        </section>

        <section className="professional-add-section">
          <div className="professional-section-heading">
            <div>
              <h2>Add New Professional</h2>

              <p>
                Enter professional details below.
              </p>
            </div>

            <span className="professional-form-icon">
              ✨
            </span>
          </div>

          <form
            className="professional-form"
            onSubmit={addProfessional}
          >
            <div className="professional-form-group">
              <label>Professional Name</label>

              <input
                type="text"
                name="name"
                placeholder="Example: Priya Sharma"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="professional-form-group">
              <label>Specialization</label>

              <select
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Specialization
                </option>

                <option value="Hair Stylist">
                  Hair Stylist
                </option>

                <option value="Makeup Artist">
                  Makeup Artist
                </option>

                <option value="Skin Specialist">
                  Skin Specialist
                </option>

                <option value="Nail Artist">
                  Nail Artist
                </option>

                <option value="Spa Therapist">
                  Spa Therapist
                </option>

                <option value="Beautician">
                  Beautician
                </option>
              </select>
            </div>

            <div className="professional-form-group">
              <label>Experience</label>

              <input
                type="text"
                name="experience"
                placeholder="Example: 5 Years"
                value={form.experience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="professional-form-group">
              <label>Image URL / Path</label>

              <input
                type="text"
                name="image"
                placeholder="/images/professionals/staff1.jpg"
                value={form.image}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="professional-submit-button"
            >
              <span>＋</span>
              Add Professional
            </button>
          </form>
        </section>

        <section className="professional-toolbar">
          <div className="professional-search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search professionals..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <button
            className="professional-refresh-button"
            onClick={loadProfessionals}
          >
            ↻ Refresh
          </button>
        </section>

        {loading ? (
          <div className="professional-state-box">
            <div className="professional-loader">
              ✨
            </div>

            <h3>Loading professionals...</h3>
          </div>
        ) : filteredProfessionals.length === 0 ? (
          <div className="professional-state-box">
            <div className="professional-empty-icon">
              👩‍💼
            </div>

            <h2>No Professionals Found</h2>

            <p>
              Add a new professional using the form above.
            </p>
          </div>
        ) : (
          <section className="professional-cards-grid">
            {filteredProfessionals.map((professional) => (
              <article
                className="professional-profile-card"
                key={professional.id}
              >
                <div className="professional-image-area">
                  {professional.image ? (
                    <img
                      src={professional.image}
                      alt={professional.name}
                      className="professional-profile-image"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="professional-image-fallback">
                      👩‍🎨
                    </div>
                  )}

                  <span className="professional-status">
                    Active
                  </span>
                </div>

                <div className="professional-profile-content">
                  <div className="professional-name-row">
                    <div>
                      <h3>
                        {professional.name ||
                          "Professional"}
                      </h3>

                      <span className="professional-id">
                        ID: {professional.id}
                      </span>
                    </div>
                  </div>

                  <div className="professional-specialization-badge">
                    ✨{" "}
                    {professional.specialization ||
                      "Beauty Professional"}
                  </div>

                  <div className="professional-details">
                    <div className="professional-detail-item">
                      <div className="professional-detail-icon">
                        💼
                      </div>

                      <div>
                        <span>Experience</span>

                        <strong>
                          {professional.experience ||
                            "Not specified"}
                        </strong>
                      </div>
                    </div>

                    <div className="professional-detail-item">
                      <div className="professional-detail-icon">
                        ⭐
                      </div>

                      <div>
                        <span>Status</span>

                        <strong>
                          Available
                        </strong>
                      </div>
                    </div>
                  </div>

                  <button
                    className="professional-delete-button"
                    onClick={() =>
                      deleteProfessional(
                        professional.id
                      )
                    }
                  >
                    🗑 Delete Professional
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

export default ManageProfessionals;