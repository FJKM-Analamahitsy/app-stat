import axios from "axios";

export const server = axios;

const localServer = `${window.location.protocol}//${window.location.hostname}`;

const api = axios.create({
  baseURL: `${
    process.env.REACT_APP_ENV === "cloud"
      ? process.env.REACT_APP_SERVER
      : localServer
  }:3001`,
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
