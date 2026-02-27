import axios from "axios";

const API =axios.create({ baseURL: "https://fullstack-task-codveda-1.onrender.com " }) 
export const getUsers   = ()        => API.get("/users");
export const getUserById = (id)     => API.get(`/users/${id}`);
export const createUser = (data)    => API.post("/users", data);
export const updateUser = (id,data) => API.put(`/users/${id}`, data);
export const deleteUser = (id)      => API.delete(`/users/${id}`);
