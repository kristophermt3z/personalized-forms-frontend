import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchForms = async (token: string) => {
  return axios.get(`${API_URL}/forms/get-forms`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createForm = async (formData: object, token: string) => {
  return axios.post(`${API_URL}/forms/create-form`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
