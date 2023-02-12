import Axios, { AxiosRequestConfig } from "axios";

const services = Axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
  withCredentials: true,
});

services.interceptors.request.use(async (config: AxiosRequestConfig) => {
  config.withCredentials = true;
  return config;
});

export default services;
