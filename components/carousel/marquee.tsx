import { cn } from "@/lib/utils";

/**
 * Infinite, continuously moving strip. Content is rendered twice and the
 * track slides by 50% so the loop is seamless. Pauses on hover/focus and
 * stops entirely under prefers-reduced-motion.
 */
export function Marquee({ children, duration = 40, reverse, className, label }: { children: React.ReactNode; duration?: number; reverse?: boolean; className?: string; label: string }) {
  return (
    <div
      role="region"
      aria-label={label}
      className={cn("marquee-pause relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]", className)}
    >
      <div
        className="animate-marquee flex w-max gap-5 py-6"
        style={{ ["--marquee-duration" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : undefined }}
      >
        <div className="flex gap-5">{children}</div>
        <div className="flex gap-5" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
