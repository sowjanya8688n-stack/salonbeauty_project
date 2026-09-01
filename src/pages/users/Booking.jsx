// 
import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import api from "../../api/axios";

import "./styles/Booking.css";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedService =
    location.state?.service || null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService) {
      alert("Please select a service first.");
      navigate("/services");
      return;
    }

    // Name validation
    if (formData.name.trim().length < 3) {
      alert("Please enter a valid full name.");
      return;
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(formData.phone)) {
      alert(
        "Please enter a valid 10 digit mobile number."
      );
      return;
    }

    // Date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(
      formData.date + "T00:00:00"
    );

    if (selectedDate < today) {
      alert(
        "Past dates are not allowed."
      );
      return;
    }

    if (!formData.time) {
      alert(
        "Please select appointment time."
      );
      return;
    }

    const bookingData = {
      customerName: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone,

      serviceId: selectedService.id,
      serviceName: selectedService.name,

      price: selectedService.price,

      bookingDate: formData.date,
      bookingTime: formData.time,

      status: "Pending",
    };

    try {
      await api.post(
        "/bookings",
        bookingData
      );

      alert(
        "Appointment booked successfully!"
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
      });

      navigate("/my-bookings");
    } catch (error) {
      console.log(
        "Booking Error:",
        error
      );

      alert(
        "Unable to book appointment."
      );
    }
  };

  const todayDate =
    new Date()
      .toISOString()
      .split("T")[0];

  return (
    <section className="booking-page">
      <div className="booking-container">

        <div className="booking-header">
          <p>
            BOOK YOUR APPOINTMENT
          </p>

          <h1>
            Beauty Appointment
          </h1>

          <span>
            Select your date and time.
          </span>
        </div>

        <div className="booking-card">

          {selectedService ? (
            <div className="selected-service">

              <img
                src={selectedService.image}
                alt={selectedService.name}
              />

              <div>
                <span>
                  Selected Service
                </span>

                <h3>
                  {selectedService.name}
                </h3>

                <p>
                  {selectedService.duration}
                </p>

                <strong>
                  ₹{selectedService.price}
                </strong>
              </div>

            </div>
          ) : (
            <div className="no-service">

              <p>
                No service selected.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/services")
                }
              >
                Choose Service
              </button>

            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="booking-form-group">
              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                minLength="3"
                required
              />
            </div>

            <div className="booking-form-group">
              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="booking-form-group">
              <label>
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter 10 digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                pattern="[6-9][0-9]{9}"
                required
              />
            </div>

            <div className="booking-form-group">
              <label>
                Appointment Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={todayDate}
                required
              />
            </div>

            <div className="booking-form-group">
              <label>
                Appointment Time
              </label>

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="booking-submit-btn"
              type="submit"
              disabled={!selectedService}
            >
              Confirm Appointment
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}

export default Booking;