import React from "react";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ image, name, cuisine }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={() => navigate("/menu")}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-bold text-gray-800">{name}</h4>
        <p className="text-gray-600">{cuisine}</p>
      </div>
    </div>
  );
}

export default RestaurantCard;
