import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/content/modules";

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article" | "li";
  size?: "md" | "sm";
  /** Tints the card with a care-level pastel. */
  tone?: Tone;
  interactive?: boolean;
};

/** The base clay surface every card in the app is built on. */
export function ClayCard({ as = "div", size = "md", tone, interactive, className, ...rest }: Props) {
  const Tag = as as "div";
  return (
    <Tag
      className={cn(
        size === "md" ? "clay p-6 sm:p-7" : "clay-sm p-4 sm:p-5",
        tone && `tone-${tone} bg-tone-soft`,
        interactive && "transition-transform duration-300 hover:-translate-y-1 focus-within:-translate-y-1",
        className,
      )}
      {...rest}
    />
  );
}
