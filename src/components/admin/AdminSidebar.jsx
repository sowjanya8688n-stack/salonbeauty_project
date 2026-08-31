import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
// import "./styles/AdminDashboard.css";
// import "./styles/ManageBookings.css";
// import "./styles/ManageCategories.css";
// import "./styles/ManageOffers.css";
// import "./styles/ManagePayments.css";

// import "./styles/ManageProfessionals.css";
// import "./styles/ManageReviews.css";
// import "./styles/ManageServices.css";
// import "./styles/ManageUsers.css";
// import "./styles/Reports.css";




function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">🌸</div>

        <div>
          <h2>BeautySalon</h2>
          <p>ADMIN PANEL</p>
        </div>
      </div>

      <div className="sidebar-line"></div>

      <nav className="sidebar-menu">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span>▦</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/services"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span>✂️</span>
          Manage Services
        </NavLink>

        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span>📅</span>
          Manage Bookings
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span>👥</span>
          Manage Users
        </NavLink>

        <NavLink
          to="/admin/professionals"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span>👩</span>
          Professionals
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span>🏷️</span>
          Categories
        </NavLink>

        <NavLink
          to="/admin/offers"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span>🎁</span>
          Offers
        </NavLink>

        <NavLink
          to="/admin/payments"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span>💳</span>
          Payments
        </NavLink>

        {/* <NavLink
          to="/admin/reviews"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span>⭐</span>
          Reviews
        </NavLink> */}

        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span>📊</span>
          Reports
        </NavLink>

      </nav>

      <div className="sidebar-bottom">

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <span>🚪</span>
          Logout
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;
