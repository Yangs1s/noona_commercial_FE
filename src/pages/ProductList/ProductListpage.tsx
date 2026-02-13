import type { AppDispatch, RootState } from "@/features/store";
import { useDispatch, useSelector } from "react-redux";

const ProductListPage = () => {
  //   const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector<RootState, RootState["user"]>(
    (state) => state.user,
  );

  return (
    <div>
      <h1>ProductListPage {user?.name}</h1>
    </div>
  );
};

export default ProductListPage;
