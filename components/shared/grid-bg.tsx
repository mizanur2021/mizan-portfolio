/** Animated faint grid + gradient blobs used as section ambience. */
export function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[120px] animate-pulse [animation-duration:6s]" />
      <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-secondary/15 blur-[140px] animate-pulse [animation-duration:8s]" />
    </div>
  );
}
