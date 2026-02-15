import { Search, ShoppingCart, Menu, User, LogOut, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/features/store";
import { logout } from "@/features/user/userSlice";
import { useState } from "react";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useSelector<RootState, RootState["user"]>(
    (state) => state.user,
  );
  return (
    <header className="sticky top-0 bg-white/90 dark:bg-background/90 backdrop-blur-md z-50 border-b border-border">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-6 md:py-8">
        <div className="flex items-center gap-3 shrink-0">
          <div className="size-2 bg-primary dark:bg-white rounded-full" />
          <h1 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase">
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

        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <Button variant={"ghost"} size="icon">
            <Search className="size-5" />
          </Button>

          <div className="relative">
            <Button variant={"ghost"} size="icon">
              <ShoppingCart className="size-5" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-primary dark:bg-white text-[8px] text-white dark:text-black size-3.5 flex items-center justify-center rounded-full font-bold">
              1
            </span>
          </div>
          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to={`${user.level === "admin" ? "/admin/inventory" : "/mypage"}`}
              >
                <Button variant={"ghost"} size="icon">
                  <User className="size-5" />
                </Button>
              </Link>
              <Button
                variant={"ghost"}
                size="icon"
                className="cursor-pointer"
                onClick={() => dispatch(logout({ navigate }))}
              >
                <LogOut className="size-5" />
              </Button>
            </div>
          ) : (
            <Button
              asChild
              variant="ghost"
              className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary dark:hover:text-white transition-colors"
            >
              <Link to="/login">Login</Link>
            </Button>
          )}
          <Button
            variant={"ghost"}
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border px-4 py-6 space-y-4 bg-white dark:bg-background">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
          >
            <Link to="/new-arrivals" onClick={() => setMobileMenuOpen(false)}>
              New Arrivals
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
          >
            <Link to="/collections" onClick={() => setMobileMenuOpen(false)}>
              Collections
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
          >
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </Button>
          <div className="border-t border-border pt-4">
            {user ? (
              <div className="space-y-1">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start gap-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
                >
                  <Link
                    to={`${user.level === "admin" ? "/admin/inventory" : "/mypage"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="size-4" />
                    My Page
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
                  onClick={() => {
                    dispatch(logout({ navigate }));
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
              >
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </Button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
