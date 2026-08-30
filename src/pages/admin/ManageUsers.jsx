// 
import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

import "./styles/ManageUsers.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/users");

      setUsers(response.data);
    } catch (error) {
      console.log("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/users/${id}`);

      loadUsers();
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue) ||
      user.phone?.toLowerCase().includes(searchValue) ||
      user.role?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="manage-users-layout">
      <AdminSidebar />

      <main className="manage-users-page">

        <div className="manage-users-header">
          <div>
            <p className="manage-users-label">
              ADMIN PANEL
            </p>

            <h1>Manage Users</h1>

            <p className="manage-users-subtitle">
              View and manage registered SalonBeauty customers.
            </p>
          </div>

          <div className="users-count-card">
            <div className="users-count-icon">
              👥
            </div>

            <div>
              <p>Total Users</p>
              <h2>{users.length}</h2>
            </div>
          </div>
        </div>

        <div className="users-toolbar">

          <div className="users-search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search by name, email, phone or role..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <button
            className="users-refresh-btn"
            onClick={loadUsers}
          >
            ↻ Refresh
          </button>

        </div>

        {loading ? (
          <div className="users-loading">
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="users-empty">
            <div className="users-empty-icon">
              👤
            </div>

            <h2>No Users Found</h2>

            <p>
              No registered users match your search.
            </p>
          </div>
        ) : (
          <div className="users-table-wrapper">

            <table className="users-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>

                    <td>
                      <div className="user-profile-cell">

                        <div className="user-avatar">
                          {(user.name ||
                            user.username ||
                            "U")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {user.name ||
                              user.username ||
                              "Unknown User"}
                          </strong>

                          <span>
                            User ID: {user.id}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="user-email">
                        {user.email || "N/A"}
                      </span>
                    </td>

                    <td>
                      {user.phone ||
                        user.phno ||
                        "-"}
                    </td>

                    <td>
                      <span
                        className={
                          user.role === "admin"
                            ? "role-badge role-admin"
                            : "role-badge role-user"
                        }
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    <td>
                      <button
                        className="user-delete-button"
                        onClick={() =>
                          deleteUser(user.id)
                        }
                      >
                        🗑 Delete
                      </button>
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

export default ManageUsers;