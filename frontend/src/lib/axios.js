// axios.js
import axios from "axios";  // <-- ADD THIS LINE

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // point to backend
  withCredentials: true,                // allow cookies
});
