import axios from "axios";
import { getUserFriendlyMessage } from "../utils/errorMessages";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors — translate server responses into user-friendly messages
apiService.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const friendlyError = new Error(getUserFriendlyMessage(error));
    friendlyError.status = error.response?.status;
    throw friendlyError;
  },
);

const getImageUrl = (path) => (path ? `${API_BASE_URL}${path}` : null);

export { apiService, API_BASE_URL, getImageUrl };
