import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type OrderStatus = "preparing" | "shipping" | "delivered" | "cancelled";

export interface AdminOrder {
  orderId: string;
  customerName: string;
  email: string;
  createdAt: Date;
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
}

const STATUS_OPTIONS: { label: string; value: OrderStatus }[] = [
  { label: "결제 완료", value: "preparing" },
  { label: "배송 중", value: "shipping" },
  { label: "배송 완료", value: "delivered" },
  { label: "취소됨", value: "cancelled" },
];

const STATUS_BADGE: Record<OrderStatus, string> = {
  preparing: "bg-gray-100 text-gray-500",
  shipping: "bg-black text-white",
  delivered: "bg-gray-100 text-black",
  cancelled: "bg-red-50 text-red-400",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  preparing: "결제 완료",
  shipping: "배송 중",
  delivered: "배송 완료",
  cancelled: "취소됨",
};

interface OrderTableProps {
  orders: AdminOrder[];
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

const OrderTable = ({ orders, onStatusChange }: OrderTableProps) => {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[14%] text-gray-500">주문 번호</TableHead>
          <TableHead className="w-[18%] text-gray-500">고객명</TableHead>
          <TableHead className="w-[14%] text-gray-500">주문 일시</TableHead>
          <TableHead className="w-[12%] text-gray-500">결제 금액</TableHead>
          <TableHead className="w-[12%] text-gray-500">결제 수단</TableHead>
          <TableHead className="w-[20%] text-gray-500">배송 상태</TableHead>
          <TableHead className="w-[10%] text-gray-500">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="py-16 text-center text-sm tracking-widest text-gray-300"
            >
              주문 내역이 없습니다
            </TableCell>
          </TableRow>
        ) : (
          orders.map((order) => (
            <TableRow className="h-16" key={order.orderId}>
              <TableCell className="font-mono text-xs text-gray-600 truncate">
                {order.orderId}
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm font-medium truncate">{order.customerName}</p>
                  <p className="text-xs text-gray-400 truncate">{order.email}</p>
                </div>
              </TableCell>
              <TableCell className="text-xs text-gray-500">
                {order.createdAt.toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
                <br />
                <span className="text-gray-400">
                  {order.createdAt.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </TableCell>
              <TableCell className="text-sm">
                ₩{order.totalAmount.toLocaleString()}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {order.paymentMethod}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-block px-2 py-1 text-[10px] font-medium tracking-widest uppercase rounded-sm",
                      STATUS_BADGE[order.status],
                    )}
                  >
                    {STATUS_LABEL[order.status]}
                  </span>
                  <Select
                    value={order.status}
                    onValueChange={(v) => onStatusChange(order.orderId, v as OrderStatus)}
                  >
                    <SelectTrigger size="sm" className="w-28 text-xs h-7">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TableCell>
              <TableCell>
                <button className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer">
                  <Eye size={16} />
                </button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
