import { apiService } from "./api";

export const restaurantService = {
  async getTopRestaurants() {
    return apiService.get("/restaurant");
  },

  async searchRestaurants(filters) {
    const queryParams = new URLSearchParams();

    if (filters.name) {
      queryParams.append("name", filters.name);
    }

    if (filters.category) {
      queryParams.append("category", filters.category);
    }

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/restaurant?${queryString}` : "/restaurant";

    return apiService.get(endpoint);
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

    return apiService.post("/restaurant", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
