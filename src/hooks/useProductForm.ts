import { createProduct, updateProduct } from "@/features/product/productSlice";
import type { AppDispatch } from "@/features/store";
import type { ProductType } from "@/types/product.type";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { sortStockBySize } from "@/utils/stockUtils";
interface StockItem {
  size: string;
  quantity: number;
}

interface FormData {
  sku: string;
  name: string;
  price: number;
  category: string[];
  description: string;
  image: string;
  stock: StockItem[];
  status: string;
}

const INITIAL_FORM_DATA: FormData = {
  sku: "",
  name: "",
  price: 0,
  category: [],
  description: "",
  image: "",
  stock: [{ size: "", quantity: 0 }],
  status: "",
};

export const useProductForm = (mode: "new" | "edit", product?: ProductType) => {
  const [formData, setFormData] = useState<FormData>(
    mode === "new" ? INITIAL_FORM_DATA : product || INITIAL_FORM_DATA,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<Partial<
    Record<keyof FormData, string>
  > | null>(null);

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.sku) newErrors.sku = "SKU는 필수 입력 항목입니다.";
    if (!formData.name) newErrors.name = "상품명은 필수 입력 항목입니다.";
    if (!formData.price) newErrors.price = "가격은 필수 입력 항목입니다.";
    if (!formData.category.length)
      newErrors.category = "카테고리는 필수 입력 항목입니다.";
    if (!formData.description)
      newErrors.description = "설명은 필수 입력 항목입니다.";
    if (!formData.image) newErrors.image = "이미지는 필수 입력 항목입니다.";
    if (!formData.stock.length)
      newErrors.stock = "재고는 필수 입력 항목입니다.";
    else if (formData.stock.some((s) => !s.size))
      newErrors.stock = "모든 재고 항목의 사이즈를 선택해주세요.";
    else if (formData.stock.some((s) => s.quantity < 0))
      newErrors.stock = "재고 수량은 0 이상이어야 합니다.";
    if (!formData.status) newErrors.status = "상태는 필수 입력 항목입니다.";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error && error[field]) {
      setError((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const onHandleCategory = (value: string) => {
    if (formData.category.includes(value)) {
      const newCategory = formData.category.filter((item) => item !== value);
      setFormData((prev) => ({ ...prev, category: [...newCategory] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        category: [...prev.category, value],
      }));
    }
    if (error?.category) {
      setError((prev) => ({ ...prev, category: undefined }));
    }
  };

  const handleStockChange = (
    index: number,
    field: keyof StockItem,
    value: string | number,
  ) => {
    setFormData((prev) => {
      const newStock = [...prev.stock];
      newStock[index] = { ...newStock[index], [field]: value };
      // stock 변경 후 자동 정렬
      const sortedStock = sortStockBySize(newStock);
      return { ...prev, stock: sortedStock };
    });
  };

  const addStockItem = () => {
    setFormData((prev) => {
      const newStock = [...prev.stock, { size: "", quantity: 0 }];
      // stock 추가 후 자동 정렬
      const sortedStock = sortStockBySize(newStock);
      return { ...prev, stock: sortedStock };
    });
  };

  const removeStockItem = (index: number) => {
    setFormData((prev) => {
      const newStock = prev.stock.filter((_, i) => i !== index);
      // stock 제거 후 자동 정렬 (사실 제거는 정렬이 필요 없지만 일관성 유지)
      const sortedStock = sortStockBySize(newStock);
      return { ...prev, stock: sortedStock };
    });
  };

  const uploadImage = useCallback((image: string) => {
    setFormData((prev) => ({ ...prev, image }));
  }, []);

  const uwConfig = useMemo(
    () => ({
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      z_index: 99999, // Cloudinary 위젯 모달의 z-index 설정
    }),
    [],
  );

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setError(null);
  };

  const handleSubmit = async (onSuccess?: () => void) => {
    if (!validate()) return;
    try {
      await dispatch(createProduct(formData)).unwrap();
      resetForm();
      onSuccess?.();
    } catch (error) {
      // 에러 토스트는 썽크 내부에서 처리
      console.log(error);
    }
  };

  const handleUpdateProduct = async (
    onSuccess?: () => void,
    product?: ProductType,
  ) => {
    if (!validate()) return;
    try {
      await dispatch(
        updateProduct({ ...(product as ProductType), ...formData }),
      ).unwrap();
      onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    formData,
    error,
    handleChange,
    onHandleCategory,
    handleStockChange,
    addStockItem,
    removeStockItem,
    handleSubmit,
    uploadImage,
    uwConfig,
    handleUpdateProduct,
  };
};
