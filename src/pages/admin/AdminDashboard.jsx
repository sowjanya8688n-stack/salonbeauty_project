// 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [error, setError] = useState("");

  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          usersResponse,
          servicesResponse,
          bookingsResponse,
        ] = await Promise.all([
          api.get("/users"),
          api.get("/services"),
          api.get("/bookings"),
        ]);

        const users = Array.isArray(usersResponse.data)
          ? usersResponse.data
          : [];

        const services = Array.isArray(
          servicesResponse.data
        )
          ? servicesResponse.data
          : [];

        const bookings = Array.isArray(
          bookingsResponse.data
        )
          ? bookingsResponse.data
          : [];

        // Find Pending Bookings
        const pendingBookings = bookings.filter(
          (booking) =>
            String(booking.status || "")
              .trim()
              .toLowerCase() === "pending"
        );

        // Console testing
        console.log("Users:", users);
        console.log("Services:", services);
        console.log("Bookings:", bookings);
        console.log(
          "Pending Bookings:",
          pendingBookings
        );

        setStats({
          users: users.length,
          services: services.length,
          bookings: bookings.length,
          pending: pendingBookings.length,
        });
      } catch (error) {
        console.log(
          "Dashboard loading error:",
          error
        );

        setError(
          "Unable to load dashboard information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="admin-layout">
      {/* ==================================
          SIDEBAR
      ================================== */}

      <AdminSidebar />

      {/* ==================================
          MAIN CONTENT
      ================================== */}

      <main className="admin-content">

        {/* ================================
            HEADER
        ================================= */}

        <section className="admin-dashboard-header">

          <div className="admin-header-left">
            <p className="admin-welcome-text">
              Welcome Back
            </p>

            <h1>Admin Dashboard</h1>

            <p className="admin-dashboard-subtitle">
              Manage salon services, users,
              bookings and business activity from
              one place.
            </p>
          </div>

          <div className="admin-profile-box">

            <div className="admin-avatar">
              A
            </div>

            <div className="admin-profile-info">
              <strong>
                Administrator
              </strong>

              <span>
                Salon Beauty
              </span>
            </div>

          </div>

        </section>

        {/* ================================
            ERROR MESSAGE
        ================================= */}

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        {/* ================================
            STATISTIC CARDS

            These cards are NOT clickable.
        ================================= */}

        <section className="dashboard-cards">

          {/* TOTAL USERS */}

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

              <p>
                Total Users
              </p>

              <h2>
                {loading
                  ? "..."
                  : stats.users}
              </h2>

              <span>
                Registered customers
              </span>

            </div>

          </div>

          {/* TOTAL SERVICES */}

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

              <p>
                Total Services
              </p>

              <h2>
                {loading
                  ? "..."
                  : stats.services}
              </h2>

              <span>
                Available salon services
              </span>

            </div>

          </div>

          {/* TOTAL BOOKINGS */}

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

              <p>
                Total Bookings
              </p>

              <h2>
                {loading
                  ? "..."
                  : stats.bookings}
              </h2>

              <span>
                Customer appointments
              </span>

            </div>

          </div>

          {/* PENDING BOOKINGS */}

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

              <p>
                Pending Bookings
              </p>

              <h2>
                {loading
                  ? "..."
                  : stats.pending}
              </h2>

              <span>
                Waiting for confirmation
              </span>

            </div>

          </div>

        </section>

        {/* ================================
            LOWER SECTION
        ================================= */}

        <section className="dashboard-bottom-grid">

          {/* ==============================
              QUICK MANAGEMENT
          =============================== */}

          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <h2>
                Quick Management
              </h2>

              <p>
                Open important admin sections
                quickly.
              </p>

            </div>

            <div className="quick-management-grid">

              {/* MANAGE SERVICES */}

              <Link
                to="/admin/services"
                className="quick-item"
              >

                <div className="quick-icon">
                  ✂️
                </div>

                <div className="quick-text">

                  <h3>
                    Manage Services
                  </h3>

                  <p>
                    Add, update and delete services
                  </p>

                </div>

                <span className="quick-arrow">
                  →
                </span>

              </Link>

              {/* MANAGE BOOKINGS */}

              <Link
                to="/admin/bookings"
                className="quick-item"
              >

                <div className="quick-icon">
                  📆
                </div>

                <div className="quick-text">

                  <h3>
                    Manage Bookings
                  </h3>

                  <p>
                    View and update appointments
                  </p>

                </div>

                <span className="quick-arrow">
                  →
                </span>

              </Link>

              {/* MANAGE USERS */}

              <Link
                to="/admin/users"
                className="quick-item"
              >

                <div className="quick-icon">
                  👤
                </div>

                <div className="quick-text">

                  <h3>
                    Manage Users
                  </h3>

                  <p>
                    View registered customers
                  </p>

                </div>

                <span className="quick-arrow">
                  →
                </span>

              </Link>

              {/* REPORTS */}

              <Link
                to="/admin/reports"
                className="quick-item"
              >

                <div className="quick-icon">
                  📊
                </div>

                <div className="quick-text">

                  <h3>
                    Reports
                  </h3>

                  <p>
                    View business performance
                  </p>

                </div>

                <span className="quick-arrow">
                  →
                </span>

              </Link>

            </div>

          </div>

          {/* ==============================
              BUSINESS OVERVIEW
          =============================== */}

          <div className="dashboard-overview">

            <h2>
              Business Overview
            </h2>

            <p className="overview-description">
              Quick summary of your salon platform.
            </p>

            {/* USERS */}

            <div className="overview-item">

              <div>
                <span className="overview-dot"></span>

                Customers
              </div>

              <strong>
                {loading
                  ? "..."
                  : stats.users}
              </strong>

            </div>

            {/* SERVICES */}

            <div className="overview-item">

              <div>
                <span className="overview-dot"></span>

                Services
              </div>

              <strong>
                {loading
                  ? "..."
                  : stats.services}
              </strong>

            </div>

            {/* BOOKINGS */}

            <div className="overview-item">

              <div>
                <span className="overview-dot"></span>

                Appointments
              </div>

              <strong>
                {loading
                  ? "..."
                  : stats.bookings}
              </strong>

            </div>

            {/* PENDING */}

            <div className="overview-item">

              <div>
                <span className="overview-dot"></span>

                Pending
              </div>

              <strong>
                {loading
                  ? "..."
                  : stats.pending}
              </strong>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;