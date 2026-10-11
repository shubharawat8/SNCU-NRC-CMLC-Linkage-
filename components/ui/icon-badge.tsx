import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/content/modules";

/** A puffy clay "pill" holding an icon, tinted by tone. */
export function IconBadge({ tone = "sncu", size = "md", className, children }: { tone?: Tone | string; size?: "sm" | "md" | "lg"; className?: string; children: React.ReactNode }) {
  const dims = { sm: "size-10 rounded-xl", md: "size-12 rounded-2xl", lg: "size-16 rounded-[1.4rem]" }[size];
  return (
    <span
      className={cn(
        `tone-${tone} bg-tone-soft text-tone grid shrink-0 place-items-center`,
        "shadow-[4px_5px_12px_rgba(0,0,0,0.12),inset_3px_3px_6px_rgba(255,255,255,0.55),inset_-3px_-3px_6px_rgba(0,0,0,0.08)]",
        "dark:shadow-[4px_5px_12px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.08),inset_-3px_-3px_6px_rgba(0,0,0,0.3)]",
        dims,
        className,
      )}
    >
      {children}
    </span>
  );
}
