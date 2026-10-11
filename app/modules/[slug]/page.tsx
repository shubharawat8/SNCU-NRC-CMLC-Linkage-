import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FileText, Inbox, Send, BarChart3 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ClayCard } from "@/components/ui/clay-card";
import { Badge, SupplementaryBadge } from "@/components/ui/badge";
import { CheckList } from "@/components/ui/check-list";
import { Icon } from "@/components/ui/icon";
import { IconBadge } from "@/components/ui/icon-badge";
import { careModules, getModule } from "@/lib/content/modules";
import { sections, counsellorByPointOfCare, feedingAssessmentAreas } from "@/lib/content/guideline";

export const dynamicParams = false;
export const generateStaticParams = () => careModules.map((m) => ({ slug: m.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = getModule((await params).slug);
  return m ? { title: m.name, description: m.oneLiner } : {};
}

function ListCard({ title, icon, items, tone }: { title: string; icon: React.ReactNode; items: string[]; tone: string }) {
  return (
    <ClayCard size="sm" className={`tone-${tone}`}>
      <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-tone">{icon}{title}</p>
      <ul className="space-y-2 text-sm text-ink-2">
        {items.map((i) => <li key={i} className="rounded-xl bg-tone-soft px-3 py-2 text-ink">{i}</li>)}
      </ul>
    </ClayCard>
  );
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) notFound();
  const idx = careModules.indexOf(m);
  const prev = careModules[(idx - 1 + careModules.length) % careModules.length];
  const next = careModules[(idx + 1) % careModules.length];

  return (
    <Container className={`tone-${m.tone}`}>
      <Link href="/modules" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-2 hover:text-tone">
        <ArrowLeft className="size-4" /> All modules
      </Link>

      <header className="clay mt-6 flex flex-col gap-6 bg-tone-soft p-8 sm:flex-row sm:items-center">
        <IconBadge tone={m.tone} size="lg" className="!size-20"><Icon name={m.icon} className="size-10" /></IconBadge>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-tone">{m.fullName}</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight">{m.name}</h1>
          <p className="mt-2 max-w-2xl text-lg text-ink-2">{m.oneLiner}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {m.sections.map((n) => {
              const s = sections.find((x) => x.n === n)!;
              return <Link key={n} href={`/guideline#${s.id}`}><Badge tone={m.tone}>§{n} {s.title}</Badge></Link>;
            })}
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <ClayCard>
            <h2 className="font-display text-xl font-semibold">Role (Section 11)</h2>
            <p className="mt-3 leading-relaxed text-ink-2">{m.role}</p>
          </ClayCard>
          <ClayCard>
            <h2 className="mb-4 font-display text-xl font-semibold">What the guideline asks</h2>
            <CheckList items={m.guidance} tone={m.tone} />
          </ClayCard>

          {m.slug === "breastfeeding-counsellor" && (
            <ClayCard>
              <h2 className="mb-4 font-display text-xl font-semibold">By point of care (Section 9)</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {counsellorByPointOfCare.map((p) => (
                  <div key={p.point} className="clay-inset p-4">
                    <p className="mb-2 font-semibold text-tone">{p.point}</p>
                    <ul className="list-disc space-y-1 pl-4 text-sm text-ink-2">{p.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
                  </div>
                ))}
              </div>
            </ClayCard>
          )}

          {(m.slug === "breastfeeding-counsellor" || m.slug === "clmc") && (
            <ClayCard>
              <h2 className="mb-4 font-display text-xl font-semibold">Feeding assessment areas (Section 8, step 4)</h2>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {feedingAssessmentAreas.map((a) => (
                  <li key={a} className="clay-sm bg-tone-soft p-3 text-center text-sm font-semibold">{a}</li>
                ))}
              </ul>
            </ClayCard>
          )}

          <ClayCard>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h2 className="font-display text-xl font-semibold">Practice notes</h2>
              <SupplementaryBadge />
            </div>
            <ul className="space-y-3 text-ink-2">{m.practiceNotes.map((n) => <li key={n} className="clay-inset p-4 leading-relaxed">{n}</li>)}</ul>
          </ClayCard>
        </div>

        <aside className="space-y-6">
          <ListCard title="Receives from" icon={<Inbox className="size-4" />} items={m.receivesFrom} tone={m.tone} />
          <ListCard title="Sends on to" icon={<Send className="size-4" />} items={m.sendsTo} tone={m.tone} />
          <ListCard title="Monitors (Section 13)" icon={<BarChart3 className="size-4" />} items={m.monitors} tone={m.tone} />
          <ListCard title="Records (Section 14)" icon={<FileText className="size-4" />} items={m.records} tone={m.tone} />
        </aside>
      </div>

      <nav aria-label="Module navigation" className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link href={`/modules/${prev.slug}`} className="clay-sm flex items-center gap-3 p-5 hover:text-tone">
          <ArrowLeft className="size-5" /><span><span className="block text-xs text-muted">Previous</span><span className="font-semibold">{prev.name}</span></span>
        </Link>
        <Link href={`/modules/${next.slug}`} className="clay-sm flex items-center justify-end gap-3 p-5 text-right hover:text-tone">
          <span><span className="block text-xs text-muted">Next</span><span className="font-semibold">{next.name}</span></span><ArrowRight className="size-5" />
        </Link>
      </nav>
    </Container>
  );
}
