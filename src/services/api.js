import axios from "axios";

const api = axios.create({
  baseURL: "https://unhas-prime-api.onrender.com",
});

export default api;
