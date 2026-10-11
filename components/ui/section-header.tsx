import { cn } from "@/lib/utils";

export function SectionHeader({ eyebrow, title, description, align = "left", className, action }: {
  eyebrow?: string; title: string; description?: React.ReactNode; align?: "left" | "center"; className?: string; action?: React.ReactNode;
}) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4", align === "center" && "flex-col items-center text-center", className)}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ring)]">{eyebrow}</p>}
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
        {description && <p className="mt-3 text-base leading-relaxed text-ink-2">{description}</p>}
      </div>
      {action}
    </div>
  );
}
