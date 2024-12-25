import api from "./api";

export const fetchUsers = async (token: string) => {
    return api.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  export const updateUserStatus = async (token: string, userId: string, updates: object) => {
    return api.put(`/admin/users/${userId}`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  
  export const deleteUser = async (token: string, userId: string) => {
    return api.delete(`/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };