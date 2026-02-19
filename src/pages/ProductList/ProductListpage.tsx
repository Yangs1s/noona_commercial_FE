import type { RootState } from "@/features/store";
import { useSelector } from "react-redux";

const ProductListPage = () => {
  //   const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector<RootState, RootState["user"]>(
    (state) => state.user,
  );

  return (
    <div className="flex h-screen">
      <aside className="bg-blue-400 w-1/5">
        <h1>ProductListPage {user?.name}</h1>
      </aside>
      <section className="bg-red-400 flex-1">
        <div>search bar </div>
        <div>product list</div>
        <div>pagination</div>
      </section>
    </div>
  );
};

export default ProductListPage;
