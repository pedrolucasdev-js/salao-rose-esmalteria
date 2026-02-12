import axios from "axios";

// URL LOCAL
// const url = "http://localhost:3000/api";
const url = "http://localhost:3000/api";

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
