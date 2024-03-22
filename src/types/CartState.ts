import { Product } from './';
import { CartProduct } from './';

export default interface CartState {
  cartItems: CartProduct[];
  addProductToCart: (item: Product) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
  getCartTotalPrice: () => number;
  getCartTotalQuantity: () => number;
  clearCart: () => void;
}
