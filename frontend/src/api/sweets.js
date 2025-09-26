import axios from "axios";
const BASE_URL = "http://localhost:5000/api/sweets";

export const getAllSweets = () => axios.get(`${BASE_URL}/all`);
export const searchSweets = (params) => axios.get(`${BASE_URL}/search`, { params });
export const purchaseSweet = (id, quantity) => axios.post(`${BASE_URL}/${id}/purchase`, { quantity });
export const addSweet = (data) => axios.post(`${BASE_URL}/add`, data);
export const updateSweet = (id, data) => axios.put(`${BASE_URL}/update/${id}`, data);
export const deleteSweet = (id) => axios.delete(`${BASE_URL}/delete/${id}`);
export const restockSweet = (id, quantity) => axios.post(`${BASE_URL}/${id}/restock`, { quantity });
