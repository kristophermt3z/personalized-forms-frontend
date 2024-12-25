import api from "./api";

export const getUsers = async (token: string) => {
    return api.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };