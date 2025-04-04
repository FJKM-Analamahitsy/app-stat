import axios from "axios";

export const server = axios;

const host = `${window.location.protocol}//${window.location.hostname}`;

const api = axios.create({
  baseURL: `${host}${process.env.REACT_APP_ENV === "cloud" ? "" : ":3001"}/api`,
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
