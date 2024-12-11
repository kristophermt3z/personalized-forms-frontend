import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchHomeMessage = async () => {
  return axios.get(`${API_URL}/helloWorld`);
};
