import type { Metadata } from "next";
import { Thermometer, Milk, ArrowLeftRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { PathwayFlow } from "@/components/pathway/pathway-flow";
import { Callout } from "@/components/ui/callout";
import { ClayCard } from "@/components/ui/clay-card";
import { CheckList } from "@/components/ui/check-list";
import { NumberedSteps } from "@/components/ui/numbered-steps";
import { StepChain } from "@/components/ui/step-chain";
import { ClayLink } from "@/components/ui/clay-button";
import {
  clmcStepDownSteps, eligibilityGroups, followUpReferralTriggers, followUpToNrcPathway, handover, importantNotice,
  keyPrinciples, linkageClarity, samNote,
} from "@/lib/content/guideline";

export const metadata: Metadata = { title: "Pathway", description: "Post-SNCU continuum of care and referral pathway." };

const groupTone = { A: "clmc", B: "stepdown", C: "nrc" } as const;

export default function PathwayPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Sections 3 – 5 · 8 · 10"
        title="The post-SNCU pathway"
        description="Who enters the pathway, which route they take, and how every referral comes back to the community."
      >
        <ClayLink href="/discharge-check">Try the discharge check</ClayLink>
      </PageHeader>

      <PathwayFlow />

      <section className="mt-20" aria-labelledby="who">
        <SectionHeader eyebrow="Section 3" title="Infants to be considered for the pathway" />
        <div className="grid gap-6 lg:grid-cols-3">
          {eligibilityGroups.map((g) => (
            <ClayCard key={g.id} className={`tone-${groupTone[g.id]} flex flex-col`}>
              <span className="grid size-12 place-items-center rounded-2xl bg-tone font-display text-2xl font-bold text-white dark:text-[var(--bg)]">{g.id}</span>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{g.title}</h3>
              <p className="mt-1 text-sm text-muted">{g.summary}</p>
              <CheckList items={g.criteria} tone={groupTone[g.id]} className="mt-4 text-sm" />
              {g.note && <p className="mt-4 rounded-2xl bg-tone-soft p-3 text-sm text-ink">{g.note}</p>}
              <p className="mt-auto pt-5 text-sm"><span className="font-semibold text-tone">Next point of care → </span>{g.nextCare}</p>
            </ClayCard>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.1fr]" aria-labelledby="principles">
        <div>
          <SectionHeader eyebrow="Section 4" title="Key principles" />
          <CheckList items={keyPrinciples} tone="sncu" />
          <Callout kind="important" className="mt-6">{importantNotice}</Callout>
        </div>
        <div>
          <SectionHeader eyebrow="Section 5.1" title="Discharge-to-community handover" />
          <ClayCard tone="community"><p className="leading-relaxed">{handover}</p></ClayCard>
          <SectionHeader eyebrow="Section 8" title="Linkage clarity" className="mb-5 mt-10" />
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <ClayCard size="sm" tone="stepdown" className="flex items-center gap-3"><Thermometer className="size-6 shrink-0 text-tone" aria-hidden />{linkageClarity.stepDown}</ClayCard>
            <ArrowLeftRight className="mx-auto size-6 text-muted" aria-hidden />
            <ClayCard size="sm" tone="clmc" className="flex items-center gap-3"><Milk className="size-6 shrink-0 text-tone" aria-hidden />{linkageClarity.clmc}</ClayCard>
          </div>
          <p className="mt-4 text-center font-semibold text-ink-2">{linkageClarity.together}</p>
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeader eyebrow="Section 8" title="CLMC ↔ Step-down: six steps" />
          <NumberedSteps steps={clmcStepDownSteps} tone="clmc" />
        </div>
        <div>
          <SectionHeader eyebrow="Section 10" title="SNCU follow-up → NRC / appropriate referral" />
          <ClayCard>
            <p className="mb-3 font-semibold">Consider referral when an infant has:</p>
            <CheckList items={followUpReferralTriggers} tone="nrc" />
            <p className="mb-4 mt-6 font-semibold">Suggested pathway</p>
            <StepChain steps={followUpToNrcPathway} tone="nrc" />
          </ClayCard>
          <Callout kind="info" title="SAM" className="mt-6">{samNote}</Callout>
        </div>
      </section>
    </Container>
  );
}
