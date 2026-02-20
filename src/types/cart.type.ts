export interface Cart {
  _id: string;
  userId: string;

  items: {
    productId: string;
    size: string;
    quantity: number;
  }[];
}
