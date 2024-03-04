import Product from './Product';
import CartProduct from './CartProduct';

export default interface CartState {
  cartItems: CartProduct[];
  addItemToCart: (item: Product) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
}
