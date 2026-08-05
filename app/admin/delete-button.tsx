"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { removeProject } from "./actions";

export function DeleteButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${title}"? This can't be undone.`)) {
          startTransition(() => {
            removeProject(id);
          });
        }
      }}
      aria-label={`Delete ${title}`}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
    >
      <Trash2 size={15} />
    </button>
  );
}
