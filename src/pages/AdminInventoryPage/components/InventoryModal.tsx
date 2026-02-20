import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SelectBox from "@/components/common/SelectBox";
import { STATUS_OPTIONS } from "@/constants/product";
import CloudinaryUploadWidget from "@/utils/CloudinaryUploadWidget.tsx";
import CategorySelector from "./CategorySelector";
import StockManager from "./StockManager";
import { useProductForm } from "@/hooks/useProductForm";
import { useEffect, useState } from "react";
import type { ProductType } from "@/types/product.type";

const InventoryModal = ({
  mode,
  children,
  onSuccess,
  product,
}: {
  mode: "new" | "edit";
  children: React.ReactNode;
  onSuccess?: () => void;
  product?: ProductType;
}) => {
  const [open, setOpen] = useState(false);
  const {
    formData,
    error,
    handleChange,
    onHandleCategory,
    handleStockChange,
    addStockItem,
    removeStockItem,
    handleSubmit,
    handleUpdateProduct,
    uploadImage,
    uwConfig,
  } = useProductForm(mode, product);

  // 모달이 열릴 때 백그라운드 스크롤 방지
  useEffect(() => {
    if (open) {
      // 모달이 열릴 때 body 스크롤 막기
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫힐 때 body 스크롤 복원
      document.body.style.overflow = "unset";
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div>
      {/* 커스텀 오버레이 shadcn으로 modal옵션 적용시 클라우드네리가 미작동. 따라서 직접 오버레이 적용*/}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 w-full h-full"
          onClick={(e) => e.preventDefault()}
        />
      )}

      <Dialog modal={false} open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className="max-w-3xl w-full max-h-[90vh] overflow-y-auto z-50"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="border-b font-light text-lg border-gray-200 pb-4">
              {mode === "new" ? "새로운 상품 추가" : "상품 수정"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            {/* SKU & 상품명 */}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="sku" className="text-gray-500">
                  SKU (상품 식별 코드)
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="sku"
                    name="sku"
                    placeholder="SKU-001"
                    value={formData.sku}
                    onChange={(e) => handleChange("sku", e.target.value)}
                  />
                  {error?.sku && (
                    <span className="text-xs text-destructive">
                      {error.sku}
                    </span>
                  )}
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel className="text-gray-500">상품명</FieldLabel>
                <FieldContent>
                  <Input
                    name="name"
                    placeholder="상품명을 입력해주세요"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  {error?.name && (
                    <span className="text-xs text-destructive">
                      {error.name}
                    </span>
                  )}
                </FieldContent>
              </Field>
            </div>

            {/* 가격 & 카테고리 */}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel className="text-gray-500">판매 가격 (₩)</FieldLabel>
                <FieldContent>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.price || ""}
                    onChange={(e) =>
                      handleChange("price", Number(e.target.value))
                    }
                  />
                  {error?.price && (
                    <span className="text-xs text-destructive">
                      {error.price}
                    </span>
                  )}
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel className="text-gray-500">카테고리</FieldLabel>
                <FieldContent>
                  <CategorySelector
                    selected={formData.category}
                    onChange={onHandleCategory}
                  />
                  {error?.category && (
                    <span className="text-xs text-destructive">
                      {error.category}
                    </span>
                  )}
                </FieldContent>
              </Field>
            </div>

            {/* 설명 */}
            <Field>
              <FieldLabel className="text-gray-500">설명</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="상품 설명을 입력해주세요"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
                {error?.description && (
                  <span className="text-xs text-destructive">
                    {error.description}
                  </span>
                )}
              </FieldContent>
            </Field>

            {/* 이미지 업로드 */}
            <Field>
              <FieldLabel className="text-gray-500">이미지</FieldLabel>
              <FieldContent>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="상품 이미지"
                    className="w-full h-full object-cover"
                  />
                )}
                <CloudinaryUploadWidget
                  uwConfig={uwConfig}
                  setPublicId={uploadImage}
                />
                {error?.image && (
                  <span className="text-xs text-destructive">
                    {error.image}
                  </span>
                )}
              </FieldContent>
            </Field>

            {/* 재고 */}
            <Field>
              <FieldLabel className="text-gray-500">재고</FieldLabel>
              <FieldContent>
                <StockManager
                  stock={formData.stock}
                  onChange={handleStockChange}
                  onAdd={addStockItem}
                  onRemove={removeStockItem}
                />
                {error?.stock && (
                  <span className="text-xs text-destructive">
                    {error.stock}
                  </span>
                )}
              </FieldContent>
            </Field>

            {/* 상태 */}
            <Field>
              <FieldLabel className="text-gray-500">상태</FieldLabel>
              <FieldContent>
                <SelectBox
                  options={STATUS_OPTIONS}
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                  placeholder="상태를 선택해주세요"
                  className="w-full"
                />
                {error?.status && (
                  <span className="text-xs text-destructive">
                    {error.status}
                  </span>
                )}
              </FieldContent>
            </Field>
          </form>

          <DialogFooter className="border-t border-gray-200 pt-4">
            <Button
              onClick={() =>
                mode === "new"
                  ? handleSubmit(() => {
                      setOpen(false);
                      onSuccess?.();
                    })
                  : handleUpdateProduct(() => {
                      setOpen(false);
                      onSuccess?.();
                    }, product)
              }
            >
              {mode === "new" ? "상품 추가" : "수정 완료"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryModal;
