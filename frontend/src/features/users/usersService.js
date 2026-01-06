import api from "../../services/api";

export const getUsers = () => api.get("/api/users");
export const addUser = (user) => api.post("/api/users", user);
export const updateUser = (id, user) => api.put(`/api/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/api/users/${id}`);
