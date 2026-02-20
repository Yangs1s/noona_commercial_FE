import { SIZE_OPTIONS } from "@/constants/product";

interface StockItem {
  size: string;
  quantity: number;
}

/**
 * stock 배열을 SIZE_OPTIONS 순서대로 정렬
 * @param stock - 정렬할 stock 배열
 * @returns SIZE_OPTIONS 순서대로 정렬된 새로운 배열
 */
export const sortStockBySize = (stock: StockItem[]): StockItem[] => {
  const sizeOrder = SIZE_OPTIONS.map((option) => option.value);

  return [...stock].sort((a, b) => {
    const indexA = sizeOrder.indexOf(a.size);
    const indexB = sizeOrder.indexOf(b.size);

    // 사이즈가 SIZE_OPTIONS에 없으면 맨 뒤로
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
};
