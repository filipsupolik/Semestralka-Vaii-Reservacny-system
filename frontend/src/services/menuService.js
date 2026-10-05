import { apiService } from "./api";

export const menuService = {
  async getMenuItems(restaurantId) {
    return apiService.get(`/restaurant/${restaurantId}/menu`);
  },

  async createMenuItem(restaurantId, menuItemData) {
    return apiService.post(`/restaurant/${restaurantId}/menu`, menuItemData);
  },

  async updateMenuItem(restaurantId, menuItemId, menuItemData) {
    return apiService.put(
      `/restaurant/${restaurantId}/menu/${menuItemId}`,
      menuItemData,
    );
  },

  async deleteMenuItem(restaurantId, menuItemId) {
    return apiService.delete(`/restaurant/${restaurantId}/menu/${menuItemId}`);
  },

  async getMenuCategories(restaurantId) {
    return apiService.get(`/restaurant/${restaurantId}/menu-categories`);
  },

  async createMenuCategory(restaurantId, categoryData) {
    return apiService.post(
      `/restaurant/${restaurantId}/menu-categories`,
      categoryData,
    );
  },
};
