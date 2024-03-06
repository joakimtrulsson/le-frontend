export default interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  cardName: string;
  paymentId: string;
  amount: number;
  orderDetails: string;
  status: string;
  createdAt: string;
}
