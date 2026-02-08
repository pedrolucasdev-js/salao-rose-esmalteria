import axios from "axios";

const api = axios.create({
  baseURL: "https://estudos-ruby-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
