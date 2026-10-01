import React from "react";
import RestaurantCard from "../components/RestaurantCard";
import { useNavigate } from "react-router-dom";
import { useRestaurants } from "../hooks";

const HomePage = () => {
  const navigate = useNavigate();
  const { restaurants, isLoading } = useRestaurants(true);

  const getRestaurantCuisine = (restaurant) => {
    if (restaurant.categories && restaurant.categories.length > 0) {
      return restaurant.categories.map((c) => c.category?.name).filter(Boolean);
    }
    return restaurant.cuisine || [];
  };

  const getRestaurantImage = (restaurant) => {
    if (restaurant.imageUrl) {
      return restaurant.imageUrl;
    }
    return restaurant.image || "https://via.placeholder.com/300";
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-red-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Delicious Food Delivered to Your Doorstep
          </h2>
          <p className="text-lg mb-6">
            Order your favorite meals from the best restaurants in town.
          </p>
          <button
            className="bg-white text-red-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-200"
            onClick={() => navigate("/restaurant")}
          >
            Order Now
          </button>
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Restaurants
          </h3>
          {isLoading ? (
            <div className="text-center text-gray-600">
              Loading restaurants...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {restaurants.slice(0, 3).map((restaurant) => (
                <RestaurantCard
                  key={restaurant.restaurantId || restaurant.id}
                  id={restaurant.restaurantId || restaurant.id}
                  image={getRestaurantImage(restaurant)}
                  name={restaurant.name}
                  cuisine={getRestaurantCuisine(restaurant)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
