import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { DischargeCheck } from "@/components/tools/discharge-check";
import { dischargeAssessment } from "@/lib/content/guideline";

export const metadata: Metadata = { title: "Discharge check", description: "Walk the Section 6 pre-discharge assessment and see the suggested next point of care." };

const tones = ["sncu", "clmc", "nrc", "stepdown", "community"];

export default function DischargeCheckPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Section 6 · Assessment before SNCU discharge"
        title="Discharge check"
        description="Five things to assess and document before every SNCU discharge. Work through them to see which route of the pathway applies and what is still missing."
      />
      <ul className="mb-10 flex flex-wrap gap-3" aria-label="Assessment domains">
        {dischargeAssessment.map((d, i) => (
          <li key={d.key} className={`clay-sm tone-${tones[i]} max-w-xs flex-1 basis-56 p-4`}>
            <p className="font-display font-semibold text-tone">{d.key}</p>
            <p className="mt-1 text-sm text-ink-2">{d.check}</p>
          </li>
        ))}
      </ul>
      <DischargeCheck />
    </Container>
  );
}
