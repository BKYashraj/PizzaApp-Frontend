// src/utils/privateAxios.js

import axios from 'axios';

const privateAxios = axios.create({
  baseURL: 'https://your-api-base-url.com', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers here if needed
  },
});

privateAxios.interceptors.request.use(
  (config) => {
    // You can set loading state here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateAxios.interceptors.response.use(
  (response) => {
    // You can handle response data here if needed
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default privateAxios;
