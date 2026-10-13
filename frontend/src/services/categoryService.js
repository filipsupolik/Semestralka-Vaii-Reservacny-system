import { apiService } from "./api";

export const categoryService = {
  async getAllCategories() {
    return apiService.get("/category");
  },

  async createCategory({ name, image }) {
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }
    return apiService.post("/category", formData);
  },

  async updateCategory(categoryId, { name, image }) {
    const formData = new FormData();
    if (name !== undefined) {
      formData.append("name", name);
    }
    if (image) {
      formData.append("image", image);
    }
    return apiService.put(`/category/${categoryId}`, formData);
  },

  async deleteCategory(categoryId) {
    return apiService.delete(`/category/${categoryId}`);
  },
};
