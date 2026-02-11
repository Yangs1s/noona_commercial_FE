import Header from "./Header";
import Footer from "./Footer";
import { ToastMessage } from "@/components/common/ToastMessage";

export default function ShoppingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />

      <ToastMessage />
    </div>
  );
}
