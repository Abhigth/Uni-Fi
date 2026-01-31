import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // <-- THIS IS CRITICAL
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const post = async (url, data) => {
  try {
    const res = await api.post(url, data);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Server error" };
  }
};

export const get = async (url) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Server error" };
  }
};
