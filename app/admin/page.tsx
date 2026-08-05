import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getProjects } from "@/lib/db";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "./delete-button";
import { seedFromStatic } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function AdminDashboard() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-bg text-white">
      <AdminHeader title="Work Projects" />
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </p>
          <Link
            href="/admin/new"
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus size={16} /> Add project
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line p-10 text-center text-sm text-muted">
            <p>No projects yet.</p>
            <p className="mt-1">
              Click &quot;Add project&quot; to create one, or import the {" "}
              projects already on your live site to start from those.
            </p>
            <form action={seedFromStatic} className="mt-4">
              <button
                type="submit"
                className="rounded-full border border-line px-4 py-2 text-sm text-white transition-colors hover:border-primary/40 hover:text-primary"
              >
                Import existing projects from the site
              </button>
            </form>
          </div>
        ) : (
          <div className="divide-y divide-line rounded-xl border border-line">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-4">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-white/5">
                  {p.cover && (
                    <Image src={p.cover} alt={p.title} fill sizes="80px" className="object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{p.title}</p>
                  <p className="text-xs text-muted">
                    {p.category} · {p.id}
                  </p>
                </div>
                <Link
                  href={`/admin/${p.id}/edit`}
                  aria-label={`Edit ${p.title}`}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Pencil size={15} />
                </Link>
                <DeleteButton id={p.id} title={p.title} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
