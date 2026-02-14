import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import InventoryTable from "./components/InventoryTable";
import TablePagination from "@/components/common/TablePagination";
import InventoryModal from "./components/InventoryModal";
import { useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/features/store";
import { getProducts } from "@/features/product/productSlice";
import { useDispatch } from "react-redux";
const AdminInventoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(
      getProducts({ page: 1, limit: 10, sort: "createdAt", order: "desc" }),
    );
  }, [dispatch]);

  // Uncomment for debugging:
  return (
    <div className="space-y-8">
      {/* 제목 , 상품 추가 버튼 상단구역 */}
      <div className="flex items-center justify-between">
        {/* 제목 */}
        <div>
          <p className="text-[12px] font-base uppercase tracking-[0.2em] text-muted-foreground">
            재고 관리
          </p>
          <h1 className="text-[32px] text-foreground font-thin">
            상품 재고 현황
          </h1>
        </div>
        {/* 상품 추가 버튼 */}
        <InventoryModal mode="new">
          <Button
            variant="default"
            className=" p-8 text-xs tracking-[0.2em] font-bold"
          >
            상품 추가
          </Button>
        </InventoryModal>
      </div>
      <Separator />
      {/* 검색 및 필터 구역 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2">
            <Search className="size-5 text-gray-400" />
            <Input
              className="border-0 shadow-none placeholder:text-gray-400"
              type="text"
              placeholder="상품 검색..."
            />
          </div>
          <div>
            <Select
              value="all"
              onValueChange={(value) => {
                console.log(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="상품 검색..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* 상품 목록 구역 */}
      <InventoryTable products={products || []} />
      {/* 페이지네이션 구역 */}
      <TablePagination />
    </div>
  );
};

export default AdminInventoryPage;
