import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "@/features/store";
import { useEffect } from "react";
import { getProductById } from "@/features/product/productSlice";
import { ProductInfo } from "./components/ProductInfo";
import { ProductOptions } from "./components/ProductOptions";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { product, productLoading } = useSelector(
    (state: RootState) => state.product,
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  if (productLoading || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm tracking-widest text-gray-300">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="w-full grid min-h-[calc(100vh-180px)] mx-auto max-w-7xl grid-cols-1 bg-white lg:grid-cols-10">
      <ProductInfo product={product} />

      <div className="flex flex-col px-8 py-16 lg:col-span-4 lg:px-12 lg:py-24">
        <ProductOptions product={product} />
      </div>
    </div>
  );
};

export default ProductPage;
