import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  updateUserStatus,
  deleteUser,
} from "../../services/adminService";
import "./styles/AdminPanelPage.css";

interface User {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
  active: boolean;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await fetchUsers(token);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, []);

  const handleToggleAdmin = async (userId: string, isAdmin: boolean) => {
    try {
      const token = localStorage.getItem("token") || "";
      await updateUserStatus(token, userId, { admin: !isAdmin });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, admin: !isAdmin } : user
        )
      );
    } catch (error) {
      console.error("Error updating user admin status:", error);
    }
  };

  const handleToggleActive = async (userId: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem("token") || "";
      await updateUserStatus(token, userId, { active: !isActive });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, active: !isActive } : user
        )
      );
    } catch (error) {
      console.error("Error updating user active status:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      await deleteUser(token, userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="admin-panel-container">
      <h1>Admin Panel</h1>
      <table className="admin-panel-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.admin ? "Yes" : "No"}</td>
              <td>{user.active ? "Yes" : "No"}</td>
              <td>
                <button
                  className="toggle-admin-btn"
                  onClick={() => handleToggleAdmin(user._id, user.admin)}
                >
                  {user.admin ? "Remove Admin" : "Make Admin"}
                </button>
                <button
                  className="toggle-active-btn"
                  onClick={() => handleToggleActive(user._id, user.active)}
                >
                  {user.active ? "Block" : "Unblock"}
                </button>
                <button
                  className="delete-user-btn"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
