import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // or just "http://localhost:3000" if no /api
  withCredentials: true,
});

export default api;
