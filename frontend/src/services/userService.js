import { apiService } from "./api";

export const userService = {
  async getUsers() {
    return apiService.get("/users");
  },

  async updateUser(userId, data) {
    return apiService.put(`/users/${userId}`, data);
  },
};
