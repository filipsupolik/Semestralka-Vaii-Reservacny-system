import { apiService } from "./api";

export const orderService = {
  async getOrders(restaurantId) {
    return apiService.get(`/restaurant/${restaurantId}/orders`);
  },

  async updateOrderStatus(restaurantId, orderId, status) {
    return apiService.put(`/restaurant/${restaurantId}/orders/${orderId}`, {
      status,
    });
  },
};
