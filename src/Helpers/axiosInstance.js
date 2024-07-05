// import axios from "axios";

// const axiosInstance = axios.create(); // Create a new instance of axios

// axiosInstance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; //set the base URL

// axiosInstance.defaults.withCredentials = true; // Allow cookies to be sent with requests

// // Intercept each request to include the token

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Set the base URL from environment variables
  withCredentials: true, // Allow cookies to be sent with requests
});

// Interceptor to include the token in headers for authenticated requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
