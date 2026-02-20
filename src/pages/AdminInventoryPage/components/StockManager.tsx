import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import SelectBox from "@/components/common/SelectBox";
import { SIZE_OPTIONS, MAX_STOCK_ITEMS } from "@/constants/product";

interface StockItem {
  size: string;
  quantity: number;
}

interface StockManagerProps {
  stock: StockItem[];
  onChange: (index: number, field: keyof StockItem, value: string | number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const StockManager = ({ stock, onChange, onAdd, onRemove }: StockManagerProps) => {
  // SIZE_OPTIONS 순서에 따라 정렬된 stock
  const sortedStock = [...stock].sort((a, b) => {
    const sizeOrder = SIZE_OPTIONS.map(option => option.value);
    const indexA = sizeOrder.indexOf(a.size);
    const indexB = sizeOrder.indexOf(b.size);

    // 사이즈가 SIZE_OPTIONS에 없으면 맨 뒤로
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  // 원본 stock의 인덱스를 찾기 위한 맵
  const getOriginalIndex = (sortedIndex: number) => {
    return stock.indexOf(sortedStock[sortedIndex]);
  };

  return (
    <div className="space-y-2">
      {sortedStock.map((item, sortedIndex) => {
        const originalIndex = getOriginalIndex(sortedIndex);
        return (
          <div key={originalIndex} className="flex items-center gap-2">
            <SelectBox
              options={SIZE_OPTIONS}
              value={item.size}
              onValueChange={(value) => onChange(originalIndex, "size", value)}
              placeholder="사이즈"
              className="flex-1"
              disabledValues={stock
                .filter((_, i) => i !== originalIndex)
                .map((s) => s.size)
                .filter(Boolean)}
            />
            <Input
              type="number"
              placeholder="수량"
              className="w-24"
              value={item.quantity || ""}
              onChange={(e) =>
                onChange(originalIndex, "quantity", Number(e.target.value))
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => onRemove(originalIndex)}
              disabled={stock.length === 1}
            >
              <Trash2 size={14} className="text-red-400" />
            </Button>
          </div>
        );
      })}
      {stock.length < MAX_STOCK_ITEMS && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onAdd}
        >
          <Plus size={14} />
          재고 추가 ({stock.length}/{MAX_STOCK_ITEMS})
        </Button>
      )}
    </div>
  );
};

export default StockManager;
