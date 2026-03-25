function ShoppingCard({ cart }) {
  return (
    <div className="w-1/4 bg-white shadow-md p-4 h-screen m-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.name}
            className="flex justify-between items-center border-b pb-2"
          >
            <span>
              {item.name} x{item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>
          $
          {cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </span>
      </div>
      <button className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg hover:bg-red-600">
        Checkout
      </button>
    </div>
  );
}

export default ShoppingCard;
