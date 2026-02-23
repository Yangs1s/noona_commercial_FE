import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/features/store";
import { getOrders } from "@/features/order/orderSlice";
import OrderItem from "./components/OrderItem";

const MyOrderListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, orderLoading } = useSelector(
    (state: RootState) => state.order,
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        {/* 섹션 타이틀 */}
        <h1 className="font-serif text-4xl text-black mb-16 tracking-tight">
          주문 내역
        </h1>

        {orderLoading ? (
          <div className="py-32 text-center text-xs tracking-widest uppercase text-black/30">
            불러오는 중...
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrderListPage;
