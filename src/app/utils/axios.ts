import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://shantofolioserver.vercel.app/api/v1",
  withCredentials: true,
});
