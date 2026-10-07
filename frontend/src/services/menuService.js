import { apiService } from "./api";

function buildMenuItemFormData({
  name,
  description,
  price,
  categoryId,
  image,
}) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("categoryId", categoryId);
  if (image) {
    formData.append("image", image);
  }
  return formData;
}

export const menuService = {
  async getMenuItems(restaurantId) {
    return apiService.get(`/restaurant/${restaurantId}/menu`);
  },

  async createMenuItem(restaurantId, menuItemData) {
    return apiService.post(
      `/restaurant/${restaurantId}/menu`,
      buildMenuItemFormData(menuItemData),
    );
  },

  async updateMenuItem(restaurantId, menuItemId, menuItemData) {
    return apiService.put(
      `/restaurant/${restaurantId}/menu/${menuItemId}`,
      buildMenuItemFormData(menuItemData),
    );
  },

  async deleteMenuItem(restaurantId, menuItemId) {
    return apiService.delete(`/restaurant/${restaurantId}/menu/${menuItemId}`);
  },

  async getMenuCategories(restaurantId) {
    return apiService.get(`/restaurant/${restaurantId}/categories`);
  },
};
