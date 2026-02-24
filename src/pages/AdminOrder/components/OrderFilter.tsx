import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface OrderFilterProps {
  keyword: string;
  onKeywordChange: (v: string) => void;
}

const OrderFilter = ({ keyword, onKeywordChange }: OrderFilterProps) => {
  return (
    <div className="flex border-b items-center gap-2 w-fit">
      <Search className="size-4 text-gray-400" />
      <Input
        className="border-0 shadow-none placeholder:text-gray-400 w-64"
        placeholder="주문번호 또는 고객명 검색..."
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
    </div>
  );
};

export default OrderFilter;
