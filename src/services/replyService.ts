import api from "./api";

export const submitReply = async (replyData: object, token: string) => {
  return api.post("/reply", replyData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchRepliesByForm = async (formId: string, token: string) => {
  return api.get(`/reply/${formId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
