import React, { useEffect, useState } from "react";
import { fetchUsers, updateUserStatus, deleteUser } from "../../services/adminService";
import "./styles/AdminPanelPage.css";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import Popup from "../../components/Popup";
import Button from "../../components/Button";

interface User {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
  active: boolean;
}

const AdminPanel: React.FC = () => {
  const { refreshAuthState , logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);

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

  const handleToggleAdmin = async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem("token") || "";
      const decoded: { id: string } = jwtDecode(token);

      await updateUserStatus(token, selectedUser._id, { admin: !selectedUser.admin });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, admin: !selectedUser.admin } : user
        )
      );

      if (selectedUser._id === decoded.id) {
        refreshAuthState();
      }
      closePopup();
    } catch (error) {
      console.error("Error updating user admin status:", error);
    }
  };

  const handleToggleActive = async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem("token") || "";
      const decoded: { id: string } = jwtDecode(token);

      await updateUserStatus(token, selectedUser._id, { active: !selectedUser.active });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, active: !selectedUser.active } : user
        )
      );

      if (selectedUser._id === decoded.id) {
        refreshAuthState();
      }
      closePopup();
    } catch (error) {
      console.error("Error updating user active status:", error);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem("token") || "";
      const decoded: { id: string } = jwtDecode(token);

      await deleteUser(token, selectedUser._id);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedUser._id));

      if (selectedUser._id === decoded.id) {
        logout();
      }

      closePopup();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openPopup = (user: User) => {
    setSelectedUser(user);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedUser(null);
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
            <th>Settings</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="name-cell" data-name={user.name}>
                {user.name}
              </td>
              <td className="email-cell" data-email={user.email}>
                {user.email}
              </td>
              <td>{user.admin ? "Yes" : "No"}</td>
              <td>{user.active ? "Yes" : "No"}</td>
              <td>
                <button
                  className="settings-btn"
                  onClick={() => openPopup(user)}
                  aria-label="Settings"
                >
                  ⚙️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupVisible && selectedUser && (
        <Popup message={`Settings for ${selectedUser.name}`} onClose={closePopup}>
          <div className="popup-buttons">
            <Button
              label={selectedUser.admin ? "Remove Admin" : "Make Admin"}
              onClick={handleToggleAdmin}
            />
            <Button
              label={selectedUser.active ? "Block" : "Unblock"}
              onClick={handleToggleActive}
            />
            <Button label="Delete User" onClick={handleDeleteUser} />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default AdminPanel;
