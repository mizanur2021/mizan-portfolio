import { AdminHeader } from "@/components/admin/admin-header";
import { ProjectForm } from "../project-form";

export const metadata = { robots: { index: false, follow: false } };

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-bg text-white">
      <AdminHeader title="Add project" />
      <div className="mx-auto max-w-2xl px-6 py-8">
        <ProjectForm />
      </div>
    </main>
  );
}
