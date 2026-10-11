import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Dashboard } from "@/components/dashboard/dashboard";
import { reportingNote } from "@/lib/content/guideline";

export const metadata: Metadata = { title: "Dashboard", description: "Monthly monitoring of the post-SNCU continuum: discharge, feeding support, follow-up, referral and counter-referral." };

export default function DashboardPage() {
  return (
    <Container>
      <PageHeader eyebrow="Section 13 · Data reporting and monitoring" title="Linkage dashboard" description={reportingNote} />
      <Dashboard />
    </Container>
  );
}
