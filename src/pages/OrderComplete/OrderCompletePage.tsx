import { useLocation, useNavigate } from "react-router-dom";

const CheckIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="23" stroke="#000" strokeWidth="1" />
    <polyline
      points="14,24 21,31 34,17"
      stroke="#000"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const OrderCompletePage = () => {
  const { orderNumber } = useLocation().state;
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center text-center gap-10 px-8 py-20 max-w-lg w-full">

        {/* 체크 아이콘 */}
        <CheckIcon />

        {/* 감사 메시지 */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-serif text-4xl lg:text-5xl text-black tracking-wide">
            감사합니다
          </h1>
          <p className="font-serif text-lg text-black tracking-wide">
            주문이 완료되었습니다
          </p>
        </div>

        {/* 주문 번호 */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-black tracking-widest uppercase">
            주문 번호
          </p>
          <p className="text-base font-mono text-black tracking-wider">
            #{orderNumber}
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col items-center gap-4 w-full mt-4">
          <button
            onClick={() => navigate("/")}
            className="w-full max-w-xs bg-black text-white text-sm tracking-widest py-4 hover:bg-black/80 transition-colors"
          >
            쇼핑 계속하기
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="w-full max-w-xs border border-black text-black text-sm tracking-widest py-4 hover:bg-black/5 transition-colors"
          >
            주문 내역 보기
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderCompletePage;
