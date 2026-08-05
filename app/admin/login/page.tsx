import { LoginForm } from "./login-form";

export const metadata = { robots: { index: false, follow: false } };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <LoginForm next={next && next.startsWith("/admin") ? next : "/admin"} />
    </main>
  );
}
