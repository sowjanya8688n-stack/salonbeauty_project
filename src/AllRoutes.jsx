// 
import { Routes, Route, Navigate } from "react-router-dom";

// ======================
// USER PAGES
// ======================
// import AdminSidebar from "./components/admin/AdminSidebar";
import Home from "./pages/users/Home";
import Services from "./pages/users/Services";
import Booking from "./pages/users/Booking";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";

// ======================
// ADMIN PAGES
// ======================

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageServices from "./pages/admin/ManageServices";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageProfessionals from "./pages/admin/ManageProfessionals";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageOffers from "./pages/admin/ManageOffers";
import ManagePayments from "./pages/admin/ManagePayments";
import ManageReviews from "./pages/admin/ManageReviews";
import Reports from "./pages/admin/Reports";

function AllRoutes() {
  return (
    <Routes>

      {/* ======================
          USER ROUTES
      ====================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/services"
        element={<Services />}
      />

      <Route
        path="/booking"
        element={<Booking />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ======================
          ADMIN ROUTES
      ====================== */}
    
      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/services"
        element={<ManageServices />}
      />

      <Route
        path="/admin/bookings"
        element={<ManageBookings />}
      />

      <Route
        path="/admin/users"
        element={<ManageUsers />}
      />

      <Route
        path="/admin/professionals"
        element={<ManageProfessionals />}
      />

      <Route
        path="/admin/categories"
        element={<ManageCategories />}
      />

      <Route
        path="/admin/offers"
        element={<ManageOffers />}
      />

      <Route
        path="/admin/payments"
        element={<ManagePayments />}
      />

      <Route
        path="/admin/reviews"
        element={<ManageReviews />}
      />

      <Route
        path="/admin/reports"
        element={<Reports />}
      />

      {/* UNKNOWN URL */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AllRoutes;