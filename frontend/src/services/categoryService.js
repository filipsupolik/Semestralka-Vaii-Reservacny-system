import { apiService } from './api';

export const categoryService = {
  async getAllCategories() {
    return apiService.get('/category');
  },
};
