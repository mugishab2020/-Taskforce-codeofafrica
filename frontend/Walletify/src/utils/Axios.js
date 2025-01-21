import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3002/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("x-auth-token");
    console.log("the token", token);
    if (token) {
      config.headers["x-auth-token"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
