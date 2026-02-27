import { Activity, useEffect, useState } from "react";

interface FormErrors {
  lastName?: string;
  firstName?: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvc?: string;
  accountNumber?: string;
  accountHolder?: string;
}
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/features/store";
import { getCart } from "@/features/cart/cartSlice";
import { type Focused } from "react-credit-cards-2";

import ShippingForm, { type ShippingAddress } from "./components/ShippingForm";
import CreditCardForm from "./components/CreditCardForm";
import BankTransferForm, { type Bank } from "./components/BankTransferForm";
import OrderSummary from "./components/OrderSummary";
import { calcOrderPricing } from "@/utils/cartUtils";
import { createOrder } from "@/features/order/orderSlice";
import { useNavigate } from "react-router-dom";

type PaymentMethod = "card" | "transfer";

const PaymentPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector<RootState, RootState["cart"]>(
    (state) => state.cart,
  );
  const navigate = useNavigate();
  // 배송 정보
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: "",
    city: "",
    zipCode: "",
  });

  // 결제 수단
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  // 신용카드
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [focused, setFocused] = useState<Focused>("");

  // 무통장입금
  const [selectedBank, setSelectedBank] = useState<Bank>("농협");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  const validCartItems = cartItems.filter((item) => item.productId != null);
  const { total } = calcOrderPricing(validCartItems);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!lastName.trim()) newErrors.lastName = "성을 입력해주세요";
    if (!firstName.trim()) newErrors.firstName = "이름을 입력해주세요";
    if (phone.length < 11) newErrors.phone = "올바른 연락처를 입력해주세요 (11자리)";
    if (!shippingAddress.address.trim()) newErrors.address = "주소를 입력해주세요";
    if (!shippingAddress.city.trim()) newErrors.city = "도시를 입력해주세요";
    if (shippingAddress.zipCode.length < 5) newErrors.zipCode = "우편번호 5자리를 입력해주세요";

    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16) newErrors.cardNumber = "카드 번호 16자리를 입력해주세요";
      if (!cardName.trim()) newErrors.cardName = "카드 소유자 이름을 입력해주세요";
      if (cardExpiry.length < 5) newErrors.cardExpiry = "유효기간을 입력해주세요 (MM/YY)";
      if (cardCvc.length < 3) newErrors.cardCvc = "CVC 3자리를 입력해주세요";
    }

    if (paymentMethod === "transfer") {
      if (!accountNumber.trim()) newErrors.accountNumber = "계좌번호를 입력해주세요";
      if (!accountHolder.trim()) newErrors.accountHolder = "입금자명을 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      items: validCartItems.map((item) => {
        return {
          productId: item.productId._id,
          size: item.size,
          quantity: item.quantity,
          price: item.productId.price,
        };
      }),
      contact: { lastName, firstName, phone },
      shipTo: { ...shippingAddress },
      totalPrice: total,
    };

    try {
      await dispatch(createOrder({ payload, navigate })).unwrap();
    } catch {
      navigate("/cart");
    }
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  //   const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setPaymentMethod(e.target.value as PaymentMethod);
  //   };
  return (
    <div className="min-h-[calc(100vh-180px)] mx-auto max-w-7xl w-full bg-white px-8 py-16 lg:px-16">
      <h1 className="mb-16 font-serif text-4xl text-black lg:text-5xl">결제</h1>

      <div className="flex flex-col gap-16 lg:flex-row w-full">
        {/* ── 왼쪽: 정보 입력 (6/10) ── */}
        <div className="flex-6 space-y-14">
          <ShippingForm
            lastName={lastName}
            firstName={firstName}
            phone={phone}
            shippingAddress={shippingAddress}
            onLastNameChange={setLastName}
            onFirstNameChange={setFirstName}
            onPhoneChange={setPhone}
            onAddressChange={(field, value) =>
              setShippingAddress((prev) => ({ ...prev, [field]: value }))
            }
            errors={errors}
          />

          {/* 결제 수단 */}
          <section>
            <h2 className="mb-8 font-serif text-2xl text-black">결제 수단</h2>

            <div className="mb-8 flex gap-6">
              {(["card", "transfer"] as PaymentMethod[]).map((method) => (
                <label
                  key={method}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="accent-black"
                  />
                  <span className="text-sm text-black">
                    {method === "card" ? "신용카드" : "무통장 입금"}
                  </span>
                </label>
              ))}
            </div>

            <Activity mode={paymentMethod === "card" ? "visible" : "hidden"}>
              <CreditCardForm
                cardNumber={cardNumber}
                cardName={cardName}
                cardExpiry={cardExpiry}
                cardCvc={cardCvc}
                focused={focused}
                onNumberChange={setCardNumber}
                onNameChange={setCardName}
                onExpiryChange={setCardExpiry}
                onCvcChange={setCardCvc}
                onFocusChange={setFocused}
                errors={errors}
              />
            </Activity>

            <Activity
              mode={paymentMethod === "transfer" ? "visible" : "hidden"}
            >
              <BankTransferForm
                selectedBank={selectedBank}
                accountNumber={accountNumber}
                accountHolder={accountHolder}
                onBankChange={setSelectedBank}
                onAccountNumberChange={setAccountNumber}
                onAccountHolderChange={setAccountHolder}
                errors={errors}
              />
            </Activity>
          </section>
        </div>

        {/* ── 오른쪽: 주문 요약 (4/10) ── */}
        <div className="flex-4">
          <OrderSummary onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
