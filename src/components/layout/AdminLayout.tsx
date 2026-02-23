import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  Search,
  Bell,
  CircleUser,
  LogOut,
  Menu,
  X,
  ClipboardList,
} from "lucide-react";
import { Button } from "../ui/button";
import { ToastMessage } from "@/components/common/ToastMessage";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/features/store";
import { logout } from "@/features/user/userSlice";
import { useState } from "react";

const sidebarLinks = [
  { to: "/admin/inventory", label: "Inventory", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* 모바일 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 border-r border-border h-screen flex flex-col bg-white dark:bg-background z-50 transition-transform duration-200",
          "fixed lg:sticky top-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="px-8 py-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="size-2 bg-primary dark:bg-white rounded-full" />
              <h1 className="text-base font-bold tracking-[0.2em] uppercase">
                ShopMinimal
              </h1>
            </div>
            <div className="mt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Admin Console
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {sidebarLinks.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] border-l-2 transition-all",
                  isActive
                    ? "text-primary dark:text-white border-primary dark:border-white bg-muted/50"
                    : "text-muted-foreground hover:text-primary dark:hover:text-white border-transparent",
                )}
              >
                <Icon className="size-[18px]" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="size-2 bg-border rounded-full" />
            <Link to="/">Shop으로 돌아가기</Link>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between lg:justify-end px-4 sm:px-6 lg:px-12 py-6 lg:py-8 border-b border-border sticky top-0 bg-white/90 dark:bg-background/90 backdrop-blur-md z-40">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <div className="flex items-center gap-4 sm:gap-8">
            <Button variant="ghost" size="icon">
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="size-5" />
            </Button>
            <Link to="/orders">
              <Button variant="ghost" size="icon">
                <ClipboardList className="size-5" />
              </Button>
            </Link>
            <div className="hidden sm:block h-4 w-1px bg-border" />
            <button className="hidden sm:flex items-center gap-3 group">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary dark:group-hover:text-white transition-colors">
                Admin User
              </span>
              <CircleUser className="size-6 group-hover:opacity-70 transition-opacity" />
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() => dispatch(logout({ navigate }))}
            >
              <LogOut className="size-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-12 py-6 lg:py-12">
          {children}
        </main>
      </div>

      <ToastMessage />
    </div>
  );
}
