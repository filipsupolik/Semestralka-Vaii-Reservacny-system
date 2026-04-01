import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutPage from "./pages/LayoutPage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import RestaurantPage from "./pages/RestaurantPage";
import PaymentPage from "./pages/PaymentPage";

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
          showNavigation: true,
        },
      },
      {
        path: "/restaurant",
        element: <RestaurantPage />,
        handle: {
          title: "Restaurants",
          showBack: true,
          showNavigation: false,
        },
      },
      {
        path: "/menu/:name",
        element: <MenuPage />,
        handle: {
          title: "Menu",
          showBack: true,
          showNavigation: false,
        },
      },
      {
        path: "/checkout",
        element: <PaymentPage />,
        handle: {
          title: "Checkout",
          showBack: true,
          showNavigation: false,
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
