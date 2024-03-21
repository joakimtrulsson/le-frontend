import Product from './Product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default ProductCardProps;
