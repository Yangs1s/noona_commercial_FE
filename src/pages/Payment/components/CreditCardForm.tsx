import Cards, { type Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { formatCardNumber, formatCardExpiry, formatCvc } from "@/utils/paymentUtils";

const inputClass =
  "w-full border-b border-black/20 pb-2 text-sm text-black placeholder:text-black/30 outline-none focus:border-black bg-transparent transition-colors";
const labelClass =
  "block mb-1 text-xs tracking-widest uppercase text-black/40";

interface CreditCardFormProps {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
  focused: Focused;
  onNumberChange: (v: string) => void;
  onNameChange: (v: string) => void;
  onExpiryChange: (v: string) => void;
  onCvcChange: (v: string) => void;
  onFocusChange: (field: Focused) => void;
  errors?: {
    cardNumber?: string;
    cardName?: string;
    cardExpiry?: string;
    cardCvc?: string;
  };
}

const CreditCardForm = ({
  cardNumber,
  cardName,
  cardExpiry,
  cardCvc,
  focused,
  onNumberChange,
  onNameChange,
  onExpiryChange,
  onCvcChange,
  onFocusChange,
  errors = {},
}: CreditCardFormProps) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <Cards
          number={cardNumber}
          expiry={cardExpiry}
          cvc={cardCvc}
          name={cardName}
          focused={focused}
        />
      </div>
      <div className="space-y-7">
        <div>
          <label className={labelClass}>카드 번호</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => onNumberChange(formatCardNumber(e.target.value))}
            onFocus={() => onFocusChange("number")}
            onBlur={() => onFocusChange("")}
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            className={inputClass}
          />
          {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
        </div>
        <div>
          <label className={labelClass}>카드 소유자</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => onNameChange(e.target.value)}
            onFocus={() => onFocusChange("name")}
            onBlur={() => onFocusChange("")}
            placeholder="HONG GIL DONG"
            className={inputClass}
          />
          {errors.cardName && <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>유효기간</label>
            <input
              type="text"
              value={cardExpiry}
              onChange={(e) => onExpiryChange(formatCardExpiry(e.target.value))}
              onFocus={() => onFocusChange("expiry")}
              onBlur={() => onFocusChange("")}
              placeholder="MM/YY"
              maxLength={5}
              className={inputClass}
            />
            {errors.cardExpiry && <p className="mt-1 text-xs text-red-500">{errors.cardExpiry}</p>}
          </div>
          <div>
            <label className={labelClass}>CVC</label>
            <input
              type="text"
              value={cardCvc}
              onChange={(e) => onCvcChange(formatCvc(e.target.value))}
              onFocus={() => onFocusChange("cvc")}
              onBlur={() => onFocusChange("")}
              placeholder="000"
              maxLength={3}
              className={inputClass}
            />
            {errors.cardCvc && <p className="mt-1 text-xs text-red-500">{errors.cardCvc}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
