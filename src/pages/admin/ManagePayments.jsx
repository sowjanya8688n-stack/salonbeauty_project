// 
import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

import "./styles/ManagePayments.css";

function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadPayments = async () => {
    try {
      setLoading(true);

      const response = await api.get("/payments");

      setPayments(response.data);
    } catch (error) {
      console.log("Error loading payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/payments/${id}`, {
        status,
      });

      loadPayments();
    } catch (error) {
      console.log("Error updating payment:", error);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const value = search.toLowerCase();

    return (
      payment.customer?.toLowerCase().includes(value) ||
      payment.method?.toLowerCase().includes(value) ||
      payment.status?.toLowerCase().includes(value)
    );
  });

  const paidPayments = payments.filter(
    (payment) => payment.status === "Paid"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  ).length;

  const failedPayments = payments.filter(
    (payment) => payment.status === "Failed"
  ).length;

  const refundedPayments = payments.filter(
    (payment) => payment.status === "Refunded"
  ).length;

  const totalRevenue = payments
    .filter((payment) => payment.status === "Paid")
    .reduce(
      (total, payment) => total + Number(payment.amount || 0),
      0
    );

  const getStatusClass = (status) => {
    if (status === "Paid") {
      return "payment-status-paid";
    }

    if (status === "Failed") {
      return "payment-status-failed";
    }

    if (status === "Refunded") {
      return "payment-status-refunded";
    }

    return "payment-status-pending";
  };

  return (
    <div className="payments-layout">
      <AdminSidebar />

      <main className="payments-page">

        <section className="payments-header">
          <div>
            <p className="payments-label">
              ADMIN PANEL
            </p>

            <h1>Manage Payments</h1>

            <p className="payments-subtitle">
              Monitor customer payments, payment methods and transaction
              status.
            </p>
          </div>

          <div className="payments-revenue-card">
            <div className="payments-revenue-icon">
              💳
            </div>

            <div>
              <p>Total Revenue</p>

              <h2>
                ₹{totalRevenue.toLocaleString("en-IN")}
              </h2>
            </div>
          </div>
        </section>

        <section className="payment-summary-grid">

          <div className="payment-summary-card">
            <div className="payment-summary-icon all-icon">
              💰
            </div>

            <div>
              <span>Total Payments</span>
              <h3>{payments.length}</h3>
            </div>
          </div>

          <div className="payment-summary-card">
            <div className="payment-summary-icon paid-icon">
              ✓
            </div>

            <div>
              <span>Paid</span>
              <h3>{paidPayments}</h3>
            </div>
          </div>

          <div className="payment-summary-card">
            <div className="payment-summary-icon pending-icon">
              ⏳
            </div>

            <div>
              <span>Pending</span>
              <h3>{pendingPayments}</h3>
            </div>
          </div>

          <div className="payment-summary-card">
            <div className="payment-summary-icon failed-icon">
              ✕
            </div>

            <div>
              <span>Failed</span>
              <h3>{failedPayments}</h3>
            </div>
          </div>

          <div className="payment-summary-card">
            <div className="payment-summary-icon refund-icon">
              ↩
            </div>

            <div>
              <span>Refunded</span>
              <h3>{refundedPayments}</h3>
            </div>
          </div>

        </section>

        <section className="payments-toolbar">

          <div className="payments-search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search customer, method or status..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <button
            className="payments-refresh-btn"
            onClick={loadPayments}
          >
            ↻ Refresh
          </button>

        </section>

        {loading ? (
          <div className="payments-state-box">
            Loading payments...
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="payments-state-box">

            <div className="payments-empty-icon">
              💳
            </div>

            <h2>No Payments Found</h2>

            <p>
              Customer payment records will appear here.
            </p>

          </div>
        ) : (
          <div className="payments-table-wrapper">

            <table className="payments-table">

              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>

                    <td>
                      <div className="payment-customer">

                        <div className="payment-avatar">
                          {(payment.customer || "C")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {payment.customer || "Customer"}
                          </strong>

                          <span>
                            Payment ID: {payment.id}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="payment-amount">
                        ₹{Number(
                          payment.amount || 0
                        ).toLocaleString("en-IN")}
                      </span>
                    </td>

                    <td>
                      <span className="payment-method-badge">
                        {payment.method || "N/A"}
                      </span>
                    </td>

                    <td>
                      <select
                        className={`payment-status-select ${getStatusClass(
                          payment.status
                        )}`}
                        value={
                          payment.status || "Pending"
                        }
                        onChange={(e) =>
                          updateStatus(
                            payment.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Paid">
                          Paid
                        </option>

                        <option value="Failed">
                          Failed
                        </option>

                        <option value="Refunded">
                          Refunded
                        </option>
                      </select>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </main>
    </div>
  );
}

export default ManagePayments;