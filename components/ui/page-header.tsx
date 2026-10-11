import { Badge } from "./badge";

export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="pb-10 pt-8 sm:pt-12">
      <Badge className="mb-4">{eyebrow}</Badge>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-2">{description}</p>}
      {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
    </header>
  );
}
