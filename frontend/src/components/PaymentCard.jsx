import React from "react";
import PropTypes from "prop-types";

const PaymentCard = ({
  restaurantName,
  logo,
  cartItems,
  subtotal,
  deliveryFee,
  serviceFee,
  total,
  onOrder,
  disabled,
}) => {
  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-md max-w-md mx-4 sm:mx-auto mt-10 sm:mt-20">
      <h2 className="text-xl font-bold mb-4">Zhrnutie objednávky</h2>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{restaurantName}</h3>
        <img
          src={logo}
          alt="Restaurant Logo"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <ul className="space-y-1 border-t border-gray-700 pt-4">
        {cartItems.map((item) => (
          <li
            key={item.menuItemId ?? item.name}
            className="flex justify-between"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>€ {(Number(item.price) * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-700 pt-4 mt-4">
        <div className="flex justify-between mb-2">
          <span>Medzisúčet</span>
          <span>€ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Poplatok za doručenie</span>
          <span>€ {deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Poplatok za služby</span>
          <span>€ {serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Súčet</span>
          <span>€ {total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={onOrder}
        disabled={disabled}
        className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg w-full mt-4"
      >
        Objednať a zaplatiť
      </button>
    </div>
  );
};

PaymentCard.propTypes = {
  restaurantName: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      menuItemId: PropTypes.number,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  subtotal: PropTypes.number.isRequired,
  deliveryFee: PropTypes.number.isRequired,
  serviceFee: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onOrder: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default PaymentCard;
