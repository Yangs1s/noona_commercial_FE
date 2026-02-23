import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { OrderType } from "@/types/order.type";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderItemProps {
  order: OrderType;
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
        <OrderStatusBadge status={order.status} />
      </div>

      {/* 상품 정보 */}
      <div className="flex items-center justify-between">
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

        {/* 상세 보기 */}
        <Button
          variant="outline"
          size="sm"
          className="text-xs tracking-widest uppercase border-black/20 text-black hover:bg-black hover:text-white transition-colors rounded-none"
        >
          상세 보기
        </Button>
      </div>

      <Separator className="mt-10 bg-black/5" />
    </div>
  );
};

export default OrderItem;
