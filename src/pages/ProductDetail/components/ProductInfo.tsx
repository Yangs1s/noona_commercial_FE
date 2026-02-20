import type { Product } from "@/types/product.type";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    /* 이미지 섹션 */
    <div className="bg-[#F9F9F9] p-8 lg:col-span-6 lg:p-12">
      <div className="aspect-3/4 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};
