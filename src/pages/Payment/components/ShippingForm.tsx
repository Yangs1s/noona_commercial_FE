import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPhone } from "@/utils/paymentUtils";

export interface ShippingAddress {
  address: string;
  city: string;
  zipCode: string;
}

interface ShippingFormErrors {
  lastName?: string;
  firstName?: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
}

interface ShippingFormProps {
  lastName: string;
  firstName: string;
  phone: string;
  shippingAddress: ShippingAddress;
  onLastNameChange: (v: string) => void;
  onFirstNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onAddressChange: (field: keyof ShippingAddress, value: string) => void;
  errors?: ShippingFormErrors;
}

const ShippingForm = ({
  lastName,
  firstName,
  phone,
  shippingAddress,
  onLastNameChange,
  onFirstNameChange,
  onPhoneChange,
  onAddressChange,
  errors = {},
}: ShippingFormProps) => {
  return (
    <section>
      <h2 className="mb-8 font-serif text-2xl text-black">배송 정보</h2>
      <div className="space-y-7">
        {/* 성 / 이름 */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label htmlFor="lastName">성</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              placeholder="홍"
              variant="ghost"
            />
            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="firstName">이름</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              placeholder="길동"
              variant="ghost"
            />
            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
          </div>
        </div>

        {/* 연락처 */}
        <div className="space-y-1.5">
          <Label htmlFor="phone">연락처</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(formatPhone(e.target.value))}
            placeholder="01000000000"
            maxLength={11}
            variant="ghost"
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>

        {/* 주소 */}
        <div className="space-y-1.5">
          <Label htmlFor="address">주소</Label>
          <Input
            id="address"
            type="text"
            value={shippingAddress.address}
            onChange={(e) => onAddressChange("address", e.target.value)}
            placeholder="테헤란로 123"
            variant="ghost"
          />
          {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
        </div>

        {/* 도시 / 우편번호 */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label htmlFor="city">도시</Label>
            <Input
              id="city"
              type="text"
              value={shippingAddress.city}
              onChange={(e) => onAddressChange("city", e.target.value)}
              placeholder="서울특별시"
              variant="ghost"
            />
            {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="zipCode">우편번호</Label>
            <Input
              id="zipCode"
              type="text"
              value={shippingAddress.zipCode}
              onChange={(e) => onAddressChange("zipCode", e.target.value)}
              placeholder="06234"
              maxLength={5}
              variant="ghost"
            />
            {errors.zipCode && <p className="text-xs text-red-500">{errors.zipCode}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingForm;
