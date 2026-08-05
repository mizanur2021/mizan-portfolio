import Link from "next/link";
import Image from "next/image";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-primary shadow-glow">
        <Image src="/logo.png" alt="Mizan" width={64} height={64} className="object-cover" />
      </div>

      <p className="relative mt-8 font-display text-7xl font-bold text-gradient sm:text-8xl">
        404
      </p>
      <h1 className="relative mt-4 font-display text-2xl font-bold sm:text-3xl">
        This page took a wrong turn
      </h1>
      <p className="relative mt-3 max-w-md text-sm text-muted sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
      </p>

      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button size="lg">
            <Home size={16} /> Back to home
          </Button>
        </Link>
        <Link href="/#contact">
          <Button size="lg" variant="outline">
            <ArrowLeft size={16} /> Contact me instead
          </Button>
        </Link>
      </div>
    </main>
  );
}
