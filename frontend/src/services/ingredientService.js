import { apiService } from "./api";

export const ingredientService = {
  async getAllIngredients() {
    return apiService.get("/ingredients");
  },

  async createIngredient(name) {
    return apiService.post("/ingredients", { name });
  },
};
