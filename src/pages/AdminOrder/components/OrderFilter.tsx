import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export type OrderStatusFilter = "all" | "preparing" | "shipping" | "delivered" | "cancelled";

const STATUS_OPTIONS: { label: string; value: OrderStatusFilter }[] = [
  { label: "전체", value: "all" },
  { label: "결제 완료", value: "preparing" },
  { label: "배송 중", value: "shipping" },
  { label: "배송 완료", value: "delivered" },
  { label: "취소됨", value: "cancelled" },
];

interface OrderFilterProps {
  keyword: string;
  status: OrderStatusFilter;
  onKeywordChange: (v: string) => void;
  onStatusChange: (v: OrderStatusFilter) => void;
}

const OrderFilter = ({
  keyword,
  status,
  onKeywordChange,
  onStatusChange,
}: OrderFilterProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex border-b items-center gap-2">
        <Search className="size-4 text-gray-400" />
        <Input
          className="border-0 shadow-none placeholder:text-gray-400 w-64"
          placeholder="주문번호 또는 고객명 검색..."
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>

      <Select value={status} onValueChange={(v) => onStatusChange(v as OrderStatusFilter)}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="상태 필터" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrderFilter;
