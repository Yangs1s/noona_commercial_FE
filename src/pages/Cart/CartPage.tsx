import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CartItem as CartItemComponent } from "./components/CartItem";
import { OrderSummary } from "./components/OrderSummary";
import CartEmpty from "./components/CartEmpty";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/features/store";
import { getCart } from "@/features/cart/cartSlice";
import { calcOrderPricing, FREE_SHIPPING_THRESHOLD } from "@/utils/cartUtils";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector<RootState, RootState["cart"]>(
    (state) => state.cart,
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const { subtotal, shipping, total } = calcOrderPricing(cartItems);

  if (cartItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-180px)] max-w-7xl bg-white px-8 py-16 lg:px-16">
      {/* 쇼핑 계속하기 */}
      <Link
        to="/products"
        className="mb-12 inline-flex items-center text-sm tracking-wide text-black hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        쇼핑 계속하기
      </Link>

      {/* 페이지 제목 */}
      <h1 className="mb-16 font-serif text-4xl text-black lg:text-5xl">
        장바구니
      </h1>

      {/* 2컬럼 레이아웃 */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-10 lg:gap-16">
        {/* 장바구니 목록 (70%) */}
        <div className="sm:col-span-2 lg:col-span-7">
          <div className="space-y-8">
            {cartItems.map((item, index) => (
              <div key={item.productId._id}>
                <CartItemComponent
                  item={item.productId}
                  size={item.size}
                  quantity={item.quantity}
                  cartItemId={item._id}
                />
                {index < cartItems.length - 1 && (
                  <hr className="mt-8 border-[#EEEEEE]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 주문 요약 (30%) */}
        <div className="sm:col-span-1 lg:col-span-3">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
