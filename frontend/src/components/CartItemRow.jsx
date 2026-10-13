function CartItemRow({ item, onIncrease, onDecrease }) {
  const quantityButtonClass =
    "w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 font-bold";

  return (
    <li className="flex justify-between items-center border-b pb-2">
      <span className="min-w-0 flex-1">{item.name}</span>
      <div className="flex items-center gap-2 mx-3">
        <button
          className={quantityButtonClass}
          onClick={() => onDecrease(item)}
          aria-label={`Decrease ${item.name}`}
        >
          −
        </button>
        <span className="w-6 text-center">{item.quantity}</span>
        <button
          className={quantityButtonClass}
          onClick={() => onIncrease(item)}
          aria-label={`Increase ${item.name}`}
        >
          +
        </button>
      </div>
      <span>€{(item.price * item.quantity).toFixed(2)}</span>
    </li>
  );
}

export default CartItemRow;
