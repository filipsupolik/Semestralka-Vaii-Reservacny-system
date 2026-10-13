const ORDER_STATUSES = ["PENDING", "PREPARING", "COMPLETED", "CANCELLED"];

function OrderStatusSelect({ value, onChange, className = "" }) {
  return (
    <select
      className={`cursor-pointer rounded-[8px] border border-gray-300 bg-white px-2 py-1 text-sm ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {[...new Set([value, ...ORDER_STATUSES])].map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}

function OrderCard({ order, onStatusChange }) {
  const handleChange = (status) => onStatusChange(order.orderId, status);

  return (
    <div className="rounded-[8px] border-b-2 border-[#b8b8b8] px-[10px] py-[15px] last:border-b-0">
      <div className="flex justify-between items-center">
        <h4>Order #{order.orderId}</h4>
        <OrderStatusSelect
          className="hidden min-[1040px]:block"
          value={order.status}
          onChange={handleChange}
        />
      </div>
      <p className="text-[#615f5f]">
        {order.customer.firstName} {order.customer.lastName} (
        {order.customer.email})
      </p>
      <p className="text-sm text-gray-500">
        {new Date(order.createdAt).toLocaleString()}
      </p>
      <OrderStatusSelect
        className="min-[1040px]:hidden mt-1"
        value={order.status}
        onChange={handleChange}
      />
      <ul className="mt-1">
        {order.orderItems.map((item) => (
          <li
            key={item.orderItemId}
            className="flex justify-between text-sm"
          >
            <span>
              {item.menuItem.name} × {item.quantity}
            </span>
            <span>€{Number(item.price_at_order_time).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-1 text-right font-bold text-red-500">
        €{Number(order.totalPrice).toFixed(2)}
      </p>
    </div>
  );
}

export default OrderCard;
