import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CartEmpty = () => {
  return (
    <div className="flex min-h-[calc(100vh-180px)] flex-col items-center justify-center px-8">
      <h2 className="mb-8 font-serif text-3xl text-black">
        장바구니가 비어있습니다
      </h2>
      <Link to="/">
        <Button className="bg-black text-white hover:bg-black/90">
          <ArrowLeft className="mr-2 h-4 w-4" />
          쇼핑 계속하기
        </Button>
      </Link>
    </div>
  );
};

export default CartEmpty;
