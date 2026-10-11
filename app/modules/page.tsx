import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ModuleCard } from "@/components/ui/module-card";
import { careModules } from "@/lib/content/modules";

export const metadata: Metadata = { title: "Modules", description: "Each level of care in the post-SNCU pathway." };

export default function ModulesPage() {
  return (
    <Container>
      <PageHeader
        eyebrow={`${careModules.length} care-level modules`}
        title="Modules"
        description="Seven levels and teams make up the continuum. Open one to see its role, what it receives and sends on, what it monitors and which records it keeps."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {careModules.map((m) => <ModuleCard key={m.slug} module={m} />)}
      </div>
    </Container>
  );
}
