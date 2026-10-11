import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AuthProvider,
  CartProvider,
  DashboardProvider,
  MenuProvider,
} from "./context";
import LayoutPage from "./pages/LayoutPage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import RestaurantPage from "./pages/RestaurantPage";
import PaymentPage from "./pages/PaymentPage";
import ProfilePage from "./pages/ProfilePage";
import OwnerDashboardPage from "./pages/OwnerDashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        handle: {
          title: "Food Delivery",
          showBack: false,
        },
      },
      {
        path: "/restaurant",
        element: <RestaurantPage />,
        handle: {
          title: "Restaurants",
          showBack: true,
        },
      },
      {
        path: "/menu/:id",
        element: <MenuPage />,
        handle: {
          title: "Menu",
          showBack: true,
        },
      },
      {
        path: "/checkout",
        element: <PaymentPage />,
        handle: {
          title: "Checkout",
          showBack: true,
        },
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        handle: {
          title: "Profile",
          showBack: true,
        },
      },
      {
        path: "/owner-dashboard",
        element: <OwnerDashboardPage />,
        handle: {
          title: "Owner Dashboard",
          showBack: true,
          showHome: true,
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <DashboardProvider>
          <MenuProvider>
            <RouterProvider router={router} />
          </MenuProvider>
        </DashboardProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
