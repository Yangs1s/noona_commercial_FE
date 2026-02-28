import { Clock, Truck, PackageCheck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order.type";

const STATUS_MAP: Record<
  OrderStatus,
  { label: string; className: string; Icon: React.ElementType }
> = {
  preparing: {
    label: "주문 확인 중",
    className: "bg-black/5 text-black/50",
    Icon: Clock,
  },
  shipping: {
    label: "배송 중",
    className: "bg-black text-white",
    Icon: Truck,
  },
  delivered: {
    label: "배송 완료",
    className: "bg-black/5 text-black",
    Icon: PackageCheck,
  },
  cancelled: {
    label: "취소됨",
    className: "bg-red-50 text-red-500",
    Icon: XCircle,
  },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const { label, className, Icon } =
    STATUS_MAP[status] ?? STATUS_MAP.preparing;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs tracking-widest uppercase font-medium",
        className,
      )}
    >
      <Icon size={12} />
      {label}
    </span>
  );
};

export default OrderStatusBadge;
