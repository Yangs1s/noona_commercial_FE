import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "@/features/store";
import type { Product } from "@/types/product.type";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/cartSlice";
import { showToastMessage } from "@/features/common/uiSlice";

interface ProductOptionsProps {
  product: Product;
}

export const ProductOptions = ({ product }: ProductOptionsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // 비로그인 회원은 로그인 페이지로 이동
    if (!user) {
      dispatch(
        showToastMessage({
          message: "로그인이 필요한 서비스입니다",
          status: "error",
        }),
      );
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        size: selectedSize || "",
        quantity: quantity,
      }),
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
    if (selectedSize === size) {
      setSelectedSize(null);
      setQuantity(1);
    }
  };

  const getMaxQuantity = () => {
    return (
      product.stock.find((item) => item.size === selectedSize)?.quantity || 0
    );
  };

  return (
    <div className="flex flex-col px-8 py-16 lg:col-span-4 lg:px-12 lg:py-16">
      {/* SKU */}
      <p className="mb-6 text-xs tracking-widest text-gray-400">
        {product.sku}
      </p>

      {/* 상품명 */}
      <h1 className="mb-4 font-serif text-4xl leading-tight text-black lg:text-5xl">
        {product.name}
      </h1>

      {/* 가격 */}
      <p className="mb-8 text-2xl font-semibold text-black">
        ₩{product.price.toLocaleString()}
      </p>

      {/* 설명 */}
      <div className="mb-12 max-h-[240px] min-h-[120px] overflow-y-auto text-sm leading-relaxed tracking-wide text-gray-600">
        {product.description}
      </div>

      {/* 사이즈 선택 */}
      <div className="mb-8">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-black">
          사이즈 선택
        </h3>
        <div className="flex flex-wrap gap-3">
          {product.stock.map((item) => {
            const isAvailable = item.quantity > 0;
            const isSelected = selectedSize === item.size;
            return (
              <Button
                key={item.size}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => isAvailable && handleSizeChange(item.size)}
                disabled={!isAvailable}
                className={`p-6 tracking-wider ${
                  isSelected
                    ? "border-2 border-black bg-black text-white hover:bg-black/90"
                    : isAvailable
                      ? "border-gray-300 text-black hover:border-black hover:bg-transparent"
                      : "cursor-not-allowed border-gray-200 text-gray-300 line-through"
                }`}
              >
                {item.size}
              </Button>
            );
          })}
        </div>
      </div>

      {/* 수량 선택 */}
      {selectedSize && (
        <div className="mb-8">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-black">
            수량
          </h3>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="h-10 w-10 p-0 border-gray-300 hover:border-black"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="min-w-[40px] text-center text-base font-medium">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setQuantity(Math.min(getMaxQuantity(), quantity + 1))
              }
              disabled={quantity >= getMaxQuantity()}
              className="h-10 w-10 p-0 border-gray-300 hover:border-black"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <span className="ml-2 text-xs text-gray-500">
              (재고: {getMaxQuantity()}개)
            </span>
          </div>
        </div>
      )}

      {/* 장바구니 담기 버튼 */}
      <div className="mt-auto">
        <Button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          size="lg"
          className={`w-full py-8 text-sm font-semibold uppercase tracking-widest ${
            selectedSize
              ? "bg-black text-white hover:bg-black/90"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
        >
          장바구니 담기
        </Button>
      </div>
    </div>
  );
};
