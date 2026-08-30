import { NavLink } from "react-router-dom";
import "./styles/Navbar.css";

function Navbar() {
  return (
    <header className="website-header">
      <nav className="website-navbar">

        {/* LOGO */}
        <NavLink to="/" className="website-logo">
          Salon<span>Beauty</span>
        </NavLink>

        {/* NAVIGATION */}
        <div className="website-nav-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item nav-active" : "nav-item"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "nav-item nav-active" : "nav-item"
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/booking"
            className={({ isActive }) =>
              isActive ? "nav-item nav-active" : "nav-item"
            }
          >
            Book Appointment
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-item nav-active" : "nav-item"
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="navbar-register-button"
          >
            Register
          </NavLink>

        </div>

      </nav>
    </header>
  );
}

export default Navbar;