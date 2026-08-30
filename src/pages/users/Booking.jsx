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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService) {
      alert("Please select a service first.");
      navigate("/services");
      return;
    }

    const bookingData = {
      customerName: formData.name,
      email: formData.email,
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

      alert("Appointment booked successfully!");

      navigate("/my-bookings");
    } catch (error) {
      console.log(
        "Booking Error:",
        error
      );

      alert("Unable to book appointment.");
    }
  };

  return (
    <section className="booking-page">

      <div className="booking-container">

        <div className="booking-header">

          <p>BOOK YOUR APPOINTMENT</p>

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
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
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