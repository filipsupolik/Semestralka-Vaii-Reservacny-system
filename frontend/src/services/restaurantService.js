import { apiService } from "./api";

export const restaurantService = {
  async getTopRestaurants() {
    return apiService.get("/restaurant/top");
  },

  async getRestaurants({ page, pageSize, name, category } = {}) {
    const queryParams = new URLSearchParams();

    if (page) {
      queryParams.append("page", page);
    }

    if (pageSize) {
      queryParams.append("pageSize", pageSize);
    }

    if (name) {
      queryParams.append("name", name);
    }

    if (category) {
      queryParams.append("category", category);
    }

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/restaurant?${queryString}` : "/restaurant";

    return apiService.get(endpoint);
  },

  async getMyRestaurants() {
    return apiService.get("/restaurant/owned-restaurants");
  },

  async getRestaurantById(restaurantId) {
    return apiService.get(`/restaurant/${restaurantId}`);
  },

  async createRestaurant(restaurantData) {
    const { name, address, description, categories, image } = restaurantData;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("categories", JSON.stringify(categories));

    if (image) {
      formData.append("image", image);
    }
    return apiService.post("/restaurant", formData);
  },

  async updateRestaurant(restaurantId, restaurantData) {
    const { name, address, description, categories, image } = restaurantData;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("categories", JSON.stringify(categories));

    if (image) {
      formData.append("image", image);
    }
    return apiService.put(`/restaurant/${restaurantId}`, formData);
  },

  async deleteRestaurant(restaurantId) {
    return apiService.delete(`/restaurant/${restaurantId}`);
  },
};
