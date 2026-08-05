import { notFound } from "next/navigation";
import { getProject } from "@/lib/db";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProjectForm } from "../../project-form";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-bg text-white">
      <AdminHeader title={`Edit — ${project.title}`} />
      <div className="mx-auto max-w-2xl px-6 py-8">
        <ProjectForm project={project} />
      </div>
    </main>
  );
}
