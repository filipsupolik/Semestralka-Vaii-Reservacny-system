import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context";

function ShoppingCard({ cart, restaurantId }) {
  const navigate = useNavigate();
  const { updateCartItem, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const total = cart.reduce(
    (amount, item) => amount + item.price * item.quantity,
    0,
  );

  const handleNavigate = () => {
    if (total > 0) {
      navigate("/checkout", { state: { restaurantId } });
    }
  };

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(restaurantId, item.name);
    } else {
      updateCartItem(restaurantId, item.name, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    updateCartItem(restaurantId, item.name, item.quantity + 1);
  };

  const cartList = (
    <ul className="space-y-4">
      {cart.map((item) => (
        <li
          key={item.name}
          className="flex justify-between items-center border-b pb-2"
        >
          <span className="min-w-0 flex-1">{item.name}</span>
          <div className="flex items-center gap-2 mx-3">
            <button
              className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 font-bold"
              onClick={() => handleDecrease(item)}
              aria-label={`Decrease ${item.name}`}
            >
              −
            </button>
            <span className="w-6 text-center">{item.quantity}</span>
            <button
              className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 font-bold"
              onClick={() => handleIncrease(item)}
              aria-label={`Increase ${item.name}`}
            >
              +
            </button>
          </div>
          <span>€{(item.price * item.quantity).toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block lg:w-1/4 bg-white shadow-md p-4 lg:h-screen m-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Basket is empty</p>
        ) : (
          cartList
        )}
        <div className="flex justify-between font-bold mt-4">
          <span>Total</span>
          <span>€{total.toFixed(2)}</span>
        </div>
        <button
          className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={handleNavigate}
          disabled={total <= 0}
        >
          Checkout
        </button>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.15)]">
        {isOpen && cart.length > 0 && (
          <div className="max-h-64 overflow-y-auto border-b border-gray-200 px-4 py-4">
            {cartList}
          </div>
        )}
        <div className="flex items-center justify-between gap-4 p-4">
          <button
            className="text-gray-700 font-semibold hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setIsOpen((open) => !open)}
            disabled={cart.length === 0}
          >
            {cart.length === 0
              ? "Basket is empty"
              : isOpen
                ? "Hide basket"
                : "View full basket"}
          </button>
          <span className="font-bold text-lg">€{total.toFixed(2)}</span>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
            onClick={handleNavigate}
            disabled={total <= 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default ShoppingCard;
