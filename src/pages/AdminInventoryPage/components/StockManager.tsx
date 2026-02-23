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
  return (
    <div className="space-y-2">
      {stock.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <SelectBox
            options={SIZE_OPTIONS}
            value={item.size}
            onValueChange={(value) => onChange(index, "size", value)}
            placeholder="사이즈"
            className="flex-1"
            disabledValues={stock
              .filter((_, i) => i !== index)
              .map((s) => s.size)
              .filter(Boolean)}
          />
          <Input
            type="number"
            placeholder="수량"
            className="w-24"
            min={0}
            value={item.quantity || ""}
            onChange={(e) =>
              onChange(index, "quantity", Math.max(0, Number(e.target.value)))
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onRemove(index)}
            disabled={stock.length === 1}
          >
            <Trash2 size={14} className="text-red-400" />
          </Button>
        </div>
      ))}
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
