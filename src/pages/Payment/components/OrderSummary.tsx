import { useSelector } from "react-redux";
import { type RootState } from "@/features/store";
import { calcOrderPricing } from "@/utils/cartUtils";
import PaymentCartEmpty from "./PaymentCartEmpty";
import { Loader2 } from "lucide-react";

interface OrderSummaryProps {
  onSubmit: () => void;
}

const formatPrice = (price: number) => price.toLocaleString("ko-KR") + "원";

const OrderSummary = ({ onSubmit }: OrderSummaryProps) => {
  const { cartItems } = useSelector<RootState, RootState["cart"]>(
    (state) => state.cart,
  );
  const { orderLoading } = useSelector((state: RootState) => state.order);
  const validCartItems = cartItems.filter((item) => item.productId != null);
  const { subtotal, shipping, total } = calcOrderPricing(validCartItems);

  if (validCartItems.length === 0) {
    return <PaymentCartEmpty />;
  }

  return (
    <div className="sticky top-8">
      <h2 className="mb-8 font-serif text-2xl text-black">주문 요약</h2>

      {/* 아이템 리스트 */}
      <div className="mb-6 space-y-4">
        {validCartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-baseline justify-between gap-4"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-black">
                {item.productId.name}
              </p>
              <p className="text-xs text-black/40">
                {item.size} / {item.quantity}개
              </p>
            </div>
            <span className="shrink-0 text-sm text-black">
              {formatPrice(item.productId.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <hr className="mb-5 border-black/10" />

      {/* 소계 / 배송비 */}
      <div className="mb-5 space-y-3">
        <div className="flex justify-between text-sm text-black">
          <span>소계</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-black">
          <span>배송비</span>
          <span>{shipping === 0 ? "무료" : formatPrice(shipping)}</span>
        </div>
      </div>

      <hr className="mb-6 border-black/10" />

      {/* 총 결제 금액 */}
      <div className="mb-10 flex items-baseline justify-between">
        <span className="text-sm font-medium text-black">총 결제 금액</span>
        <span className="text-2xl font-bold text-black">
          {formatPrice(total)}
        </span>
      </div>

      {/* 결제하기 버튼 */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={orderLoading}
        className={`w-full bg-black py-4 text-sm tracking-widest text-white uppercase transition-opacity flex items-center justify-center gap-2 ${
          orderLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
        }`}
      >
        {orderLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {orderLoading ? "처리 중..." : "결제하기"}
      </button>
    </div>
  );
};

export default OrderSummary;
