import { useState, useEffect, useCallback } from "react";
import { orderService } from "../services";

export const useOrders = (restaurantId) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!restaurantId) {
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await orderService.getOrders(restaurantId);
        setOrders(data);
      } catch (err) {
        setError(err.message);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [restaurantId]);

  const updateOrderStatus = useCallback(
    async (orderId, status) => {
      const updated = await orderService.updateOrderStatus(
        restaurantId,
        orderId,
        status,
      );
      setOrders((prev) =>
        prev.map((order) => (order.orderId === orderId ? updated : order)),
      );
    },
    [restaurantId],
  );

  return { orders, isLoading, error, updateOrderStatus };
};
