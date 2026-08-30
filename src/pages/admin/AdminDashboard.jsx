// 
import AdminSidebar from "../../components/admin/AdminSidebar";
import "./styles/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <h1>Admin Dashboard</h1>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Users</h3>
            {/* <h2>120</h2> */}
          </div>

          <div className="dashboard-card">
            <h3>Services</h3>
            {/* <h2>12</h2> */}
          </div>

          <div className="dashboard-card">
            <h3>Bookings</h3>
            {/* <h2>48</h2> */}
          </div>

          <div className="dashboard-card">
            <h3>Pending</h3>
            {/* <h2>8</h2> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;