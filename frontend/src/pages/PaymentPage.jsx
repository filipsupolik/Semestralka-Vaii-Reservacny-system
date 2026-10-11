import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaymentCard } from "../components/index";
import { useAuth, useCart } from "../context";
import { orderService, restaurantService } from "../services";
import { API_BASE_URL } from "../services/api";

const PLACEHOLDER_LOGO = "https://via.placeholder.com/50";
const DELIVERY_FEE = 3.5;
const SERVICE_FEE = 1.5;

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantId = location.state?.restaurantId;
  const { getCart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cart = restaurantId ? getCart(restaurantId) : [];
  const subtotal = restaurantId ? getCartTotal(restaurantId) : 0;
  const total = subtotal + DELIVERY_FEE + SERVICE_FEE;

  useEffect(() => {
    if (!restaurantId) return;
    restaurantService
      .getRestaurantById(restaurantId)
      .then(setRestaurant)
      .catch((err) => setError(err.message));
  }, [restaurantId]);

  const handleOrder = async () => {
    if (!isAuthenticated) {
      setError("Please log in to place your order");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await orderService.createOrder(
        restaurantId,
        cart.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        })),
      );
      clearCart(restaurantId);
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!restaurantId || cart.length === 0) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600 text-lg">Your cart is empty</p>
        <button
          className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          onClick={() => navigate("/restaurant")}
        >
          Browse restaurants
        </button>
      </div>
    );
  }

  return (
    <div>
      <PaymentCard
        restaurantName={restaurant?.name ?? ""}
        logo={
          restaurant?.imageUrl
            ? `${API_BASE_URL}${restaurant.imageUrl}`
            : PLACEHOLDER_LOGO
        }
        cartItems={cart}
        subtotal={subtotal}
        deliveryFee={DELIVERY_FEE}
        serviceFee={SERVICE_FEE}
        total={total}
        onOrder={handleOrder}
        disabled={isSubmitting}
      />
      {!isAuthenticated && (
        <p className="text-center text-gray-600 mt-4">
          Please log in to place your order
        </p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default PaymentPage;
