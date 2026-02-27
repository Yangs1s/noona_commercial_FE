import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ProductType } from "@/types/product.type";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/features/store";
import { deleteCart, updateCart } from "@/features/cart/cartSlice";

interface CartItemProps {
  item: ProductType;
  size: string;
  quantity: number;
  cartItemId: string;
}

export const CartItem = ({
  item,
  size,
  quantity,
  cartItemId,
}: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const maxQuantity = item.stock.find((s) => s.size === size)?.quantity ?? 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(
      updateCart({
        productId: item._id,
        size,
        quantity: newQuantity,
      }),
    );
  };

  const handleRemove = async () => {
    // TODO: deleteCart action 추가 필요
    try {
      await dispatch(deleteCart(cartItemId)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-6">
      {/* 썸네일 이미지 */}
      <div className="h-32 w-32 flex-shrink-0 overflow-hidden bg-[#F9F9F9]">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* 상품 정보 */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="font-serif text-xl text-black">{item.name}</h3>
              <p className="mt-1 text-xs tracking-widest text-gray-400">
                {item.sku}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-8 w-8 text-gray-400 hover:bg-transparent hover:text-black"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p className="text-black">
              사이즈: <span className="font-medium">{size}</span>
            </p>
            {maxQuantity === 0 && (
              <p className="text-xs text-red-400">
                품절 — 장바구니에서 제거해주세요
              </p>
            )}
            {maxQuantity > 0 && quantity > maxQuantity && (
              <p className="text-xs text-red-400">
                재고가 {maxQuantity}개 남았습니다. 수량을 조정해주세요
              </p>
            )}
          </div>
        </div>

        {/* 수량 조절 & 가격 */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="h-8 w-8"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="min-w-[30px] text-center text-sm font-medium">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= maxQuantity}
              className="h-8 w-8"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <p className="text-lg font-semibold text-black">
            ₩{(item.price * quantity).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
