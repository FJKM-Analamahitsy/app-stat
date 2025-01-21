import axios from "axios";

export const server = axios;

const api = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:3001`,
  headers: {
    device: navigator.userAgent,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
