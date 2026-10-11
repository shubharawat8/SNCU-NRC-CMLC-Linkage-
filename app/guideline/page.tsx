import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ClayCard } from "@/components/ui/clay-card";
import { CheckList } from "@/components/ui/check-list";
import { Callout } from "@/components/ui/callout";
import { NumberedSteps } from "@/components/ui/numbered-steps";
import { StepChain } from "@/components/ui/step-chain";
import { PathwayFlow } from "@/components/pathway/pathway-flow";
import { buttonClass } from "@/components/ui/clay-button";
import { SupplementaryBadge } from "@/components/ui/badge";
import * as g from "@/lib/content/guideline";
import { dataPoints } from "@/lib/dashboard/indicators";
import { glossary } from "@/lib/content/enrichment";

export const metadata: Metadata = { title: "Guideline", description: "Full text of the post-SNCU linkage guideline, section by section." };

function Section({ n, id, title, children }: { n: number; id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="mb-5 flex items-center gap-3 font-display text-2xl font-semibold">
        <span className="clay-inset grid size-11 shrink-0 place-items-center !rounded-full text-base text-[var(--ring)]">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

const Table = ({ head, rows }: { head: [string, string]; rows: [string, string][] }) => (
  <div className="clay-sm overflow-x-auto p-2">
    <table className="w-full min-w-[32rem] text-left text-sm">
      <thead><tr>{head.map((h) => <th key={h} scope="col" className="px-4 py-3 font-bold uppercase tracking-wide text-muted">{h}</th>)}</tr></thead>
      <tbody>
        {rows.map(([a, b]) => (
          <tr key={a} className="border-t border-line align-top">
            <th scope="row" className="w-1/3 px-4 py-3 font-semibold">{a}</th>
            <td className="px-4 py-3 leading-relaxed text-ink-2">{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function GuidelinePage() {
  return (
    <Container>
      <PageHeader eyebrow={`${g.guidelineMeta.status} · ${g.guidelineMeta.version}`} title="The guideline" description={g.guidelineMeta.title}>
        <a href="/guideline.docx" download className={buttonClass("soft")}><Download className="size-4" /> Download source (.docx)</a>
      </PageHeader>

      <div className="grid gap-10 lg:grid-cols-[17rem_1fr]">
        <nav aria-label="Sections" className="lg:sticky lg:top-28 lg:self-start">
          <ol className="clay-sm max-h-[70vh] space-y-0.5 overflow-y-auto p-3 text-sm">
            {g.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="flex gap-2 rounded-xl px-3 py-2 text-ink-2 hover:bg-sunken hover:text-ink">
                  <span className="w-5 shrink-0 font-semibold text-[var(--ring)]">{s.n}</span>{s.title}
                </a>
              </li>
            ))}
            <li><a href="#glossary" className="flex gap-2 rounded-xl px-3 py-2 text-ink-2 hover:bg-sunken"><span className="w-5" />Glossary</a></li>
          </ol>
        </nav>

        <article className="space-y-16">
          <Section n={1} id="background" title="Background">
            {g.background.paragraphs.map((p) => <p key={p} className="mb-4 leading-relaxed text-ink-2">{p}</p>)}
            <CheckList items={g.background.needs} />
          </Section>

          <Section n={2} id="objectives" title="Objectives"><CheckList items={g.objectives} /></Section>

          <Section n={3} id="eligibility" title="Infants to be Considered for the Pathway">
            <div className="space-y-5">
              {g.eligibilityGroups.map((e) => (
                <ClayCard key={e.id} size="sm">
                  <p className="font-display text-lg font-semibold">{e.id}. {e.title}</p>
                  <CheckList items={e.criteria} className="mt-3" />
                  {e.note && <p className="mt-3 text-ink-2">{e.note}</p>}
                </ClayCard>
              ))}
            </div>
          </Section>

          <Section n={4} id="principles" title="Key Principles">
            <CheckList items={g.keyPrinciples} />
            <Callout kind="important" className="mt-6">{g.importantNotice}</Callout>
          </Section>

          <Section n={5} id="continuum" title="Post-SNCU Continuum of Care and Referral Pathway">
            <PathwayFlow compact />
            <h3 className="mb-2 mt-8 font-display text-lg font-semibold">5.1 Discharge-to-community handover</h3>
            <p className="leading-relaxed text-ink-2">{g.handover}</p>
          </Section>

          <Section n={6} id="assessment" title="Assessment Before SNCU Discharge">
            <Table head={["Domain", "Assess and document"]} rows={g.dischargeAssessment.map((d) => [d.key, d.check])} />
            <CheckList items={g.dischargeDocumentation} className="mt-6" />
          </Section>

          <Section n={7} id="step-down" title="Role of Step-down Ward/Unit">
            <Callout kind="info" title="Step-down unit">{g.stepDown.definition}</Callout>
            <CheckList items={g.stepDown.functions} className="mt-6" tone="stepdown" />
            <p className="mt-4 text-ink-2">The Step-down Unit should have defined linkage with {g.stepDown.linkages.join(", ")}.</p>
          </Section>

          <Section n={8} id="clmc-linkage" title="Linkage of CLMC with Step-down Unit">
            <Callout kind="tip" title="Linkage clarity">{g.linkageClarity.stepDown} {g.linkageClarity.clmc} {g.linkageClarity.together}</Callout>
            <NumberedSteps steps={g.clmcStepDownSteps} tone="clmc" className="mt-6" />
          </Section>

          <Section n={9} id="counsellor" title="Role of Breastfeeding/Lactation Counsellor">
            <Table head={["Point of care", "Key responsibilities"]} rows={g.counsellorByPointOfCare.map((c) => [c.point, c.responsibilities.join("; ") + "."])} />
          </Section>

          <Section n={10} id="follow-up-nrc" title="SNCU Follow-up to NRC / Appropriate Referral Pathway">
            <p className="mb-3 text-ink-2">During SNCU follow-up, referral should be considered when an infant has:</p>
            <CheckList items={g.followUpReferralTriggers} tone="nrc" />
            <p className="mb-3 mt-6 font-semibold">Suggested pathway</p>
            <StepChain steps={g.followUpToNrcPathway} tone="nrc" />
            <p className="mt-6 text-ink-2">{g.samNote}</p>
          </Section>

          <Section n={11} id="roles" title="Roles and Responsibilities">
            <Table head={["Level/Team", "Key responsibilities"]} rows={g.rolesAndResponsibilities.map((r) => [r.team, r.text])} />
          </Section>

          <Section n={12} id="community" title="Community Follow-up After SNCU Discharge">
            <Table head={["Area", "What should be assessed"]} rows={g.communityFocus.map((c) => [c.area, c.text])} />
            <p className="mt-4 text-ink-2">{g.communityNote}</p>
          </Section>

          <Section n={13} id="monitoring" title="Data Reporting and Monitoring">
            <p className="mb-5 text-ink-2">Monitoring should cover the complete continuum from SNCU discharge and breastfeeding support to referral, counter-referral and community follow-up.</p>
            <h3 className="mb-3 font-display text-lg font-semibold">13.1 Data to be reported by Medical College/SNCU through the Breastfeeding/Lactation Counsellor</h3>
            <Table head={["Data point", "Information required"]} rows={dataPoints.map((d) => [d.label, d.info])} />
            <p className="mt-4 text-ink-2">{g.reportingNote}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {g.monitoringSets.map((m, i) => (
                <ClayCard key={m.id} size="sm">
                  <p className="mb-3 font-display font-semibold">13.{i + 2} {m.title}</p>
                  <CheckList items={m.items} className="text-sm" />
                </ClayCard>
              ))}
            </div>
          </Section>

          <Section n={14} id="documentation" title="Minimum Documentation / Tools"><CheckList items={g.minimumDocumentation} /></Section>

          <Section n={15} id="implementation" title="Implementation and Coordination"><CheckList items={g.implementation} /></Section>

          <section id="glossary" className="scroll-mt-28">
            <h2 className="mb-5 flex flex-wrap items-center gap-3 font-display text-2xl font-semibold">Glossary <SupplementaryBadge /></h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              {glossary.map((t) => (
                <div key={t.term} className="clay-sm p-4">
                  <dt className="font-display font-semibold text-[var(--ring)]">{t.term}</dt>
                  <dd className="mt-1 text-sm text-ink-2">{t.meaning}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </div>
    </Container>
  );
}
