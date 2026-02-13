import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

const InventoryTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-500">상품 이름</TableHead>
          <TableHead className="text-gray-500">SKU</TableHead>
          <TableHead className="text-gray-500">가격</TableHead>
          <TableHead className="text-gray-500">설명</TableHead>
          <TableHead className="text-gray-500">이미지</TableHead>
          <TableHead className="text-gray-500">카테고리</TableHead>
          <TableHead className="text-gray-500">재고</TableHead>
          <TableHead className="text-gray-500">상태</TableHead>
          <TableHead className="text-gray-500">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="h-16">
          <TableCell>클래식 티셔츠</TableCell>
          <TableCell>SKU-001</TableCell>
          <TableCell>29000</TableCell>
          <TableCell>편안한 면 소재의 클래식 티셔츠</TableCell>
          <TableCell>
            <img
              src="https://via.placeholder.com/50"
              alt="클래식 티셔츠"
              className="w-10 h-10 object-cover"
            />
          </TableCell>
          <TableCell>의류</TableCell>
          <TableCell>S: 10 / M: 20 / L: 15</TableCell>
          <TableCell>판매중</TableCell>
          <TableCell>
            <div className="flex gap-4">
              <button className="text-gray-500 hover:text-blue-500">
                <Pencil size={16} fill="currentColor" />
              </button>
              <button className="text-gray-500 hover:text-red-500">
                <Trash2 size={16} fill="currentColor" />
              </button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default InventoryTable;
