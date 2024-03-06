import { Product } from './';

type CartProduct = Product & {
  quantity: number;
};

export default CartProduct;
