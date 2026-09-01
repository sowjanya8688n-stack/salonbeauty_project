// 
import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

import "./styles/AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    bookings: 0,
    pending: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const [
          usersResponse,
          servicesResponse,
          bookingsResponse,
        ] = await Promise.all([
          api.get("/users"),
          api.get("/services"),
          api.get("/bookings"),
        ]);

        const bookings = bookingsResponse.data || [];

        const pendingBookings = bookings.filter(
          (booking) =>
            booking.status?.toLowerCase() === "pending"
        );

        setStats({
          users: usersResponse.data?.length || 0,
          services: servicesResponse.data?.length || 0,
          bookings: bookings.length,
          pending: pendingBookings.length,
        });
      } catch (error) {
        console.log(
          "Error loading dashboard data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        {/* TOP HEADER */}

        <div className="admin-dashboard-header">
          <div>
            <p className="admin-welcome-text">
              Welcome Back
            </p>

            <h1>Admin Dashboard</h1>

            <p className="admin-dashboard-subtitle">
              Manage your salon services, users,
              bookings and business activity from
              one place.
            </p>
          </div>

          <div className="admin-profile-box">
            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <span>Salon Beauty</span>
            </div>
          </div>
        </div>

        {/* STATISTICS CARDS */}

        <section className="dashboard-cards">
          <div className="dashboard-card users-card">
            <div className="dashboard-card-top">
              <div className="dashboard-icon">
                👥
              </div>

              <span className="dashboard-badge">
                Users
              </span>
            </div>

            <div className="dashboard-card-content">
              <p>Total Users</p>

              <h2>
                {loading ? "..." : stats.users}
              </h2>

              <span>
                Registered customers
              </span>
            </div>
          </div>

          <div className="dashboard-card services-card">
            <div className="dashboard-card-top">
              <div className="dashboard-icon">
                💇‍♀️
              </div>

              <span className="dashboard-badge">
                Services
              </span>
            </div>

            <div className="dashboard-card-content">
              <p>Total Services</p>

              <h2>
                {loading ? "..." : stats.services}
              </h2>

              <span>
                Available salon services
              </span>
            </div>
          </div>

          <div className="dashboard-card bookings-card">
            <div className="dashboard-card-top">
              <div className="dashboard-icon">
                📅
              </div>

              <span className="dashboard-badge">
                Bookings
              </span>
            </div>

            <div className="dashboard-card-content">
              <p>Total Bookings</p>

              <h2>
                {loading ? "..." : stats.bookings}
              </h2>

              <span>
                Customer appointments
              </span>
            </div>
          </div>

          <div className="dashboard-card pending-card">
            <div className="dashboard-card-top">
              <div className="dashboard-icon">
                ⏳
              </div>

              <span className="dashboard-badge">
                Pending
              </span>
            </div>

            <div className="dashboard-card-content">
              <p>Pending Bookings</p>

              <h2>
                {loading ? "..." : stats.pending}
              </h2>

              <span>
                Waiting for confirmation
              </span>
            </div>
          </div>
        </section>

        {/* LOWER SECTION */}

        <section className="dashboard-bottom-grid">
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <div>
                <h2>Quick Management</h2>

                <p>
                  Access important admin sections
                  quickly.
                </p>
              </div>
            </div>

            <div className="quick-management-grid">
              <a
                href="/admin/services"
                className="quick-item"
              >
                <div className="quick-icon">
                  ✂️
                </div>

                <div>
                  <h3>Manage Services</h3>
                  <p>
                    Add, edit and remove services
                  </p>
                </div>

                <span>→</span>
              </a>

              <a
                href="/admin/bookings"
                className="quick-item"
              >
                <div className="quick-icon">
                  📆
                </div>

                <div>
                  <h3>Manage Bookings</h3>
                  <p>
                    View and update appointments
                  </p>
                </div>

                <span>→</span>
              </a>

              <a
                href="/admin/users"
                className="quick-item"
              >
                <div className="quick-icon">
                  👤
                </div>

                <div>
                  <h3>Manage Users</h3>
                  <p>
                    View registered customers
                  </p>
                </div>

                <span>→</span>
              </a>

              <a
                href="/admin/reports"
                className="quick-item"
              >
                <div className="quick-icon">
                  📊
                </div>

                <div>
                  <h3>Reports</h3>
                  <p>
                    View business performance
                  </p>
                </div>

                <span>→</span>
              </a>
            </div>
          </div>

          <div className="dashboard-overview">
            <h2>Business Overview</h2>

            <p className="overview-description">
              Quick summary of your salon platform.
            </p>

            <div className="overview-item">
              <div>
                <span className="overview-dot"></span>
                Customers
              </div>

              <strong>
                {loading ? "..." : stats.users}
              </strong>
            </div>

            <div className="overview-item">
              <div>
                <span className="overview-dot"></span>
                Services
              </div>

              <strong>
                {loading ? "..." : stats.services}
              </strong>
            </div>

            <div className="overview-item">
              <div>
                <span className="overview-dot"></span>
                Appointments
              </div>

              <strong>
                {loading ? "..." : stats.bookings}
              </strong>
            </div>

            <div className="overview-item">
              <div>
                <span className="overview-dot"></span>
                Pending
              </div>

              <strong>
                {loading ? "..." : stats.pending}
              </strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;