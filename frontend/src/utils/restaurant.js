import { getImageUrl } from "../services/api";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300";

export const getRestaurantCuisine = (restaurant) => {
  if (restaurant.categories && restaurant.categories.length > 0) {
    return restaurant.categories.map((c) => c.category?.name).filter(Boolean);
  }
  return restaurant.cuisine || [];
};

export const getRestaurantImage = (restaurant) =>
  getImageUrl(restaurant.imageUrl) ?? restaurant.image ?? PLACEHOLDER_IMAGE;
