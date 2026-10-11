import { Container } from "@/components/ui/container";
import { ClayLink } from "@/components/ui/clay-button";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="clay mx-auto max-w-lg p-10 text-center">
        <p className="font-display text-6xl font-semibold text-[var(--ring)]">404</p>
        <p className="mt-3 text-lg text-ink-2">This page isn&apos;t on the pathway.</p>
        <ClayLink href="/" className="mt-6">Back to home</ClayLink>
      </div>
    </Container>
  );
}
