import { Link } from "react-router-dom";
interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  hasStockIssue: boolean;
}

export const OrderSummary = ({
  subtotal,
  shipping,
  total,
  freeShippingThreshold,
  hasStockIssue,
}: OrderSummaryProps) => {
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const isFreeShipping = shipping === 0;

  
  return (
    <div className="sticky top-8 w-[500px]">
      <div className="border border-[#EEEEEE] bg-white p-8">
        <h2 className="mb-8 font-serif text-2xl text-black">주문 요약</h2>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="font-light text-black">소계</span>
            <span className="text-black">₩{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-light text-black">배송비</span>
              <span className="text-black">
                {isFreeShipping ? "Free" : `₩${shipping.toLocaleString()}`}
              </span>
            </div>
            {!isFreeShipping && remainingForFreeShipping > 0 && (
              <p className="text-xs text-gray-500">
                ₩{remainingForFreeShipping.toLocaleString()} 더 담으면 무료 배송
              </p>
            )}
          </div>

          <hr className="border-[#EEEEEE]" />

          <div className="flex justify-between pt-4">
            <span className="text-base font-base text-black">총 합계</span>
            <span className="text-lg font-base text-black">
              ₩{total.toLocaleString()}
            </span>
          </div>
        </div>
        {hasStockIssue ? (
          <div className="mt-8 w-full cursor-not-allowed bg-gray-300 py-6 text-center text-sm font-semibold uppercase tracking-widest text-gray-500">
            재고를 확인해주세요
          </div>
        ) : (
          <Link
            to="/payment"
            className="mt-8 block w-full bg-black py-6 text-center text-sm font-semibold uppercase tracking-widest text-white hover:bg-black/90"
          >
            결제페이지로 이동
          </Link>
        )}
      </div>
    </div>
  );
};
