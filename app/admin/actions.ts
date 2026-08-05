"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put, del } from "@vercel/blob";
import { createProject, updateProject, deleteProject, getProject, getProjects } from "@/lib/db";
import { destroySessionCookie } from "@/lib/auth";
import { projects as staticProjects, type Project } from "@/data/content";

/** Thrown for validation failures we want to show the admin verbatim (never leaks internals). */
class ValidationError extends Error {}

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB — SVG intentionally excluded (can carry embedded <script>)

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function validateImageFile(file: File) {
  const ext = ALLOWED_IMAGE_TYPES[file.type];
  if (!ext) {
    throw new ValidationError(`"${file.name}" isn't a supported image type. Use JPEG, PNG, WebP, or GIF.`);
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new ValidationError(`"${file.name}" is too large — max 8MB per image.`);
  }
  return ext;
}

/** Never trust the client-supplied filename for the storage path — random name + validated extension only. */
function randomBlobName(ext: string) {
  return `work/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
}

async function uploadImage(file: File): Promise<string> {
  const ext = validateImageFile(file);
  const blob = await put(randomBlobName(ext), file, { access: "public" });
  return blob.url;
}

async function uploadIfFile(value: FormDataEntryValue | null): Promise<string | null> {
  if (value instanceof File && value.size > 0) {
    return uploadImage(value);
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

export type SaveProjectState = { error?: string } | undefined;

export async function saveProject(
  _prevState: SaveProjectState,
  formData: FormData
): Promise<SaveProjectState> {
  const isEdit = formData.get("mode") === "edit";
  const existingId = formData.get("id") as string;
  const title = ((formData.get("title") as string) ?? "").trim();
  const id = isEdit ? existingId : slugify(title);

  try {
    if (!title) throw new ValidationError("Title is required.");
    if (!id) throw new ValidationError("Couldn't generate a URL slug from that title — add some letters or numbers.");

    const existing = isEdit ? await getProject(id) : null;
    if (isEdit && !existing) throw new ValidationError("That project no longer exists.");

    const uploadedCover = await uploadIfFile(formData.get("cover"));
    const cover = uploadedCover ?? existing?.cover ?? "";
    if (!cover) throw new ValidationError("A cover image is required.");

    const galleryFiles = formData
      .getAll("images")
      .filter((f): f is File => f instanceof File && f.size > 0);
    const uploadedGallery = await Promise.all(galleryFiles.map(uploadImage));
    const keptExisting = formData.getAll("existing_images") as string[];
    const images = [...keptExisting, ...uploadedGallery];

    const project: Project = {
      id,
      title,
      category: formData.get("category") as Project["category"],
      cover,
      images: images.length ? images : [cover],
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
  } catch (err) {
    if (err instanceof ValidationError) {
      return { error: err.message };
    }
    if (!isEdit && (err as { code?: string })?.code === "23505") {
      return { error: `A project with the URL "/work/${id}" already exists — try a different title.` };
    }
    // Never echo raw DB/Blob SDK error text back to the client — it can
    // include connection details. Full detail goes to server logs only.
    console.error("[admin] saveProject failed:", err);
    return { error: "Something went wrong while saving. Please try again." };
  }

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
