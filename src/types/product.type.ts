export interface ProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string[];
  stock: { size: string; quantity: number }[];
  status: string;
  sku: string;
}
