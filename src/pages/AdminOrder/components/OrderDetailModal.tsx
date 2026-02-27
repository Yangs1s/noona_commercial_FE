import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { OrderType, OrderStatus } from "@/types/order.type";

const STATUS_LABEL: Record<OrderStatus, string> = {
  preparing: "결제 완료",
  shipping: "배송 중",
  delivered: "배송 완료",
  cancelled: "취소됨",
};

interface OrderDetailModalProps {
  order: OrderType | null;
  open: boolean;
  onClose: () => void;
}

const OrderDetailModal = ({ order, open, onClose }: OrderDetailModalProps) => {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif font-thin text-xl">
            주문 상세
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 text-sm">
          {/* 주문 기본 정보 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">주문번호</span>
              <span className="font-mono text-xs">{order.orderNum}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">주문 일시</span>
              <span>
                {new Date(order.createdAt).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">배송 상태</span>
              <span>{STATUS_LABEL[order.status]}</span>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* 고객 정보 */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-gray-400">
              고객 정보
            </p>
            <div className="flex justify-between">
              <span className="text-gray-400">이름</span>
              <span>
                {order.contact.lastName}
                {order.contact.firstName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">이메일</span>
              <span>{order.userId?.email ?? "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">연락처</span>
              <span>{order.contact.phone}</span>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* 배송지 */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-gray-400">
              배송지
            </p>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400 shrink-0">주소</span>
              <span className="text-right">
                {order.shipTo.address}, {order.shipTo.city}{" "}
                {order.shipTo.zipCode}
              </span>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* 주문 상품 */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-gray-400">
              주문 상품
            </p>
            {order.items.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {item.productId?.name ?? "상품 정보 없음"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.size} · {item.quantity}개
                  </p>
                </div>
                <span>₩{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <hr className="border-gray-100" />

          {/* 총 금액 */}
          <div className="flex justify-between font-medium">
            <span>총 결제 금액</span>
            <span>₩{order.totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
