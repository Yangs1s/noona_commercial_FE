import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { AppDispatch, RootState } from "@/features/store";
import { getProductsByCustomer } from "@/features/product/productSlice";
import TablePagination from "@/components/common/TablePagination";
import FilterSidebar, { PRICE_RANGES } from "./components/FilterSidebar";
import ProductCard from "./components/ProductCard";

const ProductListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, productLoading } = useSelector(
    (state: RootState) => state.product,
  );

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);

  useEffect(() => {
    dispatch(
      getProductsByCustomer({
        page: currentPage,
        limit: 9,
        sort: "createdAt",
        order: "desc",
        query: "",
      }),
    );
  }, [currentPage, dispatch]);

  const filteredProducts = (products?.data ?? []).filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      product.category.some((c) => selectedCategories.includes(c));
    const range = PRICE_RANGES[selectedPriceRange];
    const priceMatch = product.price >= range.min && product.price <= range.max;
    return categoryMatch && priceMatch;
  });

  const totalPages = Math.min(Math.max(products?.totalPages ?? 1, 1), 5);

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );
  };

  return (
    <div className="flex min-h-full bg-white text-black">
      <FilterSidebar
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        selectedPriceRange={selectedPriceRange}
        onSelectPriceRange={setSelectedPriceRange}
      />

      <section className="flex flex-1 flex-col px-10 py-12">
        {productLoading ? (
          <div className="flex flex-1 items-center justify-center text-sm tracking-widest text-gray-300">
            로딩 중...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm tracking-widest text-gray-300">
            상품이 없습니다
          </div>
        ) : (
          <ul className="grid grid-cols-3 gap-x-8 gap-y-14">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ul>
        )}

        <div className="mt-auto pt-16">
          <TablePagination totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
};

export default ProductListPage;
