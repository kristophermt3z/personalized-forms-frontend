import api from "./api";

export const loginUser = async (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};

export const registerUser = async (name: string, email: string, password: string) => {
  return api.post("/auth/register", { name, email, password });
};

export const getCurrentUser = async (token: string) => {
  return api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
};