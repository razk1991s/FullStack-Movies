import api from "../../services/api";

export const login = (data) => api.post("/api/auth/login", data);
export const createAccount = (data) => api.post("/api/create-account", data);
