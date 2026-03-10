import React from "react";
import MenuItemCard from "../components/MenuItemCard";
import RestaurantCard from "../components/RestaurantCard";

const RestaurantPage = () => {
  // Mock data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Italian Bistro",
      cuisine: "Italian",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Sushi Place",
      cuisine: "Japanese",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Burger Joint",
      cuisine: "American",
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div>
      {/* Restaurants Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Choose a Restaurant
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                image={restaurant.image}
                name={restaurant.name}
                cuisine={restaurant.cuisine}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Food Delivery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantPage;
