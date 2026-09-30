import { apiService } from './api';

export const restaurantService = {
  async getTopRestaurants() {
    return apiService.get('/restaurant');
  },

  async searchRestaurants(filters) {
    const queryParams = new URLSearchParams();
    
    if (filters.name) {
      queryParams.append('name', filters.name);
    }
    
    if (filters.category) {
      queryParams.append('category', filters.category);
    }
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/restaurant?${queryString}` : '/restaurant';
    
    return apiService.get(endpoint);
  },

  async createRestaurant(restaurantData) {
    const { name, address, description, categories } = restaurantData;
    return apiService.post('/restaurant', {
      name,
      address,
      description,
      categories,
    });
  },
};
