import { cn } from "@/lib/utils";

/** Infinite marquee — duplicates children for a seamless loop. */
export function Marquee({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div className="flex shrink-0 animate-marquee gap-6 pr-6 group-hover:[animation-play-state:paused]">
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-marquee gap-6 pr-6 group-hover:[animation-play-state:paused]"
      >
        {children}
      </div>
    </div>
  );
}
