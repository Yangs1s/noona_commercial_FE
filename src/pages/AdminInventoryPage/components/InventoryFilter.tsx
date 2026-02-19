import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw, Search } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type SearchQuery = {
  page: number;
  limit: number;
  sort: "createdAt" | "updatedAt" | "name" | "price";
  order: "asc" | "desc";
  query: string;
};

type InventoryFilterProps = {
  searchQuery: Omit<SearchQuery, "query">;
  onSearchQueryChange: (params: Partial<SearchQuery>) => void;
};

const SORT_OPTIONS = [
  { label: "최신순", sort: "createdAt", order: "desc" },
  { label: "오래된순", sort: "createdAt", order: "asc" },
  { label: "가격 낮은순", sort: "price", order: "asc" },
  { label: "가격 높은순", sort: "price", order: "desc" },
  { label: "이름순", sort: "name", order: "asc" },
] as const;

const DEFAULT_SORT = "createdAt_desc";

const InventoryFilter = ({
  searchQuery,
  onSearchQueryChange,
}: InventoryFilterProps) => {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("query") || "");
  const currentSortValue = `${searchQuery.sort}_${searchQuery.order}`;

  const isFiltered = keyword !== "" || currentSortValue !== DEFAULT_SORT;

  const handleSortChange = (value: string) => {
    const [sort, order] = value.split("_") as [
      SearchQuery["sort"],
      SearchQuery["order"],
    ];
    onSearchQueryChange({ sort, order, page: 1 });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchQueryChange({ query: keyword, page: 1 });
    }
  };

  const handleReset = () => {
    setKeyword("");
    onSearchQueryChange({
      query: "",
      sort: "createdAt",
      order: "desc",
      page: 1,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex border-b-[1px] items-center gap-2">
          <Search className="size-5 text-gray-400" />
          <Input
            className="border-0 shadow-none placeholder:text-gray-400"
            type="text"
            placeholder="상품 검색..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={currentSortValue} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={`${option.sort}_${option.order}`}
                  value={`${option.sort}_${option.order}`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-gray-400 hover:text-gray-700"
            >
              <RotateCcw className="size-4" />
              초기화
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryFilter;
