import { apiService } from './api';

export const authService = {
  async login(email, password) {
    const response = await apiService.post('/auth/login', { email, password });
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userRole', response.role);
      localStorage.setItem('userEmail', response.email);
    }
    
    return response;
  },

  async register(userData) {
    const { firstName, lastName, email, password, phoneNumber, role } = userData;
    const response = await apiService.post('/auth/register', {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
    });
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response;
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  getUserRole() {
    return localStorage.getItem('userRole');
  },

  getUserEmail() {
    return localStorage.getItem('userEmail');
  },

  getToken() {
    return localStorage.getItem('authToken');
  },
};
