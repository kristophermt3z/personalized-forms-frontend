import axios from "axios";
import { useAuth } from "../context/AuthContext";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { tokenExpired } = error.response?.data;
    if (tokenExpired) {
      const { logout } = useAuth();
      console.log('auth');
      window.location.href = "/login";
      logout();
    }

    return Promise.reject(error);
  }
);

export default api;
