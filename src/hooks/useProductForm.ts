import { showToastMessage } from "@/features/common/uiSlice";
import { api } from "@/utils/api";
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

export const useProductForm = (mode: "new" | "edit") => {
  const [formData, setFormData] = useState<FormData>(
    mode === "new" ? INITIAL_FORM_DATA : INITIAL_FORM_DATA,
  );
  const dispatch = useDispatch();
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

  const handleSubmit = async () => {
    if (!validate()) return;
    if (mode === "new") {
      try {
        const response = await api.post("/product/create", formData);
        console.log(response.data);
        dispatch(
          showToastMessage({
            message: response.data.status,
            status: "success",
          }),
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("상품 수정");
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
  };
};
