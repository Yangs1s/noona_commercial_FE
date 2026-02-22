import type { ProductType } from "./product.type";

export interface CartItemType {
  productId: ProductType;
  size: string;
  quantity: number;
  _id: string;
}
