import {
  Search,
  ShoppingCart,
  Menu,
  LogOut,
  X,
  LayoutDashboard,
  ClipboardList,
  CircleUser,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/features/store";
import { logout } from "@/features/user/userSlice";
import { useEffect, useRef, useState } from "react";
import type { User as UserType } from "@/types/user.type";

const NAV_LINKS = [
  { label: "All Products", to: "/" },
  { label: "About", to: "/about" },
];

const navLinkClass =
  "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary dark:hover:text-white transition-colors";

const mobileNavButtonClass =
  "w-full justify-start text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary";

const mobileUserButtonClass =
  "w-full justify-start gap-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary";

// ─── Sub Components ───────────────────────────────────────────────────────────

function Logo() {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="size-2 bg-primary dark:bg-white rounded-full" />
      <Link to="/">
        <h1 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase">
          ShopMinimal
        </h1>
      </Link>
    </div>
  );
}

function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
      {NAV_LINKS.map(({ label, to }) => (
        <Link key={to} className={navLinkClass} to={to}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

function CartButton({ cartQty }: { cartQty: number }) {
  return (
    <div className="relative">
      <Link to="/cart">
        <ShoppingCart className="size-5" />
      </Link>
      <span className="absolute -top-1 -right-1 bg-primary dark:bg-white text-[8px] text-white dark:text-black size-3.5 flex items-center justify-center rounded-full font-bold">
        {cartQty}
      </span>
    </div>
  );
}

function UserDropdown({
  user,
  onLogout,
}: {
  user: UserType;
  onLogout: () => void;
}) {
  const isAdmin = user.level === "admin";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const close = () => setOpen(false);

  return (
    <div className="relative hidden sm:block" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <CircleUser className="size-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-9 w-44 bg-white dark:bg-background border border-border shadow-lg py-1 z-50">
          <Link
            to="/orders"
            onClick={close}
            className="flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-muted/40 transition-colors"
          >
            <ClipboardList className="size-4" />
            내 주문
          </Link>

          {isAdmin && (
            <Link
              to="/admin/inventory"
              onClick={close}
              className="flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-muted/40 transition-colors"
            >
              <LayoutDashboard className="size-4" />
              Admin
            </Link>
          )}

          <div className="border-t border-border mt-1 pt-1">
            <button
              onClick={() => {
                onLogout();
                close();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-muted/40 transition-colors cursor-pointer"
            >
              <LogOut className="size-4" />
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  user,
  onClose,
  onLogout,
}: {
  user: UserType | null;
  onClose: () => void;
  onLogout: () => void;
}) {
  const isAdmin = user?.level === "admin";

  return (
    <nav className="md:hidden border-t border-border px-4 py-6 space-y-4 bg-white dark:bg-background">
      {NAV_LINKS.map(({ label, to }) => (
        <Button
          key={to}
          asChild
          variant="ghost"
          className={mobileNavButtonClass}
        >
          <Link to={to} onClick={onClose}>
            {label}
          </Link>
        </Button>
      ))}

      <div className="border-t border-border pt-4">
        {user ? (
          <div className="space-y-1">
            <Button asChild variant="ghost" className={mobileUserButtonClass}>
              <Link to="/orders" onClick={onClose}>
                <ClipboardList className="size-4" />
                내 주문
              </Link>
            </Button>
            {isAdmin && (
              <Button asChild variant="ghost" className={mobileUserButtonClass}>
                <Link to="/admin/inventory" onClick={onClose}>
                  <LayoutDashboard className="size-4" />
                  Admin
                </Link>
              </Button>
            )}
            <Button
              variant="ghost"
              className={mobileUserButtonClass}
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              <LogOut className="size-4" />
              로그아웃
            </Button>
          </div>
        ) : (
          <Button asChild variant="ghost" className={mobileNavButtonClass}>
            <Link to="/login" onClick={onClose}>
              Login
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useSelector<RootState, RootState["user"]>(
    (state) => state.user,
  );
  const { cartQty } = useSelector<RootState, RootState["cart"]>(
    (state) => state.cart,
  );

  const handleLogout = () => dispatch(logout({ navigate }));
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 bg-white/90 dark:bg-background/90 backdrop-blur-md z-50 border-b border-border">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-6 md:py-8">
        <Logo />
        <DesktopNav />

        {/* 아이콘 버튼들 */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <Button variant="ghost" size="icon">
            <Search className="size-5" />
          </Button>

          <CartButton cartQty={cartQty} />

          {user ? (
            <UserDropdown user={user} onLogout={handleLogout} />
          ) : (
            <Button
              asChild
              variant="ghost"
              className={`hidden sm:inline-flex ${navLinkClass}`}
            >
              <Link to="/login">Login</Link>
            </Button>
          )}

          <Button
            variant="ghost"
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

      {mobileMenuOpen && (
        <MobileMenu
          user={user}
          onClose={closeMobileMenu}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
}
