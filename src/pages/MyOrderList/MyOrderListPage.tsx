import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/features/store";
import { getOrders } from "@/features/order/orderSlice";
import OrderItem from "./components/OrderItem";
import OrderItemSkeleton from "./components/OrderItemSkeleton";

const MyOrderListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, orderLoading, nextCursor, hasMore } = useSelector(
    (state: RootState) => state.order,
  );
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getOrders({}));
  }, [dispatch]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !orderLoading) {
          dispatch(getOrders({ cursor: nextCursor! }));
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, orderLoading, nextCursor, dispatch]);

  return (
    <div className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        {/* 섹션 타이틀 */}
        <h1 className="font-serif text-4xl text-black mb-16 tracking-tight">
          주문 내역
        </h1>

        {orders.length === 0 && orderLoading ? (
          <div>
            {Array.from({ length: 3 }).map((_, i) => (
              <OrderItemSkeleton key={i} />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-sm tracking-widest uppercase text-black/30">
              주문 내역이 없습니다
            </p>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}

            {/* 무한스크롤 감지 sentinel */}
            <div ref={sentinelRef} className="h-1" />

            {orderLoading && (
              <div className="py-8 flex justify-center">
                <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              </div>
            )}

            {!hasMore && orders.length > 0 && (
              <p className="py-8 text-center text-xs tracking-widest text-black/30">
                모든 주문 내역을 불러왔습니다
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrderListPage;
