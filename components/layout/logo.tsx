import { Baby } from "lucide-react";

export function Logo() {
  return (
    <span className="grid size-10 place-items-center rounded-full bg-[linear-gradient(145deg,#8f9bff,#5b6cff)] text-white shadow-[4px_6px_14px_rgba(74,90,232,0.4),inset_3px_3px_6px_rgba(255,255,255,0.4),inset_-3px_-3px_6px_rgba(20,30,120,0.35)]">
      <Baby className="size-5" aria-hidden />
    </span>
  );
}
