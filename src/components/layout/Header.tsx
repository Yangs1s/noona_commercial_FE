import {
  Search,
  ShoppingCart,
  Menu,
  LogOut,
  X,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/features/store";
import { logout } from "@/features/user/userSlice";
import { useState } from "react";
import type { User as UserType } from "@/types/user.type";

const NAV_LINKS = [
  { label: "All Products", to: "/" },
  { label: "Collections", to: "/collections" },
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

function DesktopUserActions({
  user,
  onLogout,
}: {
  user: UserType;
  onLogout: () => void;
}) {
  const isAdmin = user.level === "admin";

  return (
    <div className="hidden sm:flex items-center gap-3">
      {!isAdmin && (
        <Link to="/orders">
          <ClipboardList className="size-5" />
        </Link>
      )}
      {isAdmin && (
        <Link to="/admin/inventory">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <LayoutDashboard className="size-5" />
          </Button>
        </Link>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={onLogout}
      >
        <LogOut className="size-5" />
      </Button>
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
            {isAdmin && (
              <Button asChild variant="ghost" className={mobileUserButtonClass}>
                <Link to="/admin/inventory" onClick={onClose}>
                  <LayoutDashboard className="size-4" />
                  Admin
                </Link>
              </Button>
            )}
            {!isAdmin && (
              <Button asChild variant="ghost" className={mobileUserButtonClass}>
                <Link to="/orders" onClick={onClose}>
                  <ClipboardList className="size-4" />
                  주문 내역
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
              Logout
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
            <DesktopUserActions user={user} onLogout={handleLogout} />
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
