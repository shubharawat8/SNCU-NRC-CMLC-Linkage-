import { ArrowRight, LayoutDashboard, Route, Target } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ClayLink } from "@/components/ui/clay-button";
import { Badge, SupplementaryBadge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { Callout } from "@/components/ui/callout";
import { Icon } from "@/components/ui/icon";
import { IconBadge } from "@/components/ui/icon-badge";
import { ModuleCard } from "@/components/ui/module-card";
import { StatTile } from "@/components/ui/stat-tile";
import { Marquee } from "@/components/carousel/marquee";
import { Carousel } from "@/components/carousel/carousel";
import { PathwayFlow } from "@/components/pathway/pathway-flow";
import { FaqList } from "@/components/ui/faq-list";
import { background, guidelineMeta, importantNotice, objectives } from "@/lib/content/guideline";
import { careModules } from "@/lib/content/modules";
import { convergence, faqs, highlights } from "@/lib/content/enrichment";
import { demoReports } from "@/lib/dashboard/demo-data";
import { computeRates, fmt, pct, sumValues } from "@/lib/dashboard/metrics";

const heroBlobs = [
  { m: careModules[0], cls: "left-[8%] top-[6%]", r: "-6deg", delay: "0s" },
  { m: careModules[2], cls: "right-[6%] top-[14%]", r: "8deg", delay: "1s" },
  { m: careModules[1], cls: "left-[0%] top-[44%]", r: "4deg", delay: "2s" },
  { m: careModules[5], cls: "right-[14%] bottom-[10%]", r: "-5deg", delay: "1.5s" },
  { m: careModules[6], cls: "left-[4%] bottom-[6%]", r: "6deg", delay: "0.5s" },
];

export default function HomePage() {
  const totals = sumValues(demoReports);
  const r = computeRates(totals);

  return (
    <>
      {/* ── Hero ── */}
      <Container className="pt-10 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="nrc">{guidelineMeta.status}</Badge>
              <Badge tone="sncu">{guidelineMeta.state}</Badge>
              <Badge>Version · {guidelineMeta.version}</Badge>
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              From SNCU discharge to a <span className="bg-[linear-gradient(120deg,var(--tone-sncu),var(--tone-clmc))] bg-clip-text text-transparent">thriving infant</span> at home.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              A structured pathway linking <strong>SNCU</strong>, <strong>Step-down care</strong>, <strong>CLMC</strong> and{" "}
              <strong>NRC</strong> — so medical discharge always comes with a feeding, growth and follow-up plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ClayLink href="/pathway"><Route className="size-4" /> Explore the pathway</ClayLink>
              <ClayLink href="/dashboard" variant="soft"><LayoutDashboard className="size-4" /> Open dashboard</ClayLink>
            </div>
          </div>

          <div className="relative hidden aspect-[5/4] lg:block" aria-hidden>
            <div className="clay absolute inset-[12%] !rounded-[3rem] bg-[linear-gradient(145deg,var(--tone-sncu-soft),var(--tone-clmc-soft))]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="clay grid size-40 place-items-center !rounded-full text-center">
                <div>
                  <Icon name="baby" className="mx-auto size-12 text-[var(--ring)]" />
                  <p className="mt-1 font-display text-sm font-semibold">One baby</p>
                  <p className="text-xs text-muted">one continuum</p>
                </div>
              </div>
            </div>
            {heroBlobs.map(({ m, cls, r: rot, delay }) => (
              <div key={m.slug} className={`animate-float absolute ${cls}`} style={{ ["--r" as string]: rot, animationDelay: delay }}>
                <div className={`clay-sm tone-${m.tone} flex items-center gap-2 !rounded-full py-2 pl-2 pr-4`}>
                  <IconBadge tone={m.tone} size="sm" className="!rounded-full"><Icon name={m.icon} className="size-5" /></IconBadge>
                  <span className="text-sm font-semibold">{m.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* ── Moving principles ── */}
      <section className="mt-14" aria-labelledby="principles-h">
        <h2 id="principles-h" className="sr-only">Key messages</h2>
        <Marquee label="Key messages of the guideline" duration={55}>
          {highlights.map((h) => (
            <article key={h.title} className={`clay-sm tone-${h.tone} flex w-[19rem] shrink-0 gap-4 p-5`}>
              <IconBadge tone={h.tone} size="md"><Icon name={h.icon} className="size-6" /></IconBadge>
              <div>
                <p className="font-display font-semibold">{h.title}</p>
                <p className="mt-1 text-sm leading-snug text-ink-2">{h.body}</p>
              </div>
            </article>
          ))}
        </Marquee>
      </section>

      {/* ── Why ── */}
      <Container className="mt-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="clay p-8">
            <SectionHeader eyebrow="Background" title="Stable is not the same as ready" className="mb-5" />
            {background.paragraphs.map((p) => (
              <p key={p} className="mb-4 leading-relaxed text-ink-2">{p}</p>
            ))}
            <p className="mb-3 mt-6 text-sm font-bold uppercase tracking-wide text-muted">Infants may still need</p>
            <ul className="flex flex-wrap gap-2">
              {background.needs.map((n, i) => (
                <li key={n}><Badge tone={(["sncu", "clmc", "stepdown", "counsellor", "followup", "nrc", "community"] as const)[i % 7]}>{n}</Badge></li>
              ))}
            </ul>
          </div>
          <div className="clay p-8">
            <SectionHeader eyebrow="Objectives" title="What the pathway sets out to do" className="mb-5" />
            <ol className="space-y-3">
              {objectives.map((o, i) => (
                <li key={o} className="flex gap-4">
                  <span className="clay-inset grid size-9 shrink-0 place-items-center !rounded-full font-display font-semibold text-[var(--ring)]">{i + 1}</span>
                  <span className="pt-1.5 leading-relaxed text-ink-2">{o}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>

      {/* ── Pathway ── */}
      <Container className="mt-24">
        <SectionHeader
          eyebrow="Section 5 · Continuum of care"
          title="Three routes out of the SNCU"
          description="After medical stabilisation and a feeding assessment, each infant follows the route that matches their need — and can move between routes as that need changes."
          action={<ClayLink href="/pathway" variant="soft">Full pathway <ArrowRight className="size-4" /></ClayLink>}
        />
        <PathwayFlow />
        <Callout kind="important" className="mt-8">{importantNotice}</Callout>
      </Container>

      {/* ── Modules carousel ── */}
      <Container className="mt-24">
        <SectionHeader
          eyebrow="Modules"
          title="Every level of care, in one place"
          description="Each module gathers what the guideline asks of one level or team: its role, what it receives and sends on, what it monitors and which records it keeps."
          action={<ClayLink href="/modules" variant="soft">All modules <ArrowRight className="size-4" /></ClayLink>}
        />
        <Carousel label="Care-level modules">
          {careModules.map((m) => <ModuleCard key={m.slug} module={m} />)}
        </Carousel>
      </Container>

      {/* ── Dashboard teaser ── */}
      <Container className="mt-24">
        <div className="clay p-8 sm:p-10">
          <SectionHeader
            eyebrow="Monitoring · Section 13"
            title="A monthly view of the whole continuum"
            description="The dashboard turns the 16 monthly data points reported by Breastfeeding/Lactation Counsellors into coverage, referral-completion and counter-referral rates — with your own data kept privately in your browser."
            action={<ClayLink href="/dashboard"><LayoutDashboard className="size-4" /> Open dashboard</ClayLink>}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="SNCU graduates" value={fmt(totals.graduates)} tone="sncu" icon={<Icon name="hospital" className="size-5" />} hint="Demo data · 6 facilities · 6 months" />
            <StatTile label="Assessed before discharge" value={pct(r.assessmentCoverage)} tone="counsellor" icon={<Target className="size-5" />} hint="Breastfeeding assessment ÷ graduates" />
            <StatTile label="Referral completed" value={pct(r.referralCompletion)} tone="nrc" icon={<Icon name="salad" className="size-5" />} hint="Completed ÷ NRC/other referral" />
            <StatTile label="Linked back to community" value={pct(r.communityLinkage)} tone="community" icon={<Icon name="users" className="size-5" />} hint="Community linkage ÷ graduates" />
          </div>
        </div>
      </Container>

      {/* ── Convergence (supplementary) ── */}
      <Container className="mt-24">
        <SectionHeader
          eyebrow="Health × ICDS convergence"
          title="Plug the pathway into programmes already running"
          description={<>Where the guideline&apos;s community follow-up meets platforms ASHAs, ANMs and AWWs already use. <SupplementaryBadge /></>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {convergence.map((c, i) => (
            <div key={c.name} className="clay-sm flex gap-4 p-5">
              <IconBadge tone={(["community", "followup", "clmc", "sncu", "stepdown", "counsellor"] as const)[i % 6]}>
                <Icon name={c.icon} className="size-6" />
              </IconBadge>
              <div>
                <p className="font-display font-semibold">{c.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{c.owner}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.how}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* ── FAQ ── */}
      <Container className="mt-24">
        <SectionHeader eyebrow="Questions from the field" title="Frequently asked" description={<>Answers drawn directly from the guideline text. <SupplementaryBadge /></>} />
        <FaqList items={faqs} />
      </Container>
    </>
  );
}
