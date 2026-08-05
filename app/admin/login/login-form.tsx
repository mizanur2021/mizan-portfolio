"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { login, type LoginState } from "./actions";
import { Button } from "@/components/ui/button";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, undefined);

  return (
    <form action={formAction} className="glass w-full max-w-sm rounded-2xl p-8">
      <input type="hidden" name="next" value={next} />

      <div className="mb-6 flex flex-col items-center text-center">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <Lock size={20} />
        </div>
        <h1 className="mt-4 font-display text-xl font-bold">Admin Login</h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage your Work projects.</p>
      </div>

      <label className="block text-xs font-medium text-muted" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoFocus
        className="mt-1.5 w-full rounded-lg border border-line bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/50"
      />

      {state?.error && <p className="mt-2 text-sm text-red-400">{state.error}</p>}

      <Button type="submit" disabled={pending} className="mt-5 w-full justify-center">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
