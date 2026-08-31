// // 
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import api from "../../api/axios";

// import "./styles/Login.css";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await api.get(
//         `/users?email=${formData.email}&password=${formData.password}`
//       );

//       const users = response.data;

//       if (users.length === 0) {
//         setError("Invalid email or password");
//         return;
//       }

//       const user = users[0];

//       localStorage.setItem(
//         "user",
//         JSON.stringify(user)
//       );

//       if (user.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.log("Login Error:", error);

//       setError(
//         "Unable to login. Please try again."
//       );
//     }
//   };

//   return (
//     <section className="login-page">
//       <div className="login-container">

//         <div className="login-left">
//           <div className="login-overlay">

//             <p className="login-small-title">
//               WELCOME TO
//             </p>

//             <h1>
//               Salon<span>Beauty</span>
//             </h1>

//             <p className="login-left-text">
//               Book your favourite beauty and salon
//               services with trusted professionals.
//             </p>

//             <div className="login-features">

//               <div>
//                 <span>✂️</span>
//                 <p>Professional Services</p>
//               </div>

//               <div>
//                 <span>📅</span>
//                 <p>Easy Appointments</p>
//               </div>

//               <div>
//                 <span>💖</span>
//                 <p>Premium Beauty Care</p>
//               </div>

//             </div>

//           </div>
//         </div>

//         <div className="login-right">

//           <div className="login-form-box">

//             <p className="form-small-title">
//               ACCOUNT LOGIN
//             </p>

//             <h2>Welcome Back</h2>

//             <p className="login-subtitle">
//               Login to continue to SalonBeauty.
//             </p>

//             {error && (
//               <div className="login-error">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>

//               <div className="login-input-group">

//                 <label>Email Address</label>

//                 <div className="input-box">

//                   <span>✉️</span>

//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />

//                 </div>

//               </div>

//               <div className="login-input-group">

//                 <label>Password</label>

//                 <div className="input-box">

//                   <span>🔒</span>

//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />

//                 </div>

//               </div>

//               <div className="login-options">

//                 <label className="remember-me">

//                   <input type="checkbox" />

//                   Remember me

//                 </label>

//                 <button
//                   type="button"
//                   className="forgot-btn"
//                 >
//                   Forgot Password?
//                 </button>

//               </div>

//               <button
//                 type="submit"
//                 className="login-btn"
//               >
//                 Login
//               </button>

//             </form>

//             <div className="register-link">

//               <p>
//                 Don't have an account?
//               </p>

//               <button
//                 onClick={() =>
//                   navigate("/register")
//                 }
//               >
//                 Create Account
//               </button>

//             </div>

//             <div className="admin-login-info">
//               <span>🛡️</span>

//               <p>
//                 Admin users will automatically
//                 redirect to the Admin Dashboard.
//               </p>
//             </div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

import "./styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.get(
        `/users?email=${encodeURIComponent(
          formData.email
        )}&password=${encodeURIComponent(
          formData.password
        )}`
      );

      const users = response.data;

      if (users.length === 0) {
        setError("Invalid email or password");
        return;
      }

      const user = users[0];

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Login Error:", error);

      setError(
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">

      <div className="login-decoration login-decoration-one"></div>
      <div className="login-decoration login-decoration-two"></div>

      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-left">

          <div className="login-overlay">

            <div className="login-brand-badge">
              ✨ Premium Beauty Experience
            </div>

            <p className="login-small-title">
              WELCOME TO
            </p>

            <h1>
              Salon<span>Beauty</span>
            </h1>

            <p className="login-left-text">
              Discover professional beauty services,
              trusted stylists and easy appointment
              booking designed to make your beauty
              journey simple and relaxing.
            </p>

            <div className="login-features">

              <div className="login-feature-card">
                <span>✂️</span>

                <div>
                  <h4>Professional Services</h4>
                  <p>Expert beauty professionals</p>
                </div>
              </div>

              <div className="login-feature-card">
                <span>📅</span>

                <div>
                  <h4>Easy Appointments</h4>
                  <p>Book your service in minutes</p>
                </div>
              </div>

              <div className="login-feature-card">
                <span>💖</span>

                <div>
                  <h4>Premium Beauty Care</h4>
                  <p>Quality service every time</p>
                </div>
              </div>

            </div>

            <div className="login-rating">
              <span>⭐⭐⭐⭐⭐</span>

              <p>
                Trusted by 1000+ happy customers
              </p>
            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="login-right">

          <div className="login-form-box">

            <div className="login-form-icon">
              💗
            </div>

            <p className="form-small-title">
              ACCOUNT LOGIN
            </p>

            <h2>
              Welcome Back
            </h2>

            <p className="login-subtitle">
              Enter your details to continue to
              your SalonBeauty account.
            </p>


            {error && (
              <div className="login-error">
                <span>⚠️</span>
                {error}
              </div>
            )}


            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="login-input-group">

                <label>
                  Email Address
                </label>

                <div className="input-box">

                  <span className="input-icon">
                    ✉️
                  </span>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}
              <div className="login-input-group">

                <label>
                  Password
                </label>

                <div className="input-box">

                  <span className="input-icon">
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

              </div>


              {/* OPTIONS */}
              <div className="login-options">

                <label className="remember-me">

                  <input
                    type="checkbox"
                  />

                  <span>
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  className="forgot-btn"
                >
                  Forgot Password?
                </button>

              </div>


              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login to Account"}

                {!loading && (
                  <span>→</span>
                )}
              </button>

            </form>


            {/* REGISTER */}
            <div className="register-link">

              <p>
                Don't have an account?
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/register")
                }
              >
                Create Account
              </button>

            </div>


            {/* ADMIN INFO */}
            <div className="admin-login-info">

              <span>
                🛡️
              </span>

              <p>
                Admin users are automatically
                redirected to the Admin Dashboard
                after successful login.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Login;