"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put, del } from "@vercel/blob";
import { createProject, updateProject, deleteProject, getProject, getProjects } from "@/lib/db";
import { destroySessionCookie } from "@/lib/auth";
import { projects as staticProjects, type Project } from "@/data/content";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uploadIfFile(value: FormDataEntryValue | null): Promise<string | null> {
  if (value instanceof File && value.size > 0) {
    const blob = await put(`work/${Date.now()}-${value.name}`, value, { access: "public" });
    return blob.url;
  }
  return null;
}

function parseTags(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseMetrics(formData: FormData): Project["metrics"] {
  const labels = formData.getAll("metric_label") as string[];
  const befores = formData.getAll("metric_before") as string[];
  const afters = formData.getAll("metric_after") as string[];
  const metrics: Project["metrics"] = [];
  for (let i = 0; i < labels.length; i++) {
    if (labels[i]?.trim()) {
      metrics.push({
        label: labels[i].trim(),
        before: befores[i]?.trim() ?? "",
        after: afters[i]?.trim() ?? "",
      });
    }
  }
  return metrics;
}

export async function saveProject(formData: FormData): Promise<void> {
  const isEdit = formData.get("mode") === "edit";
  const existingId = formData.get("id") as string;
  const title = (formData.get("title") as string) ?? "";
  const id = isEdit ? existingId : slugify(title);

  const existing = isEdit ? await getProject(id) : null;

  const uploadedCover = await uploadIfFile(formData.get("cover"));
  const cover = uploadedCover ?? existing?.cover ?? "";

  const galleryFiles = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0);
  const uploadedGallery = await Promise.all(
    galleryFiles.map((f) => put(`work/${Date.now()}-${f.name}`, f, { access: "public" }).then((b) => b.url))
  );
  const keptExisting = formData.getAll("existing_images") as string[];
  const images = [...keptExisting, ...uploadedGallery];

  const project: Project = {
    id,
    title,
    category: formData.get("category") as Project["category"],
    cover: cover || images[0] || "",
    images: images.length ? images : cover ? [cover] : [],
    description: (formData.get("description") as string) ?? "",
    result: (formData.get("result") as string) ?? "",
    tags: parseTags(formData.get("tags")),
    metrics: parseMetrics(formData),
  };

  if (isEdit) {
    await updateProject(id, project);
  } else {
    const all = await getProjects();
    await createProject(project, all.length);
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/work/${id}`);
  redirect("/admin");
}

export async function removeProject(id: string): Promise<void> {
  const project = await getProject(id);
  await deleteProject(id);

  // best-effort cleanup — don't fail the delete if blob removal has an issue
  if (project) {
    const urls = [project.cover, ...project.images].filter(
      (url) => url && url.includes(".public.blob.vercel-storage.com")
    );
    await Promise.allSettled(urls.map((url) => del(url)));
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

/** One-click migration of the bundled static projects into the database. Never overwrites existing rows. */
export async function seedFromStatic(): Promise<void> {
  const existing = await getProjects();
  if (existing.length > 0) return;

  for (let i = 0; i < staticProjects.length; i++) {
    await createProject(staticProjects[i], i);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function logout(): Promise<void> {
  await destroySessionCookie();
  redirect("/admin/login");
}
