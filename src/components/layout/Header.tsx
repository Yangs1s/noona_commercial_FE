import { Search, ShoppingCart, Menu, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/features/store";
import { logout } from "@/features/user/userSlice";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector<RootState, RootState["user"]>(
    (state) => state.user,
  );
  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-8 border-b border-border sticky top-0 bg-white/90 dark:bg-background/90 backdrop-blur-md z-50">
      <div className="flex items-center gap-3 shrink-0">
        <div className="size-2 bg-primary dark:bg-white rounded-full" />
        <h1 className="text-base font-bold tracking-[0.2em] uppercase">
          ShopMinimal
        </h1>
      </div>

      <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
        <Link
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary dark:hover:text-white transition-colors"
          to="/new-arrivals"
        >
          New Arrivals
        </Link>
        <Link
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary dark:hover:text-white transition-colors"
          to="/collections"
        >
          Collections
        </Link>
        <Link
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary dark:hover:text-white transition-colors"
          to="/about"
        >
          About
        </Link>
      </nav>

      <div className="flex items-center gap-6 shrink-0">
        <Button variant={"ghost"}>
          <Search className="size-5" />
        </Button>

        <div className="relative">
          <Button variant={"ghost"}>
            <ShoppingCart className="size-5" />
          </Button>
          <span className="absolute -top-1 -right-1 bg-primary dark:bg-white text-[8px] text-white dark:text-black size-3.5 flex items-center justify-center rounded-full font-bold">
            1
          </span>
        </div>
        {user ? (
          <>
            <Link
              to={`${user.level === "admin" ? "/admin/inventory" : "/mypage"}`}
            >
              <Button variant={"ghost"}>
                <User className="size-5" />
              </Button>
            </Link>
            <Button
              variant={"ghost"}
              onClick={() => dispatch(logout({ navigate }))}
            >
              <LogOut className="size-5" />
            </Button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary dark:hover:text-white transition-colors"
          >
            Login
          </Link>
        )}
        <Button variant={"ghost"} className="md:hidden">
          <Menu className="size-5" />
        </Button>
      </div>
    </header>
  );
}
