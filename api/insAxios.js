import axios from "axios";

const instAxios = axios.create({
  baseURL: "https://history-app-production.up.railway.app",
  withCredentials: true,
});

export default instAxios;
