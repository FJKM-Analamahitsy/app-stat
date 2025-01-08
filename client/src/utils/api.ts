import axios from "axios";

export const server = axios;

export default axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:3001`,
  headers: {
    device: navigator.userAgent,
    Authorization: sessionStorage.getItem("token"),
  },
});
