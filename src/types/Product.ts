export default interface Product {
  id: string;
  productTitle: string;
  description: string;
  price: number;
  priceUnit: string;
  productImage: {
    url: string;
  };
  discountPrice: number;
  recommendedProduct: boolean;
}
