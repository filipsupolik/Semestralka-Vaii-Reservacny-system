import React from "react";
import MenuItemCard from "../components/MenuItemCard";
import { FaSearch } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const MenuPage = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  // Mock data for menu items
  const menuItems = [
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Classic Italian pizza with fresh tomatoes and mozzarella.",
      price: "8.99",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Spaghetti Carbonara",
      description: "Creamy pasta with pancetta and parmesan.",
      price: "10.99",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Tiramisu",
      description: "Traditional Italian dessert with coffee and mascarpone.",
      price: "5.99",
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header
        className="bg-white shadow-md shadow-gray-300 relative z-10"
        style={{ marginBottom: "-20px" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            className="text-red-500 text-2xl font-bold mr-4"
            onClick={() => navigate(-1)}
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-red-500">Restaurant Menu</h1>
        </div>
      </header>

      <div className="flex flex-row-reverse">
        {/* Shopping Cart Section */}
        <aside className="w-1/4 bg-white shadow-md p-4 h-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Shopping Cart
          </h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b pb-2">
              <span>Item 1</span>
              <span>$8.99</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span>Item 2</span>
              <span>$10.99</span>
            </li>
          </ul>
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>$19.98</span>
            </div>
            <button className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg hover:bg-red-600">
              Checkout
            </button>
          </div>
        </aside>

        {/* Menu Section */}
        <section className="w-3/4 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Menu Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Food Delivery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MenuPage;
