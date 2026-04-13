import { PaymentCard } from "../components/index";

function PaymentPage() {
  const mockData = {
    restaurantName: "Pizzeria Bella Italia",
    logo: "https://via.placeholder.com/50",
    items: 3,
    subtotal: 25.99,
    deliveryFee: 3.5,
    serviceFee: 1.5,
    total: 30.99,
    onOrder: () => alert("Order placed successfully!"),
  };

  return (
    <div>
      <PaymentCard {...mockData} />
    </div>
  );
}

export default PaymentPage;
