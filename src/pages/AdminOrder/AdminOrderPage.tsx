import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import OrderFilter, { type OrderStatusFilter } from "./components/OrderFilter";
import OrderTable, { type AdminOrder, type OrderStatus } from "./components/OrderTable";
import TablePagination from "@/components/common/TablePagination";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const MOCK_ORDERS: AdminOrder[] = [
  { orderId: "ORD-20240101-001", customerName: "김민준", email: "minjun.kim@email.com", createdAt: new Date("2024-01-01T09:12:00"), totalAmount: 258000, paymentMethod: "신용카드", status: "delivered" },
  { orderId: "ORD-20240103-002", customerName: "이서연", email: "seoyeon.lee@email.com", createdAt: new Date("2024-01-03T14:30:00"), totalAmount: 139000, paymentMethod: "카카오페이", status: "delivered" },
  { orderId: "ORD-20240105-003", customerName: "박지호", email: "jiho.park@email.com", createdAt: new Date("2024-01-05T11:05:00"), totalAmount: 420000, paymentMethod: "신용카드", status: "shipping" },
  { orderId: "ORD-20240107-004", customerName: "최수아", email: "sua.choi@email.com", createdAt: new Date("2024-01-07T16:22:00"), totalAmount: 87000, paymentMethod: "네이버페이", status: "shipping" },
  { orderId: "ORD-20240109-005", customerName: "정도윤", email: "doyun.jung@email.com", createdAt: new Date("2024-01-09T10:44:00"), totalAmount: 315000, paymentMethod: "신용카드", status: "preparing" },
  { orderId: "ORD-20240111-006", customerName: "한예린", email: "yerin.han@email.com", createdAt: new Date("2024-01-11T13:15:00"), totalAmount: 196000, paymentMethod: "카카오페이", status: "preparing" },
  { orderId: "ORD-20240113-007", customerName: "오승현", email: "seunghyun.oh@email.com", createdAt: new Date("2024-01-13T09:58:00"), totalAmount: 73000, paymentMethod: "신용카드", status: "cancelled" },
  { orderId: "ORD-20240115-008", customerName: "신지우", email: "jiwoo.shin@email.com", createdAt: new Date("2024-01-15T15:30:00"), totalAmount: 524000, paymentMethod: "네이버페이", status: "delivered" },
  { orderId: "ORD-20240117-009", customerName: "윤하은", email: "haeun.yoon@email.com", createdAt: new Date("2024-01-17T11:20:00"), totalAmount: 168000, paymentMethod: "신용카드", status: "shipping" },
  { orderId: "ORD-20240119-010", customerName: "임준서", email: "junseo.lim@email.com", createdAt: new Date("2024-01-19T08:45:00"), totalAmount: 239000, paymentMethod: "카카오페이", status: "preparing" },
  { orderId: "ORD-20240121-011", customerName: "강나윤", email: "nayoon.kang@email.com", createdAt: new Date("2024-01-21T14:10:00"), totalAmount: 95000, paymentMethod: "신용카드", status: "delivered" },
  { orderId: "ORD-20240123-012", customerName: "조민서", email: "minseo.cho@email.com", createdAt: new Date("2024-01-23T16:55:00"), totalAmount: 382000, paymentMethod: "네이버페이", status: "cancelled" },
];

const AdminOrderPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<AdminOrder[]>(MOCK_ORDERS);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>("all");

  const currentPage = Number(searchParams.get("page")) || 1;

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchKeyword =
        keyword === "" ||
        o.orderId.toLowerCase().includes(keyword.toLowerCase()) ||
        o.customerName.includes(keyword);
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      return matchKeyword && matchStatus;
    });
  }, [orders, keyword, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o)),
    );
  };

  const resetPage = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", "1");
      return next;
    });
  };

  const handleCsvExport = () => {
    const header = ["주문번호", "고객명", "이메일", "주문일시", "결제금액", "결제수단", "배송상태"];
    const rows = filtered.map((o) => [
      o.orderId,
      o.customerName,
      o.email,
      o.createdAt.toLocaleString("ko-KR"),
      o.totalAmount,
      o.paymentMethod,
      o.status,
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
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
        <Button
          variant="outline"
          className="text-xs tracking-[0.15em] font-semibold border-black text-black hover:bg-black hover:text-white transition-colors"
          onClick={handleCsvExport}
        >
          CSV 내보내기
        </Button>
      </div>

      <Separator />

      {/* 검색 + 상태 필터 */}
      <OrderFilter
        keyword={keyword}
        status={statusFilter}
        onKeywordChange={(v) => { setKeyword(v); resetPage(); }}
        onStatusChange={(v) => { setStatusFilter(v); resetPage(); }}
      />

      {/* 주문 테이블 */}
      <OrderTable orders={paginated} onStatusChange={handleStatusChange} />

      {/* 페이지네이션 */}
      <TablePagination totalPages={totalPages} />
    </div>
  );
};

export default AdminOrderPage;
