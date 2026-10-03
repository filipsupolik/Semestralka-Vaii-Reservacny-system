import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token and user role to requests
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (userRole) {
    config.headers["X-User-Role"] = userRole;
  }
  return config;
});

// Handle errors
apiService.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    throw new Error(message);
  },
);

export { apiService };
