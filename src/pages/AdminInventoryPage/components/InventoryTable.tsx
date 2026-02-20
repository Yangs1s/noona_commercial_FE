import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import type { ProductType } from "@/types/product.type";
import InventoryModal from "./InventoryModal";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/features/store";
import { deleteProduct, getProducts } from "@/features/product/productSlice";
type ColumnDef = {
  label: string;
  width: string;
};

const DEFAULT_HEADERS: ColumnDef[] = [
  { label: "상품 이름", width: "w-[12%]" },
  { label: "SKU", width: "w-[10%]" },
  { label: "가격", width: "w-[8%]" },
  { label: "설명", width: "w-[20%]" },
  { label: "이미지", width: "w-[14%]" },
  { label: "카테고리", width: "w-[12%]" },
  { label: "재고", width: "w-[12%]" },
  { label: "상태", width: "w-[8%]" },
  { label: "관리", width: "w-[8%]" },
];

const InventoryTable = ({
  products,
  headers = DEFAULT_HEADERS,
}: {
  products: ProductType[];
  headers?: ColumnDef[];
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteProduct = async (id: string) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          {headers.map((col) => (
            <TableHead key={col.label} className={`text-gray-500 ${col.width}`}>
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products &&
          products.map((product) => (
            <TableRow className="h-16" key={product._id}>
              <TableCell className="truncate">{product.name}</TableCell>
              <TableCell className="truncate">{product.sku}</TableCell>
              <TableCell className="truncate">
                {product.price.toLocaleString()}
              </TableCell>
              <TableCell className="truncate">{product.description}</TableCell>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-h-[320px] object-cover"
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
                  <InventoryModal
                    mode="edit"
                    product={product}
                    onSuccess={() =>
                      dispatch(
                        getProducts({
                          page: 1,
                          limit: 10,
                          sort: "createdAt",
                          order: "desc",
                          query: "",
                        }),
                      )
                    }
                  >
                    <button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                      <Pencil size={16} fill="currentColor" />
                    </button>
                  </InventoryModal>
                  <button
                    className="text-gray-500 hover:text-gray-800 cursor-pointer"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
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
