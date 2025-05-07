import React, { createContext, useContext, useState, useEffect } from 'react';
import { LOGOUT_EVENT } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const handleLogout = () => {
      clearCart();
    };
    window.addEventListener(LOGOUT_EVENT, handleLogout);
    return () => {
      window.removeEventListener(LOGOUT_EVENT, handleLogout);
    };
  }, []);

  const addToCart = (newItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const selectItemsForCheckout = (items) => {
    setSelectedItems(items);
  };

  const clearSelectedItems = () => {
    setSelectedItems([]);
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      selectedItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      selectItemsForCheckout,
      clearSelectedItems,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};