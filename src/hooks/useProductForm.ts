import { createProduct, updateProduct } from "@/features/product/productSlice";
import type { AppDispatch } from "@/features/store";
import type { Product } from "@/types/product.type";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
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

export const useProductForm = (mode: "new" | "edit", product?: Product) => {
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
      return { ...prev, stock: newStock };
    });
  };

  const addStockItem = () => {
    setFormData((prev) => ({
      ...prev,
      stock: [...prev.stock, { size: "", quantity: 0 }],
    }));
  };

  const removeStockItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stock: prev.stock.filter((_, i) => i !== index),
    }));
  };

  const uploadImage = useCallback((image: string) => {
    setFormData((prev) => ({ ...prev, image }));
  }, []);

  const uwConfig = useMemo(
    () => ({
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
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
    product?: Product,
  ) => {
    try {
      await dispatch(
        updateProduct({ ...(product as Product), ...formData }),
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
