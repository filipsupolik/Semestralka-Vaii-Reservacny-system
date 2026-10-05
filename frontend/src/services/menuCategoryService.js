import { apiService } from "./api";

export const menuCategoryService = {
  async getAllMenuItemCategories() {
    return apiService.get(`/menu-categories`);
  },

  async createCategory(name) {
    return apiService.post(`/menu-categories`, { name });
  },
};
