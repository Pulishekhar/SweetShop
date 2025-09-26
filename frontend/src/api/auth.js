import axios from "axios";
const BASE_URL = "http://localhost:5000/api/auth";

export const signup = (data) => axios.post(`${BASE_URL}/signup`, data, { withCredentials: true });
export const login = (data) => axios.post(`${BASE_URL}/login`, data, { withCredentials: true });
export const logout = () => axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
export const checkAuth = () => axios.get(`${BASE_URL}/check`, { withCredentials: true });
export const updateProfile = (data) => axios.put(`${BASE_URL}/update-profile`, data, { withCredentials: true });
