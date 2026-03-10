import React from "react";
import RestaurantCard from "../components/RestaurantCard";

const HomePage = () => {
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
          <button className="bg-white text-red-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-200">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RestaurantCard
              image="https://via.placeholder.com/300"
              name="Restaurant Name"
              cuisine="Cuisine Type"
            />
            <RestaurantCard
              image="https://via.placeholder.com/300"
              name="Restaurant Name"
              cuisine="Cuisine Type"
            />
            <RestaurantCard
              image="https://via.placeholder.com/300"
              name="Restaurant Name"
              cuisine="Cuisine Type"
            />
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

export default HomePage;
