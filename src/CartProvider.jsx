import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setIsCartOpen(true);
  };

  const toggleCart = () => {
    console.log("toggled");
    setIsCartOpen(!isCartOpen);
    console.log("after toggling: ",isCartOpen);
  };
  
  return (
    <CartContext.Provider value={{ cartItems, addToCart, toggleCart, isCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

