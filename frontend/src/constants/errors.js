export const BACKEND_MESSAGE_MAP = {
  "User not found": "No account exists with this email address.",
  "Invalid password": "Incorrect password. Please try again.",
  "Account is deactivated":
    "Your account has been deactivated. Please contact support.",
  "Registration failed": "Registration failed. This email may already be in use.",
  "No token provided": "Your session has expired. Please log in again.",
  "Invalid token": "Your session has expired. Please log in again.",
  Forbidden: "You do not have permission to perform this action.",
  "Name, address, description, and categories are required":
    "Please fill in all required fields.",
  "Invalid restaurant id": "This restaurant is no longer available.",
  "Restaurant not found": "This restaurant is no longer available.",
  "Failed to fetch restaurants": "Could not load restaurants. Please try again.",
  "Restaurant deleted": "Restaurant deleted.",
  "Order items are required": "Your order is empty.",
  "Invalid order items": "Some items in your order are no longer available.",
  "Invalid menu items": "Some items in your order are no longer available.",
  "Failed to create order": "Could not place your order. Please try again.",
  "Failed to fetch orders": "Could not load orders. Please try again.",
  "Order not found": "This order no longer exists.",
  "Invalid status": "Invalid order status.",
  "Failed to update order status": "Could not update the order status.",
  "Failed to fetch profile": "Could not load your profile. Please try again.",
  "Service unavailable": "The service is temporarily unavailable. Please try again later.",
};

export const STATUS_FALLBACKS = {
  400: "The request was invalid. Please check your input.",
  401: "Authentication failed. Please check your credentials.",
  403: "You do not have permission to perform this action.",
  404: "The requested resource was not found.",
  409: "This action conflicts with existing data.",
  413: "The uploaded file is too large.",
  500: "Something went wrong on the server. Please try again later.",
  503: "The service is temporarily unavailable. Please try again later.",
};

export const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";

export const NETWORK_ERROR_MESSAGE =
  "Cannot connect to the server. Please check your internet connection.";
