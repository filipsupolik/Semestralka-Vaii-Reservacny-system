import { apiService } from './api';

export const menuService = {
  async getMenuItems(restaurantId) {
    // This endpoint is not yet implemented in backend
    // Placeholder for future implementation
    return apiService.get(`/restaurant/${restaurantId}/menu`);
  },

  async createMenuItem(restaurantId, menuItemData) {
    // This endpoint is not yet implemented in backend
    // Placeholder for future implementation
    return apiService.post(`/restaurant/${restaurantId}/menu`, menuItemData);
  },

  async updateMenuItem(restaurantId, menuItemId, menuItemData) {
    // This endpoint is not yet implemented in backend
    // Placeholder for future implementation
    return apiService.put(`/restaurant/${restaurantId}/menu/${menuItemId}`, menuItemData);
  },
};
