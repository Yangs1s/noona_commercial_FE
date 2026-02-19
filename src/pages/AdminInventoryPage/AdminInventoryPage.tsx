import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import InventoryFilter from "./components/InventoryFilter";
import InventoryTable from "./components/InventoryTable";
import TablePagination from "@/components/common/TablePagination";
import InventoryModal from "./components/InventoryModal";
import { useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/features/store";
import { getProducts } from "@/features/product/productSlice";
import { useDispatch } from "react-redux";

interface SearchQuery {
  page: number;
  limit: number;
  sort: "createdAt" | "updatedAt" | "name" | "price";
  order: "asc" | "desc";
  query: string;
}

const AdminInventoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();

  console.log("searchParams", searchParams.get(""));
  // 렌더링시마다 메모를 사용하지 않으면, 검색 쿼리가 변경될 때마다 데이터를 다시 불러오게 됨
  // 동시에 useEffect도 계속 실행되므로, useMemo를 사용하여 한번만 실행되도록 함.
  // 그리고 의존성 배열에 searchParams를 추가하여, searchParams가 변경될 때마다 다시 실행되도록 함.
  const searchQuery = useMemo<SearchQuery>(
    () => ({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      sort: (searchParams.get("sort") as SearchQuery["sort"]) || "createdAt",
      order: (searchParams.get("order") as SearchQuery["order"]) || "desc",
      query: searchParams.get("query") || "",
    }),
    [searchParams],
  );

  useEffect(() => {
    dispatch(getProducts(searchQuery));
  }, [dispatch, searchQuery]);

  const handleSearchQueryChange = (params: Partial<SearchQuery>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(params).forEach(([key, value]) => {
        if (value === "" || value === undefined) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });
      return next;
    });
  };

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
        <InventoryModal
          mode="new"
          onSuccess={() => dispatch(getProducts(searchQuery))}
        >
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
      <InventoryFilter
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      {/* 상품 목록 구역 */}
      <InventoryTable products={products?.data || []} />
      {/* 페이지네이션 구역 */}
      <TablePagination totalPages={products?.totalPages || 0} />
    </div>
  );
};

export default AdminInventoryPage;
