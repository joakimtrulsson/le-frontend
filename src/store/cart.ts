import { create } from 'zustand';
import CartProduct from '../types/CartProduct';
import Product from '../types/Product';

interface CartState {
  cartItems: CartProduct[];
  addItemToCart: (item: Product) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addItemToCart: (item) => {
    const itemExists = get().cartItems.find((cartItem) => cartItem.id === item.id);

    if (itemExists) {
      if (typeof itemExists.quantity === 'number') {
        itemExists.quantity++;
      }

      set({ cartItems: [...get().cartItems] });
    } else {
      set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
    }
  },

  increaseQuantity: (productId) => {
    const itemExists = get().cartItems.find((cartItem) => cartItem.id === productId);

    if (itemExists) {
      if (typeof itemExists.quantity === 'number') {
        itemExists.quantity++;
      }

      set({ cartItems: [...get().cartItems] });
    }
  },
  decreaseQuantity: (productId) => {
    const itemExists = get().cartItems.find((cartItem) => cartItem.id === productId);

    if (itemExists) {
      if (typeof itemExists.quantity === 'number') {
        if (itemExists.quantity === 1) {
          const updatedCartItems = get().cartItems.filter(
            (item) => item.id !== productId
          );
          set({ cartItems: updatedCartItems });
        } else {
          itemExists.quantity--;
          set({ cartItems: [...get().cartItems] });
        }
      }
    }
  },
  removeItemFromCart: (productId) => {
    const itemExists = get().cartItems.find((cartItem) => cartItem.id === productId);

    if (itemExists) {
      if (typeof itemExists.quantity === 'number') {
        const updatedCartItems = get().cartItems.filter((item) => item.id !== productId);
        set({ cartItems: updatedCartItems });
      }
    }
  },
}));

export default useCartStore;