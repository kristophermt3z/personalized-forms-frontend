import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { tokenExpired , isNotAdmin } = error.response?.data;
    if (tokenExpired) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    if (isNotAdmin) {
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
