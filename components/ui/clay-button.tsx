import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "soft" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(145deg,#6d7cff,#4a5ae8)] shadow-[6px_8px_18px_rgba(74,90,232,0.35),inset_3px_3px_6px_rgba(255,255,255,0.35),inset_-3px_-3px_8px_rgba(20,30,120,0.35)] hover:brightness-110",
  soft: "clay-sm !rounded-full text-ink hover:text-[var(--ring)]",
  ghost: "text-ink-2 hover:bg-sunken",
};

export const buttonClass = (variant: Variant = "primary", className?: string) => cn(base, variants[variant], className);

export function ClayButton({ variant = "primary", className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={buttonClass(variant, className)} {...rest} />;
}

export function ClayLink({ variant = "primary", className, ...rest }: React.ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...rest} />;
}
