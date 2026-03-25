import React, { useState } from "react";
import MenuItemDialog from "./MenuItemDialog";

function MenuItemCard({
  image,
  name,
  description,
  price,
  onAddToCart,
  onQuantityChange,
}) {
  const [quantity, setQuantity] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddToCart = (item, newQuantity) => {
    setQuantity(newQuantity);
    if (onAddToCart) {
      onAddToCart({
        name: item.title,
        price: item.price,
        quantity: newQuantity,
      });
    }
    if (onQuantityChange) {
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
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
      <MenuItemDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        item={{ title: name, image, price, ingredients: [description] }}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default MenuItemCard;
