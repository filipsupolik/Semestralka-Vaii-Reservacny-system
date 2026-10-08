import { apiService } from "./api";

const SESSION_ALIVE_KEY = "sessionAlive";
const SESSION_EXPIRES_KEY = "sessionExpiresAt";
const SESSION_DURATION = 5 * 60 * 1000;

export const authService = {
  startSession() {
    sessionStorage.setItem(SESSION_ALIVE_KEY, "1");
    sessionStorage.setItem(
      SESSION_EXPIRES_KEY,
      String(Date.now() + SESSION_DURATION),
    );
  },

  validateSession() {
    if (!sessionStorage.getItem(SESSION_ALIVE_KEY)) {
      this.logout();
      return false;
    }
    if (Date.now() > Number(sessionStorage.getItem(SESSION_EXPIRES_KEY))) {
      this.logout();
      return false;
    }
    return true;
  },

  async login(email, password) {
    const response = await apiService.post("/auth/login", { email, password });
    const { loggedUser } = response;

    if (loggedUser?.token) {
      localStorage.setItem("authToken", loggedUser.token);
      localStorage.setItem("userRole", loggedUser.user.role);
      localStorage.setItem("userEmail", loggedUser.user.email);
      this.startSession();
    }

    return loggedUser;
  },

  async register(userData) {
    const { firstName, lastName, email, password, phoneNumber, role } =
      userData;
    const response = await apiService.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
    });

    if (response.token) {
      localStorage.setItem("authToken", response.token);
      this.startSession();
    }

    return response;
  },

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem(SESSION_ALIVE_KEY);
    sessionStorage.removeItem(SESSION_EXPIRES_KEY);
  },

  isAuthenticated() {
    return !!localStorage.getItem("authToken");
  },

  getUserRole() {
    return localStorage.getItem("userRole");
  },

  getUserEmail() {
    return localStorage.getItem("userEmail");
  },

  getToken() {
    return localStorage.getItem("authToken");
  },
};
