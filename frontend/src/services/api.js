import axios from 'axios';

// Create the Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Add a "Request Interceptor"
// This runs BEFORE every request is sent
api.interceptors.request.use(
  (config) => {
    // Check if we have a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Attach the token to the header: "Authorization: Bearer <token>"
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;