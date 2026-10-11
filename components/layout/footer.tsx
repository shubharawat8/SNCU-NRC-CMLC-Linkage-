import Link from "next/link";
import { guidelineMeta } from "@/lib/content/guideline";
import { navLinks } from "./nav-links";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="no-print mt-24 pb-10">
      <Container>
        <div className="clay grid gap-8 p-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo />
              <p className="font-display text-lg font-semibold">{guidelineMeta.tagline}</p>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-2">
              {guidelineMeta.title}. {guidelineMeta.subtitle}.
            </p>
            <p className="mt-3 text-xs text-muted">
              Status: {guidelineMeta.status} · Version {guidelineMeta.version}. This site summarises a draft guideline for
              programme teams; it is not a clinical decision tool. Clinical admission and referral criteria follow the latest
              approved Government of India and Uttar Pradesh protocols.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="font-semibold text-ink-2 hover:text-[var(--ring)]">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
