import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const registerUser = async (name: string, email: string, password: string) => {
  return axios.post(`${API_URL}/auth/register`, { name, email, password });
};
