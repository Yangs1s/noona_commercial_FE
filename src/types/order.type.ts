export interface CreateOrderType {
  items: {
    productId: string;
    size: string;
    quantity: number;
    price: number;
  }[];
  contact: {
    lastName: string;
    firstName: string;
    phone: string;
  };
  shipTo: {
    address: string;
    city: string;
    zipCode: string;
  };
  totalPrice: number;
}

export interface OrderResponseType {
  data: [];
}
