import React from "react";

const MenuItemCard = ({ image, name, description, price }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-bold text-gray-800">{name}</h4>
        <p className="text-gray-600">{description}</p>
        <p className="text-red-500 font-bold mt-2">${price}</p>
      </div>
    </div>
  );
};

export default MenuItemCard;
