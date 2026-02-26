import { Separator } from "@/components/ui/separator";

const OrderItemSkeleton = () => {
  return (
    <div className="py-10 animate-pulse">
      {/* 헤더: 날짜 + 주문번호 + 배지 */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-6">
          <div className="h-3 w-24 bg-black/10 rounded" />
          <div className="h-3 w-32 bg-black/10 rounded" />
        </div>
        <div className="h-5 w-16 bg-black/10 rounded" />
      </div>

      {/* 상품 정보 */}
      <div className="flex items-center gap-6">
        {/* 썸네일 */}
        <div className="w-20 h-20 flex-shrink-0 bg-black/10" />

        {/* 텍스트 */}
        <div className="space-y-2">
          <div className="h-3.5 w-40 bg-black/10 rounded" />
          <div className="h-3 w-24 bg-black/10 rounded" />
          <div className="h-3.5 w-20 bg-black/10 rounded" />
        </div>
      </div>

      <Separator className="mt-10 bg-black/5" />
    </div>
  );
};

export default OrderItemSkeleton;
