import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000"
  baseURL: "https://salonbeauty-backend.onrender.com"
});

export default api;