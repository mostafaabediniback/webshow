import axios from "axios";
import { toast } from "react-toastify";
export const serverUrl = import.meta.env.VITE_API_BASE_URL;
const axiosInstanceNew = axios.create({
  baseURL: serverUrl,
});

axiosInstanceNew.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstanceNew.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    if (data?.errors && typeof data.errors === "object") {
      Object.keys(data.errors).forEach((field) => {
        const msgs = Array.isArray(data.errors[field]) ? data.errors[field] : [String(data.errors[field])];
        msgs.forEach((msg) => toast.error(msg, { position: "top-right", theme: "colored" }));
      });
    } else if (data?.message) {
      toast.error(String(data.message), { position: "top-right", theme: "colored" });
    }
    if (status === 401 || status === 403) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceNew;
