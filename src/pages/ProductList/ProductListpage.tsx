import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { AppDispatch, RootState } from "@/features/store";
import { getProductsByCustomer } from "@/features/product/productSlice";
import TablePagination from "@/components/common/TablePagination";
import FilterSidebar, { PRICE_RANGES } from "./components/FilterSidebar";
import ProductCard from "./components/ProductCard";
import { Search } from "lucide-react";

const ProductListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, productLoading } = useSelector(
    (state: RootState) => state.product,
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentQuery = searchParams.get("query") || "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [searchInput, setSearchInput] = useState(currentQuery);

  useEffect(() => {
    dispatch(
      getProductsByCustomer({
        page: currentPage,
        limit: 9,
        sort: "createdAt",
        order: "desc",
        query: currentQuery,
      }),
    );
  }, [currentPage, currentQuery, dispatch]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (searchInput.trim()) {
        next.set("query", searchInput.trim());
      } else {
        next.delete("query");
      }
      next.delete("page");
      return next;
    });
  };

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
        {/* 검색 바 */}
        <form onSubmit={handleSearch} className="mb-10 flex items-center border-b border-gray-200 pb-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="상품 검색..."
            className="flex-1 text-sm tracking-wide outline-none placeholder:text-gray-300"
          />
          <button type="submit" className="ml-4 text-gray-400 hover:text-black transition-colors">
            <Search size={18} />
          </button>
        </form>

        {productLoading ? (
          <div className="flex flex-1 items-center justify-center text-sm tracking-widest text-gray-300">
            로딩 중...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm tracking-widest text-gray-300">
            {currentQuery ? `"${currentQuery}" 검색 결과가 없습니다` : "상품이 없습니다"}
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
