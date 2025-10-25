import axios from "axios";

export const server = axios;

const host = `${window.location.protocol}//${window.location.hostname}`;

const api = axios.create({
  baseURL: `${
    process.env.REACT_APP_ENV === "cloud"
      ? window.location.origin
      : `${host}:3001`
  }/api`,
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

export const getData = async (url: string) => {
  const result = await api.get(url);
  return result.data;
};

export default api;
