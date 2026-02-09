import axios from "axios";

const url = "https://estudos-ruby-1.onrender.com/api";
const localUrl = "http://localhost:3000/api";

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
