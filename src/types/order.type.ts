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

export interface OrderItemType {
  productId: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
  size: string;
  price: number;
  _id: string;
}

export type OrderStatus = "preparing" | "shipping" | "delivered" | "cancelled";

export interface OrderType {
  _id: string;
  orderNum: string;
  items: OrderItemType[];
  totalPrice: number;
  status: OrderStatus;
  userId?: { email: string };
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
  createdAt: string;
}

export interface OrderResponseType {
  data: OrderType[];
}
