import { Separator } from "@/components/ui/separator";
import type { OrderType, OrderStatus } from "@/types/order.type";

interface OrderItemProps {
  order: OrderType;
}

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: "preparing", label: "결제 완료" },
  { key: "shipping", label: "배송 중" },
  { key: "delivered", label: "배송 완료" },
];

function OrderStatusSteps({ status }: { status: OrderStatus }) {
  if (status === "cancelled") {
    return (
      <p className="text-xs tracking-widest uppercase text-red-400">
        취소됨
      </p>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, index) => {
        const isDone = index <= currentIndex;
        const isLast = index === STEPS.length - 1;

        return (
          <div key={step.key} className="flex items-center">
            {/* 스텝 */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  isDone ? "bg-black" : "bg-black/15"
                }`}
              />
              <span
                className={`text-[10px] tracking-widest whitespace-nowrap ${
                  isDone ? "text-black" : "text-black/30"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* 연결선 */}
            {!isLast && (
              <div
                className={`w-10 h-px mb-4 mx-1 ${
                  index < currentIndex ? "bg-black" : "bg-black/15"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const OrderItem = ({ order }: OrderItemProps) => {
  const representative = order?.items[0];
  const remainingCount = order.items.length - 1;

  const formattedDate = new Date(order.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-10">
      {/* 주문 헤더 */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-6">
          <span className="text-xs tracking-widest uppercase text-black/40">
            {formattedDate}
          </span>
          <span className="text-xs tracking-widest text-black/30">
            주문번호 {order.orderNum}
          </span>
        </div>
      </div>

      {/* 상품 정보 + 상태 */}
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          {/* 썸네일 */}
          <div className="w-20 h-20 flex-shrink-0 bg-black/5 overflow-hidden">
            <img
              src={representative.productId.image}
              alt={representative.productId.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 상품 정보 텍스트 */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-black">
              {representative.productId.name}
              {remainingCount > 0 && (
                <span className="text-black/40 font-normal ml-2">
                  외 {remainingCount}건
                </span>
              )}
            </p>
            <p className="text-xs text-black/40 tracking-wide">
              {representative.size} / {representative.quantity}개
            </p>
            <p className="text-sm text-black">
              ₩{order.totalPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* 배송 상태 스텝 */}
        <OrderStatusSteps status={order.status} />
      </div>

      <Separator className="mt-10 bg-black/5" />
    </div>
  );
};

export default OrderItem;
