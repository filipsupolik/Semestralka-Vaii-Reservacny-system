import { apiService } from "./api";

export const menuCategoryService = {
  async getMenuCategories(restaurantId) {
    return apiService.get(`/restaurant/${restaurantId}/menu-categories`);
  },
};
