"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="no-print sticky top-3 z-50 px-3 sm:px-6">
      <nav aria-label="Main" className="clay mx-auto flex max-w-7xl items-center gap-3 !rounded-full px-3 py-2 sm:px-4">
        <Link href="/" className="flex items-center gap-2 rounded-full pr-2" onClick={() => setOpen(false)}>
          <Logo />
          <span className="hidden font-display text-base font-semibold leading-tight sm:block">
            Post-SNCU <span className="text-[var(--ring)]">Linkage</span>
          </span>
        </Link>

        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-semibold text-ink-2 transition-colors hover:text-ink",
                  isActive(href) && "clay-inset !rounded-full text-[var(--ring)]",
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />
          <button
            className="clay-sm grid size-10 place-items-center !rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-nav" className="clay mx-auto mt-3 max-w-7xl p-3 lg:hidden">
          <ul className="grid gap-1 sm:grid-cols-2">
            {navLinks.map(({ href, label, icon: I }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn("flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-ink-2", isActive(href) && "clay-inset text-[var(--ring)]")}
                >
                  <I className="size-5" aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
