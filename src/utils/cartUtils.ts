import { type ProductType } from "@/types/product.type";

export const FREE_SHIPPING_THRESHOLD = 30000;
export const SHIPPING_COST = 3000;

interface CartItem {
  productId: ProductType;
  quantity: number;
}

export const calcOrderPricing = (cartItems: CartItem[]) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price ?? 0) * item.quantity,
    0,
  );
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
};
