import axios from "axios";

const API = axios.create({
  baseURL: "https://react-node-auth-backend-17y6.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
