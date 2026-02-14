import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/types/product.type";
import InventoryModal from "./InventoryModal";
const InventoryTable = ({ products }: { products: Product[] }) => {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-500 w-[12%]">상품 이름</TableHead>
          <TableHead className="text-gray-500 w-[10%]">SKU</TableHead>
          <TableHead className="text-gray-500 w-[8%]">가격</TableHead>
          <TableHead className="text-gray-500 w-[20%]">설명</TableHead>
          <TableHead className="text-gray-500 w-[8%]">이미지</TableHead>
          <TableHead className="text-gray-500 w-[12%]">카테고리</TableHead>
          <TableHead className="text-gray-500 w-[12%]">재고</TableHead>
          <TableHead className="text-gray-500 w-[8%]">상태</TableHead>
          <TableHead className="text-gray-500 w-[10%]">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products &&
          products.map((product) => (
            <TableRow className="h-16" key={product._id}>
              <TableCell className="truncate">{product.name}</TableCell>
              <TableCell className="truncate">{product.sku}</TableCell>
              <TableCell className="truncate">{product.price}</TableCell>
              <TableCell className="truncate">{product.description}</TableCell>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover"
                />
              </TableCell>
              <TableCell className="truncate">
                {product.category.join(", ")}
              </TableCell>
              <TableCell className="truncate">
                {product.stock
                  ?.map((stock) => `${stock.size}: ${stock.quantity}`)
                  .join(", ")}
              </TableCell>
              <TableCell>
                {product.status === "active"
                  ? "판매중"
                  : product.status === "inactive"
                    ? "판매중지"
                    : "미사용"}
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <InventoryModal mode="edit">
                    <button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                      <Pencil size={16} fill="currentColor" />
                    </button>
                  </InventoryModal>
                  <button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                    <Trash2 size={16} fill="currentColor" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default InventoryTable;
