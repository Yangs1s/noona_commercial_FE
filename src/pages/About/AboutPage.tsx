const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-2xl mx-auto space-y-20">

        {/* 헤더 */}
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/30">
            About
          </p>
          <h1 className="font-serif text-5xl text-black font-thin leading-tight">
            ShopMinimal
          </h1>
          <p className="text-sm text-black/50 leading-relaxed tracking-wide">
            미니멀한 쇼핑 경험을 위한 프로젝트입니다.
          </p>
        </div>

        {/* 소개 */}
        <div className="space-y-6">
          <p className="text-sm leading-8 text-black/70">
            ShopMinimal은 Node.js + React 풀스택 학습 프로젝트로,
            실제 이커머스 서비스의 핵심 기능을 직접 구현하는 것을 목표로
            만들었습니다. 복잡한 UI보다 명확한 사용자 경험에 집중했습니다.
          </p>
        </div>

        <div className="border-t border-black/5" />

        {/* 기술 스택 */}
        <div className="space-y-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/30">
            Tech Stack
          </p>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {[
              { label: "Frontend", value: "React · TypeScript · Redux Toolkit" },
              { label: "Styling", value: "Tailwind CSS · shadcn/ui" },
              { label: "Backend", value: "Node.js · Express" },
              { label: "Database", value: "MongoDB · Mongoose" },
              { label: "Auth", value: "JWT · Google OAuth" },
              { label: "Image", value: "Cloudinary" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] uppercase tracking-widest text-black/30 mb-1">
                  {label}
                </p>
                <p className="text-sm text-black">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-black/5" />

        {/* 주요 기능 */}
        <div className="space-y-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/30">
            Features
          </p>
          <ul className="space-y-3">
            {[
              "상품 목록 조회 및 검색 / 필터",
              "장바구니 담기 · 수량 조절 · 삭제",
              "신용카드 / 무통장 입금 결제",
              "실시간 재고 확인 및 차감",
              "주문 내역 무한 스크롤",
              "어드민 — 재고 관리 · 주문 상태 변경",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-black/70"
              >
                <span className="mt-2 w-1 h-1 rounded-full bg-black/30 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
