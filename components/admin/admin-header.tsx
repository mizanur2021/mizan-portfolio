import Link from "next/link";
import { LogOut } from "lucide-react";
import { logout } from "@/app/admin/actions";

export function AdminHeader({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between border-b border-line px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted">Admin</p>
        <h1 className="font-display text-lg font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/" className="text-sm text-muted transition-colors hover:text-white">
          View site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-primary/40 hover:text-primary"
          >
            <LogOut size={14} /> Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
