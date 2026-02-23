import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order.type";

const STATUS_MAP: Record<OrderStatus, { label: string; className: string }> = {
  preparing: {
    label: "주문 확인 중",
    className: "bg-black/5 text-black/50",
  },
  shipping: {
    label: "배송 중",
    className: "bg-black text-white",
  },
  delivered: {
    label: "배송 완료",
    className: "bg-black/5 text-black",
  },
  cancelled: {
    label: "취소됨",
    className: "bg-red-50 text-red-500",
  },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const { label, className } = STATUS_MAP[status] ?? STATUS_MAP.preparing;
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs tracking-widest uppercase font-medium",
        className,
      )}
    >
      {label}
    </span>
  );
};

export default OrderStatusBadge;
