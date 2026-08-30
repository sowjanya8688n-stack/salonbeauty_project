// 
import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

// import "./styles/AdminPages.css";

function ManageServices() {
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    image: "",
    description: "",
  });

  const loadServices = async () => {
    try {
      const response = await api.get("/services");

      setServices(response.data);
    } catch (error) {
      console.log("Error loading services:", error);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/services", {
        ...formData,
        price: Number(formData.price),
      });

      setFormData({
        name: "",
        category: "",
        price: "",
        duration: "",
        image: "",
        description: "",
      });

      loadServices();
    } catch (error) {
      console.log("Error adding service:", error);
    }
  };

  const deleteService = async (id) => {
    try {
      await api.delete(`/services/${id}`);

      loadServices();
    } catch (error) {
      console.log("Error deleting service:", error);
    }
  };

  return (
    <>
      <AdminSidebar />

      <main className="admin-page">
        <div className="admin-page-header">
          <div>
            <h1>Manage Services</h1>

            <p>
              Add and manage salon and beauty services.
            </p>
          </div>
        </div>

        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Category
            </option>

            <option value="Hair">
              Hair
            </option>

            <option value="Skin">
              Skin
            </option>

            <option value="Makeup">
              Makeup
            </option>

            <option value="Nails">
              Nails
            </option>

            <option value="Spa">
              Spa
            </option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration - Example: 45 mins"
            value={formData.duration}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image path - Example: /images/services/haircut.jpg"
            value={formData.image}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Service Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            + Add Service
          </button>
        </form>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Service</th>
                <th>Category</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="empty-data"
                  >
                    No services found.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id}>
                    <td>
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.name}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td>
                      {service.name}
                    </td>

                    <td>
                      {service.category}
                    </td>

                    <td>
                      ₹{service.price}
                    </td>

                    <td>
                      {service.duration}
                    </td>

                    <td>
                      {service.description}
                    </td>

                    <td>
                      <button
                        className="admin-delete-btn"
                        onClick={() =>
                          deleteService(
                            service.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default ManageServices;