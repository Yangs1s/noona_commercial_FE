import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import OrderFilter from "./components/OrderFilter";
import OrderTable, { type OrderStatus } from "./components/OrderTable";
import OrderDetailModal from "./components/OrderDetailModal";
import TablePagination from "@/components/common/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/features/store";
import { getOrdersAdmin, changeOrderStatus } from "@/features/order/orderSlice";
import type { OrderType } from "@/types/order.type";

const AdminOrderPage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const dispatch = useDispatch<AppDispatch>();
  const { totalPages } = useSelector((state: RootState) => state.order);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    dispatch(getOrdersAdmin({ query: keyword, page: currentPage, limit: 3 }));
  }, [keyword, currentPage, dispatch]);

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    dispatch(changeOrderStatus({ id: orderId, status }));
  };

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
            주문 관리
          </p>
          <h1 className="text-[32px] text-foreground font-thin font-serif">
            주문 목록 및 배송 현황
          </h1>
        </div>
      </div>

      <Separator />

      <OrderFilter keyword={keyword} onKeywordChange={setKeyword} />

      <OrderTable
        onStatusChange={handleStatusChange}
        onDetailClick={setSelectedOrder}
      />

      <TablePagination totalPages={totalPages} />

      <OrderDetailModal
        order={selectedOrder}
        open={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default AdminOrderPage;
