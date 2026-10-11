"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

const subscribe = () => () => {};

/** Three-way segmented clay switch: light · system · dark. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  // Avoid hydration mismatch: theme is only known on the client.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <div role="radiogroup" aria-label="Colour theme" className={cn("clay-inset flex gap-1 !rounded-full p-1", className)}>
      {options.map(({ value, label, icon: I }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "grid size-8 place-items-center rounded-full text-muted transition-all",
              active && "clay-sm !rounded-full text-[var(--ring)]",
            )}
          >
            <I className="size-4" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
