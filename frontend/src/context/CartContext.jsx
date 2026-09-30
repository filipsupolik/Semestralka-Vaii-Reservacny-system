import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartsByRestaurant, setCartsByRestaurant] = useState({});

  const addToCart = (restaurantId, item) => {
    setCartsByRestaurant((prevCarts) => {
      const existingCart = prevCarts[restaurantId] || [];
      const existingItem = existingCart.find(
        (cartItem) => cartItem.name === item.name,
      );

      if (existingItem) {
        return {
          ...prevCarts,
          [restaurantId]: prevCarts[restaurantId].map((cartItem) =>
            cartItem.name === item.name
              ? { ...cartItem, quantity: (cartItem.quantity || 1) + (item.quantity || 1) }
              : cartItem,
          ),
        };
      } else {
        return {
          ...prevCarts,
          [restaurantId]: [...existingCart, { ...item, quantity: item.quantity || 1 }],
        };
      }
    });
  };

  const updateCartItem = (restaurantId, itemName, quantity) => {
    setCartsByRestaurant((prevCarts) => ({
      ...prevCarts,
      [restaurantId]: prevCarts[restaurantId].map((item) =>
        item.name === itemName ? { ...item, quantity } : item,
      ),
    }));
  };

  const removeFromCart = (restaurantId, itemName) => {
    setCartsByRestaurant((prevCarts) => ({
      ...prevCarts,
      [restaurantId]: prevCarts[restaurantId].filter(
        (item) => item.name !== itemName,
      ),
    }));
  };

  const clearCart = (restaurantId) => {
    setCartsByRestaurant((prevCarts) => {
      const newCarts = { ...prevCarts };
      delete newCarts[restaurantId];
      return newCarts;
    });
  };

  const getCart = (restaurantId) => {
    return cartsByRestaurant[restaurantId] || [];
  };

  const getCartTotal = (restaurantId) => {
    const cart = getCart(restaurantId);
    return cart.reduce(
      (total, item) => total + (parseFloat(item.price) || 0) * (item.quantity || 1),
      0,
    );
  };

  const getCartItemCount = (restaurantId) => {
    const cart = getCart(restaurantId);
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  const value = {
    cartsByRestaurant,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCart,
    getCartTotal,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
