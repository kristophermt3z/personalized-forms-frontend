import api from "./api";

export const fetchForms = async () => {
  return api.get("/forms/get-forms");
};

export const fetchProfileForms = async (token: string) => {
  return api.get("/forms/get-profile-forms", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchFormById = async (formId: string, token: string) => {
  return api.get(`/forms/${formId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createForm = async (formData: object, token: string) => {
  return api.post("/forms/create-form", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateForm = async (
  formId: string,
  formData: object,
  token: string
) => {
  return api.put(`/forms/${formId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteFormById = async (id: string, token: string) => {
  return api.delete(`/forms/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
