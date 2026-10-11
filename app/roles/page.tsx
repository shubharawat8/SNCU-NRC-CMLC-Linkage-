import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { ClayCard } from "@/components/ui/clay-card";
import { Icon } from "@/components/ui/icon";
import { IconBadge } from "@/components/ui/icon-badge";
import { communityFocus, communityNote, rolesAndResponsibilities } from "@/lib/content/guideline";
import { getModule } from "@/lib/content/modules";

export const metadata: Metadata = { title: "Roles", description: "Roles and responsibilities across the post-SNCU pathway." };

const focusTone = { FEED: "clmc", GROW: "followup", CHECK: "sncu", "REFER & FOLLOW-UP": "community" } as const;

export default function RolesPage() {
  return (
    <Container>
      <PageHeader eyebrow="Sections 11 – 12" title="Roles & responsibilities" description="Who does what — from the SNCU to the household — so that no infant falls between two levels of care." />

      <ul className="grid gap-5 md:grid-cols-2">
        {rolesAndResponsibilities.map((r) => {
          const m = getModule(r.module)!;
          return (
            <li key={r.team}>
              <Link href={`/modules/${m.slug}`} className={`clay-sm tone-${m.tone} flex h-full gap-4 p-5 transition-transform hover:-translate-y-1`}>
                <IconBadge tone={m.tone}><Icon name={m.icon} className="size-6" /></IconBadge>
                <div>
                  <p className="font-display text-lg font-semibold">{r.team}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{r.text}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="mt-20">
        <SectionHeader eyebrow="Section 12" title="Community follow-up after SNCU discharge" description="Four core areas for ASHA, ANM and AWW." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {communityFocus.map((c) => (
            <ClayCard key={c.area} tone={focusTone[c.area as keyof typeof focusTone]}>
              <p className="font-display text-xl font-semibold text-tone">{c.area}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink">{c.text}</p>
            </ClayCard>
          ))}
        </div>
        <p className="clay-inset mt-6 p-5 text-ink-2">{communityNote}</p>
      </section>
    </Container>
  );
}
