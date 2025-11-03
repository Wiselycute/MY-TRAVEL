import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  // You can add interceptors here if you need auth headers or logging
});

export default api;
