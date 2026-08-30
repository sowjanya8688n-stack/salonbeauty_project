// 
import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

import "./styles/ManageBookings.css";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const response = await api.get("/bookings");

      setBookings(response.data);
    } catch (error) {
      console.log("Error loading bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}`, {
        status,
      });

      loadBookings();
    } catch (error) {
      console.log("Error updating booking:", error);
    }
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/bookings/${id}`);

      loadBookings();
    } catch (error) {
      console.log("Error deleting booking:", error);
    }
  };

  const getStatusClass = (status) => {
    const value = status || "Pending";

    if (value === "Confirmed") {
      return "status-confirmed";
    }

    if (value === "Completed") {
      return "status-completed";
    }

    if (value === "Cancelled") {
      return "status-cancelled";
    }

    return "status-pending";
  };

  return (
    <div className="manage-bookings-layout">
      <AdminSidebar />

      <main className="manage-bookings-page">

        <div className="manage-bookings-header">

          <div>
            <p className="manage-bookings-label">
              ADMIN PANEL
            </p>

            <h1>Manage Bookings</h1>

            <p className="manage-bookings-subtitle">
              View, update and manage customer salon appointments.
            </p>
          </div>

          <div className="booking-count-card">
            <span>📅</span>

            <div>
              <p>Total Bookings</p>
              <h2>{bookings.length}</h2>
            </div>
          </div>

        </div>

        {loading ? (
          <div className="bookings-loading">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="bookings-empty">
            <div className="empty-icon">
              📅
            </div>

            <h2>No Bookings Found</h2>

            <p>
              Customer appointments will appear here.
            </p>
          </div>
        ) : (
          <div className="bookings-table-wrapper">

            <table className="bookings-table">

              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>

                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">
                          {(booking.customerName ||
                            booking.name ||
                            "C")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {booking.customerName ||
                              booking.name ||
                              "Customer"}
                          </strong>

                          <span>
                            {booking.email ||
                              "Salon customer"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="booking-service">
                        {booking.service ||
                          booking.serviceName ||
                          "Salon Service"}
                      </span>
                    </td>

                    <td>
                      {booking.date || "-"}
                    </td>

                    <td>
                      {booking.time || "-"}
                    </td>

                    <td>
                      <select
                        className={`booking-status-select ${getStatusClass(
                          booking.status
                        )}`}
                        value={
                          booking.status ||
                          "Pending"
                        }
                        onChange={(e) =>
                          updateStatus(
                            booking.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Confirmed">
                          Confirmed
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="booking-delete-btn"
                        onClick={() =>
                          deleteBooking(
                            booking.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </main>
    </div>
  );
}

export default ManageBookings;