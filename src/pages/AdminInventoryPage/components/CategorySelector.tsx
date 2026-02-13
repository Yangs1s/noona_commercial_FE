import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { CATEGORY_OPTIONS } from "@/constants/product";

interface CategorySelectorProps {
  selected: string[];
  onChange: (value: string) => void;
}

const CategorySelector = ({ selected, onChange }: CategorySelectorProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between font-normal"
        >
          <span className="truncate">
            {selected.length > 0
              ? CATEGORY_OPTIONS.filter((opt) => selected.includes(opt.value))
                  .map((opt) => opt.label)
                  .join(", ")
              : "카테고리를 선택해주세요"}
          </span>
          <ChevronsUpDown
            size={14}
            className="shrink-0 text-muted-foreground"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-1"
        align="start"
      >
        {CATEGORY_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            onClick={() => onChange(option.value)}
          >
            <Check
              size={14}
              className={
                selected.includes(option.value) ? "opacity-100" : "opacity-0"
              }
            />
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default CategorySelector;
