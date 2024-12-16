import api from "./api";

export const fetchHomeMessage = async () => {
  return api.get("/helloWorld");
};
