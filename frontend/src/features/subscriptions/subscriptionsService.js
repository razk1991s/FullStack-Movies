import api from "../../services/api";

export const getMembers = () => api.get("/api/members");
export const getSubscriptions = () => api.get("/api/subscriptions");
export const subscribeToMovie = (data) =>
  api.post("/api/subscriptions/subscribe", data);
