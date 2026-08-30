// 
import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

import "./styles/Reports.css";

function Reports() {
  const [report, setReport] = useState({
    services: 0,
    bookings: 0,
    completed: 0,
    cancelled: 0,
    pending: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadReport = async () => {
    try {
      setLoading(true);

      const [
        servicesResponse,
        bookingsResponse,
        paymentsResponse,
      ] = await Promise.all([
        api.get("/services"),
        api.get("/bookings"),
        api.get("/payments"),
      ]);

      const bookings = bookingsResponse.data;
      const payments = paymentsResponse.data;

      const completedBookings = bookings.filter(
        (booking) => booking.status === "Completed"
      ).length;

      const cancelledBookings = bookings.filter(
        (booking) => booking.status === "Cancelled"
      ).length;

      const pendingBookings = bookings.filter(
        (booking) =>
          booking.status === "Pending" ||
          !booking.status
      ).length;

      const revenue = payments
        .filter(
          (payment) => payment.status === "Paid"
        )
        .reduce(
          (total, payment) =>
            total + Number(payment.amount || 0),
          0
        );

      setReport({
        services: servicesResponse.data.length,
        bookings: bookings.length,
        completed: completedBookings,
        cancelled: cancelledBookings,
        pending: pendingBookings,
        revenue,
      });
    } catch (error) {
      console.log("Error loading reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const completionRate =
    report.bookings === 0
      ? 0
      : Math.round(
          (report.completed / report.bookings) * 100
        );

  const cancellationRate =
    report.bookings === 0
      ? 0
      : Math.round(
          (report.cancelled / report.bookings) * 100
        );

  return (
    <div className="reports-layout">
      <AdminSidebar />

      <main className="reports-page">

        <section className="reports-header">
          <div>
            <p className="reports-label">
              ADMIN PANEL
            </p>

            <h1>Salon Reports</h1>

            <p className="reports-subtitle">
              Track salon performance, booking activity,
              service growth and payment revenue.
            </p>
          </div>

          <button
            className="reports-refresh-btn"
            onClick={loadReport}
          >
            ↻ Refresh Report
          </button>
        </section>

        {loading ? (
          <div className="reports-loading">
            <div className="reports-loading-icon">
              📊
            </div>

            <h2>Loading Reports...</h2>

            <p>
              Please wait while salon data is being analysed.
            </p>
          </div>
        ) : (
          <>
            <section className="reports-cards">

              <div className="report-card">
                <div className="report-icon service-report">
                  ✂️
                </div>

                <div>
                  <span>Total Services</span>
                  <h2>{report.services}</h2>
                  <p>Available salon services</p>
                </div>
              </div>

              <div className="report-card">
                <div className="report-icon booking-report">
                  📅
                </div>

                <div>
                  <span>Total Bookings</span>
                  <h2>{report.bookings}</h2>
                  <p>Customer appointments</p>
                </div>
              </div>

              <div className="report-card">
                <div className="report-icon completed-report">
                  ✓
                </div>

                <div>
                  <span>Completed</span>
                  <h2>{report.completed}</h2>
                  <p>Successfully completed</p>
                </div>
              </div>

              <div className="report-card">
                <div className="report-icon cancelled-report">
                  ✕
                </div>

                <div>
                  <span>Cancelled</span>
                  <h2>{report.cancelled}</h2>
                  <p>Cancelled appointments</p>
                </div>
              </div>

              <div className="report-card">
                <div className="report-icon pending-report">
                  ⏳
                </div>

                <div>
                  <span>Pending</span>
                  <h2>{report.pending}</h2>
                  <p>Waiting for confirmation</p>
                </div>
              </div>

              <div className="report-card revenue-card">
                <div className="report-icon revenue-report">
                  💰
                </div>

                <div>
                  <span>Total Revenue</span>

                  <h2>
                    ₹{report.revenue.toLocaleString("en-IN")}
                  </h2>

                  <p>Revenue from paid payments</p>
                </div>
              </div>

            </section>

            <section className="reports-performance">

              <div className="performance-heading">
                <div>
                  <p className="reports-label">
                    PERFORMANCE
                  </p>

                  <h2>
                    Booking Performance
                  </h2>

                  <p>
                    Quick overview of completed and cancelled
                    salon appointments.
                  </p>
                </div>

                <div className="performance-icon">
                  📈
                </div>
              </div>

              <div className="performance-grid">

                <div className="performance-card">
                  <div className="performance-top">
                    <div>
                      <span>
                        Completion Rate
                      </span>

                      <h3>
                        {completionRate}%
                      </h3>
                    </div>

                    <div className="performance-badge success-badge">
                      ✓
                    </div>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-bar completion-bar"
                      style={{
                        width: `${completionRate}%`,
                      }}
                    ></div>
                  </div>

                  <p>
                    {report.completed} of {report.bookings} bookings
                    completed.
                  </p>
                </div>

                <div className="performance-card">
                  <div className="performance-top">
                    <div>
                      <span>
                        Cancellation Rate
                      </span>

                      <h3>
                        {cancellationRate}%
                      </h3>
                    </div>

                    <div className="performance-badge cancel-badge">
                      ✕
                    </div>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-bar cancellation-bar"
                      style={{
                        width: `${cancellationRate}%`,
                      }}
                    ></div>
                  </div>

                  <p>
                    {report.cancelled} of {report.bookings} bookings
                    cancelled.
                  </p>
                </div>

              </div>

            </section>
          </>
        )}

      </main>
    </div>
  );
}

export default Reports;