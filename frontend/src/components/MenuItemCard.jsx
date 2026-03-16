import React, { useState } from "react";

function MenuItemCard({ image, name, description, price, onAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  const handleAddClick = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onAddToCart) {
      onAddToCart({ name, price, quantity: newQuantity });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative">
        <button
          onClick={handleAddClick}
          className="w-10 h-10 absolute top-2 right-2 bg-slate-900 text-white text-base text-center rounded-full p-2"
        >
          {quantity === 0 ? "+" : quantity}
        </button>
      </div>
      <div className="p-4 flex items-center">
        <div>
          <h4 className="text-lg font-bold text-gray-800">{name}</h4>
          <p className="text-gray-600">{description}</p>
          <p className="text-red-500 font-bold mt-2">${price}</p>
        </div>
        <img
          src={image}
          alt={name}
          className="w-16 h-16 object-cover rounded-full ml-4 mr-4"
        />
      </div>
    </div>
  );
}

export default MenuItemCard;
