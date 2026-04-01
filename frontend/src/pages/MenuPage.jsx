import React, { useState } from "react";
import {
  ShoppingCard,
  MenuItemCard,
  MenuPageNavigation,
} from "../components/index";
import { useParams } from "react-router-dom";

function MenuPage() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name,
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: item.quantity }
            : cartItem,
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  // Updated mock data for menu items
  const menuItems = [
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Classic Italian pizza with fresh tomatoes and mozzarella.",
      price: "8.99",
      image: "https://via.placeholder.com/300",
      category: "Main Courses",
    },
    {
      id: 2,
      name: "Spaghetti Carbonara",
      description: "Creamy pasta with pancetta and parmesan.",
      price: "10.99",
      image: "https://via.placeholder.com/300",
      category: "Main Courses",
    },
    {
      id: 3,
      name: "Tiramisu",
      description: "Traditional Italian dessert with coffee and mascarpone.",
      price: "5.99",
      image: "https://via.placeholder.com/300",
      category: "Desserts",
    },
  ];

  const menuCategories = [
    { id: "appetizers", name: "Appetizers" },
    { id: "main-courses", name: "Main Courses" },
    { id: "desserts", name: "Desserts" },
    { id: "beverages", name: "Beverages" },
    { id: "salads", name: "Salads" },
    { id: "soups", name: "Soups" },
    { id: "grills", name: "Grills" },
    { id: "seafood", name: "Seafood" },
    { id: "vegan", name: "Vegan" },
    { id: "kids", name: "Kids Menu" },
  ];

  const title = useParams();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-row gap-4">
        {/* Menu Section */}
        <section className="w-3/4 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {title.name}
            </h2>
            <MenuPageNavigation menuCategories={menuCategories} />

            {menuCategories.map((category) => (
              <div key={category.id} id={category.id} className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {menuItems
                    .filter((item) => item.category === category.name)
                    .map((item) => (
                      <MenuItemCard
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Shopping Cart Section */}
        <ShoppingCard cart={cart} />
      </div>
    </div>
  );
}

export default MenuPage;
