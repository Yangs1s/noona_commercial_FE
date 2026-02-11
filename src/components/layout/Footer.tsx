import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 px-6 md:px-12 py-8 border-t border-border">
      <div className="flex items-center gap-3">
        <div className="size-2 bg-primary dark:bg-white rounded-full" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          &copy; {new Date().getFullYear()} ShopMinimal Studio.
        </span>
      </div>

      <nav className="flex items-center gap-8">
        <Link
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary dark:hover:text-white transition-colors"
          to="/instagram"
        >
          Instagram
        </Link>
        <Link
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary dark:hover:text-white transition-colors"
          to="/privacy"
        >
          Privacy
        </Link>
        <Link
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary dark:hover:text-white transition-colors"
          to="/terms"
        >
          Terms
        </Link>
      </nav>
    </footer>
  );
}
