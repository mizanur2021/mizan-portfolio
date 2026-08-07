"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { X } from "lucide-react";
import type { Project } from "@/data/content";
import { saveProject, type SaveProjectState } from "./actions";
import { Button } from "@/components/ui/button";

const CATEGORIES: Project["category"][] = [
  "YouTube SEO",
  "Meta Ads",
  "Google Ads",
  "WordPress",
  "Social Media",
];

const inputClass =
  "mt-1.5 w-full rounded-lg border border-line bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/50";
const fileInputClass =
  "mt-2 block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Saving…" : "Save project"}
    </Button>
  );
}

export function ProjectForm({ project }: { project?: Project }) {
  const isEdit = Boolean(project);
  const [keepImages, setKeepImages] = useState<string[]>(project?.images ?? []);
  const [state, formAction] = useActionState<SaveProjectState, FormData>(saveProject, undefined);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="mode" value={isEdit ? "edit" : "create"} />
      {isEdit && <input type="hidden" name="id" value={project!.id} />}

      <div>
        <label className="block text-xs font-medium text-muted" htmlFor="title">
          Title
        </label>
        <input id="title" name="title" defaultValue={project?.title} required className={inputClass} />
      </div>

      <div>
        <label className="block text-xs font-medium text-muted" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue={project?.category ?? CATEGORIES[0]}
          className={inputClass}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted" htmlFor="description">
          Short description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={project?.description}
          rows={2}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-muted" htmlFor="result">
          Headline result (e.g. &quot;4.2x channel views in 90 days&quot;)
        </label>
        <input id="result" name="result" defaultValue={project?.result} required className={inputClass} />
      </div>

      <div>
        <label className="block text-xs font-medium text-muted" htmlFor="tags">
          Tags (comma-separated)
        </label>
        <input id="tags" name="tags" defaultValue={project?.tags.join(", ")} className={inputClass} />
      </div>

      <div>
        <p className="block text-xs font-medium text-muted">Before/after metrics (up to 3, optional)</p>
        <div className="mt-1.5 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-3 gap-2">
              <input
                name="metric_label"
                defaultValue={project?.metrics[i]?.label}
                placeholder="Label"
                className="rounded-lg border border-line bg-white/[0.03] px-3 py-2 text-xs outline-none transition-colors focus:border-primary/50"
              />
              <input
                name="metric_before"
                defaultValue={project?.metrics[i]?.before}
                placeholder="Before"
                className="rounded-lg border border-line bg-white/[0.03] px-3 py-2 text-xs outline-none transition-colors focus:border-primary/50"
              />
              <input
                name="metric_after"
                defaultValue={project?.metrics[i]?.after}
                placeholder="After"
                className="rounded-lg border border-line bg-white/[0.03] px-3 py-2 text-xs outline-none transition-colors focus:border-primary/50"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted" htmlFor="cover">
          Cover image {isEdit && "(leave empty to keep current)"}
        </label>
        {project?.cover && (
          <div className="relative mt-2 h-32 w-48 overflow-hidden rounded-lg bg-white/5">
            <Image src={project.cover} alt="" fill sizes="200px" className="object-cover" />
          </div>
        )}
        <input
          id="cover"
          type="file"
          name="cover"
          accept="image/*"
          required={!isEdit}
          className={fileInputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-muted" htmlFor="images">
          Gallery images
        </label>
        {keepImages.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {keepImages.map((src) => (
              <div key={src} className="relative h-20 w-28 overflow-hidden rounded-lg bg-white/5">
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                <input type="hidden" name="existing_images" value={src} />
                <button
                  type="button"
                  onClick={() => setKeepImages((imgs) => imgs.filter((s) => s !== src))}
                  aria-label="Remove image"
                  className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/70 text-white"
                >
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
        <input id="images" type="file" name="images" accept="image/*" multiple className={fileInputClass} />
      </div>

      {state?.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
