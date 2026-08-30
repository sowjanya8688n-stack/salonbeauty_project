import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import api from "../../api/axios";

import "./styles/Register.css";

function Register() {

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    });

  const navigate = useNavigate();

  const submit = async (e) => {

    e.preventDefault();

    if (
      form.password !==
      form.confirmPassword
    ) {

      alert(
        "Passwords do not match."
      );

      return;
    }

    try {

      const existing =
        await api.get(
          `/users?email=${encodeURIComponent(
            form.email
          )}`
        );

      if (existing.data.length) {

        alert(
          "Email already registered."
        );

        return;
      }

      await api.post(
        "/users",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: "user"
        }
      );

      alert(
        "Registration successful."
      );

      navigate("/login");

    } catch {

      alert(
        "Start JSON Server first."
      );
    }
  };

  return (
    <section className="auth-page">

      <div className="auth-box">

        <h1>
          Create Account
        </h1>

        <p>
          Join SalonBeauty today.
        </p>

        <form onSubmit={submit}>

          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            required
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword:
                  e.target.value
              })
            }
            required
          />

          <button
            className="btn"
            type="submit"
          >
            Register
          </button>

        </form>

        <p className="auth-link">
          Already have an account?
          {" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </section>
  );
}

export default Register;