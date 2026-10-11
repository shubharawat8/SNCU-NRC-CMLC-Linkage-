"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Children, useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const MQ = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Auto-advancing, swipeable carousel (Embla). Accessible: labelled slides,
 * prev/next, dot navigation and an explicit pause control.
 */
export function Carousel({ children, label, delay = 5000, slideClassName }: { children: React.ReactNode; label: string; delay?: number; slideClassName?: string }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(MQ).matches, () => false);
  // null = follow the motion preference; true/false = the user's explicit choice.
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const playing = userPlaying ?? !reducedMotion;
  const slides = Children.toArray(children);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    const onInit = () => setSnaps(embla.scrollSnapList());
    onInit();
    onSelect();
    embla.on("select", onSelect).on("reInit", onInit).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onInit).off("reInit", onSelect);
    };
  }, [embla]);

  useEffect(() => {
    const ap = embla?.plugins().autoplay;
    if (!ap) return;
    if (playing) ap.play(); else ap.stop();
  }, [embla, playing]);

  const toggle = useCallback(() => setUserPlaying(!playing), [playing]);

  return (
    <section aria-roledescription="carousel" aria-label={label} className="relative">
      <div className="-mx-3 overflow-hidden px-3 py-6" ref={emblaRef}>
        <div className="-ml-5 flex touch-pan-y">
          {slides.map((child, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className={cn("min-w-0 shrink-0 grow-0 basis-full pl-5 sm:basis-1/2 lg:basis-1/3", slideClassName)}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
        <button onClick={() => embla?.scrollPrev()} aria-label="Previous slide" className="clay-sm grid size-10 place-items-center !rounded-full">
          <ChevronLeft className="size-5" />
        </button>
        <div className="clay-inset flex items-center gap-2 !rounded-full px-3 py-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selected}
              className={cn("h-2.5 rounded-full bg-[var(--muted)]/40 transition-all", i === selected ? "w-7 bg-[var(--ring)]" : "w-2.5")}
            />
          ))}
        </div>
        <button onClick={toggle} aria-label={playing ? "Pause carousel" : "Play carousel"} className="clay-sm grid size-10 place-items-center !rounded-full">
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <button onClick={() => embla?.scrollNext()} aria-label="Next slide" className="clay-sm grid size-10 place-items-center !rounded-full">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
