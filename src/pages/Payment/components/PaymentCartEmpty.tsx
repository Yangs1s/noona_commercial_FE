import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const PaymentCartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ShoppingBag className="mb-6 h-12 w-12 text-black/20" />
      <p className="mb-2 font-serif text-xl text-black">
        장바구니가 비어있습니다
      </p>
      <p className="mb-8 text-sm text-black/40">
        결제할 상품을 먼저 담아주세요
      </p>
      <Link
        to="/products"
        className="text-sm tracking-widest underline underline-offset-4 text-black hover:text-black/60 transition-colors uppercase"
      >
        쇼핑 계속하기
      </Link>
    </div>
  );
};

export default PaymentCartEmpty;
