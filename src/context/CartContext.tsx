/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from 'react';
import CartProduct from '../types/CartProduct';
import Product from '../types/Product';

import { CartState } from '../types/';

export const CartContext = createContext<CartState>({
  cartItems: [],
  addProductToCart: (_item) => {},
  increaseQuantity: (_productId) => {},
  decreaseQuantity: (_productId) => {},
  removeItemFromCart: (_productId) => {},
  getCartTotalPrice: () => 0,
  getCartTotalQuantity: () => 0,
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const addProductToCart = (item: Product) => {
    const itemExists = cartItems.find((cartItem) => cartItem.id === item.id);

    if (itemExists) {
      if (typeof itemExists.quantity === 'number') {
        itemExists.quantity++;
      }
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const increaseQuantity = (productId: string) => {
    const itemExists = cartItems.find((cartItem) => cartItem.id === productId);

    if (itemExists) {
      if (typeof itemExists.quantity === 'number') {
        itemExists.quantity++;
      }

      setCartItems([...cartItems]);
    }
  };

  const decreaseQuantity = (productId: string) => {
    const itemExists = cartItems.find((cartItem) => cartItem.id === productId);

    if (itemExists) {
      if (typeof itemExists.quantity === 'number') {
        if (itemExists.quantity === 1) {
          const updatedCartItems = cartItems.filter((item) => item.id !== productId);
          setCartItems(updatedCartItems);
        } else {
          itemExists.quantity--;
          setCartItems([...cartItems]);
        }
      }
    }
  };

  const removeItemFromCart = (productId: string) => {
    const itemExists = cartItems.find((cartItem) => cartItem.id === productId);

    if (itemExists) {
      if (typeof itemExists.quantity === 'number') {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
      }
    }
  };

  const getCartTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
    getCartTotalPrice,
    getCartTotalQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
