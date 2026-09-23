"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Datový model jednoho stroje ve flotile. Fotky a popisky jsou zatím
 * placeholdery a budou doplněny reálným obsahem.
 */
interface MachineItem {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
}

const MACHINES: MachineItem[] = [
  {
    id: "frezka-fngj-32",
    name: "Frézka FNGJ 32",
    description:
      "Konzolová frézka pro přesné frézování rovinných i tvarových ploch na ocelových a hliníkových dílech.",
    imageSrc: "/machines/frezka-fngj-32.jpg",
  },
  {
    id: "konzolova-frezka",
    name: "Konzolová frézka",
    description:
      "Frézování drážek, ploch a profilů u menších i středně velkých obrobků dle výkresové dokumentace.",
    imageSrc: "/machines/konzolova-frezka.jpg",
  },
  {
    id: "soustruh-sr-18-ra",
    name: "Soustruh SR 18 RA",
    description:
      "Univerzální soustruh pro soustružení hřídelí, čepů a dalších rotačních součástí s vysokou přesností.",
    imageSrc: "/machines/soustruh-sr-18-ra.jpg",
  },
  {
    id: "souradnicova-vyvrtavacka",
    name: "Souřadnicová vyvrtávačka",
    description:
      "Vrtání a vyvrtávání otvorů s vysokou polohovou a rozměrovou přesností pro náročné konstrukční díly.",
    imageSrc: "/machines/souradnicova-vyvrtavacka.jpg",
  },
  {
    id: "rovinna-bruska",
    name: "Rovinná bruska",
    description:
      "Broušení rovinných ploch obráběných dílů do přesných rozměrů s hladkým, jemným povrchem.",
    imageSrc: "/machines/rovinna-bruska.jpg",
  },
  {
    id: "nastrojova-bruska-vizas",
    name: "Nástrojová bruska VIZAS",
    description:
      "Broušení a ostření řezných nástrojů a nožů s důrazem na přesnou geometrii a ostří.",
    imageSrc: "/machines/nastrojova-bruska-vizas.jpg",
  },
];

const MACHINE_COUNT = MACHINES.length;

/**
 * Jednoduchý obdélník v souřadnicích viewportu, ze kterého a do kterého
 * animujeme zvětšenou fotku (FLIP technika – transformace přes translate
 * a scale, aby byl přechod plynulý a bez sekání).
 */
interface BoxRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface LightboxState {
  machine: MachineItem;
  originRect: BoxRect;
  targetRect: BoxRect;
  phase: "opening" | "open" | "closing";
}

const LIGHTBOX_TRANSITION_MS = 420;
const LIGHTBOX_IMAGE_WIDTH = 480;

// Rezervy okolo fotky, aby se do viewportu vešlo i zavírací tlačítko
// (nad fotkou) a popisek stroje (pod fotkou), bez přetečení mimo obrazovku.
const TOP_CLEARANCE = 84;
const BOTTOM_CLEARANCE = 24;
const CAPTION_GAP = 12;
const CAPTION_HEIGHT_ESTIMATE = 96;

function getTargetRect(): BoxRect {
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  const maxWidth = Math.min(viewportW * 0.82, LIGHTBOX_IMAGE_WIDTH);
  const availableHeight =
    viewportH -
    TOP_CLEARANCE -
    BOTTOM_CLEARANCE -
    CAPTION_GAP -
    CAPTION_HEIGHT_ESTIMATE;
  const maxHeight = Math.max(180, Math.min(availableHeight, 560));

  let width = maxWidth;
  let height = (width * 4) / 3;

  if (height > maxHeight) {
    height = maxHeight;
    width = (height * 3) / 4;
  }

  const blockHeight = height + CAPTION_GAP + CAPTION_HEIGHT_ESTIMATE;
  const blockTop = Math.max(TOP_CLEARANCE, (viewportH - blockHeight) / 2);

  return {
    width,
    height,
    top: blockTop,
    left: (viewportW - width) / 2,
  };
}

function getFlipTransform(from: BoxRect, to: BoxRect): string {
  const scaleX = from.width / to.width;
  const scaleY = from.height / to.height;
  const translateX = from.left - to.left;
  const translateY = from.top - to.top;
  return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
}

/**
 * Spočítá nejkratší cyklickou vzdálenost dané položky od aktivního indexu.
 * Díky tomu se karty na obou koncích pole plynule "protáčí" jedním směrem
 * místo skoku zpět na začátek.
 */
function getCircularDistance(
  index: number,
  currentIndex: number,
  length: number
): number {
  if (length === 0) return 0;
  let diff = index - currentIndex;
  const half = length / 2;
  if (diff > half) diff -= length;
  if (diff < -half) diff += length;
  return diff;
}

export default function ReferencesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const imageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MACHINE_COUNT);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MACHINE_COUNT) % MACHINE_COUNT);
  };

  const goTo = (index: number) => {
    setCurrentIndex(((index % MACHINE_COUNT) + MACHINE_COUNT) % MACHINE_COUNT);
  };

  const openLightbox = (machine: MachineItem) => {
    const node = imageRefs.current[machine.id];
    if (!node) return;

    const rect = node.getBoundingClientRect();
    setLightbox({
      machine,
      originRect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
      targetRect: getTargetRect(),
      phase: "opening",
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => (prev ? { ...prev, phase: "closing" } : prev));
  };

  const handleCardClick = (machine: MachineItem, index: number, diff: number) => {
    if (diff === 0) {
      openLightbox(machine);
    } else if (diff === -1 || diff === 1) {
      goTo(index);
    }
  };

  // Po vložení do DOM v "origin" pozici přepneme na další snímek na "open",
  // což spustí CSS přechod směrem k cílové zvětšené velikosti.
  useEffect(() => {
    if (lightbox?.phase === "opening") {
      const raf = requestAnimationFrame(() => {
        setLightbox((prev) =>
          prev && prev.phase === "opening" ? { ...prev, phase: "open" } : prev
        );
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [lightbox?.phase]);

  // Uzamčení scrollu stránky a zavírání klávesou Escape, dokud je lightbox otevřený.
  useEffect(() => {
    if (!lightbox) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox]);

  const activeMachine = MACHINES[currentIndex];

  return (
    <section id="stroje" className="bg-white py-20 sm:py-28">
      {/*
        Skrytý předběžný fetch fotky aktuálního stroje ve velikosti, v jaké
        se zobrazí v lightboxu. Next.js tak stihne vygenerovat a nacachovat
        zvětšenou variantu ještě před kliknutím, takže se lightbox otevře
        bez čekání na dotažení obrázku.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      >
        <Image
          key={activeMachine.id}
          src={activeMachine.imageSrc}
          alt=""
          width={LIGHTBOX_IMAGE_WIDTH}
          height={Math.round((LIGHTBOX_IMAGE_WIDTH * 4) / 3)}
          sizes={`${LIGHTBOX_IMAGE_WIDTH}px`}
          priority
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Strojní vybavení
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Nástrojařské a kovoobráběcí stroje, na kterých v mé dílně pracuji už
            řadu let. Díky tomuto ověřenému vybavení pro frézování, soustružení,
            vrtání i broušení zpracuji každou zakázku s důrazem na přesnost,
            spolehlivost a kvalitu hotového dílu.
          </p>
        </div>

        <div className="relative mx-auto mt-14 w-full max-w-4xl">
          <div className="relative h-[420px] w-full overflow-hidden sm:h-[520px]">
            <div className="relative flex h-full w-full items-center justify-center">
              {MACHINES.map((machine, index) => {
                const diff = getCircularDistance(index, currentIndex, MACHINE_COUNT);
                const isActive = diff === 0;
                const isPrev = diff === -1;
                const isNext = diff === 1;
                const isVisible = isActive || isPrev || isNext;

                return (
                  <button
                    key={machine.id}
                    type="button"
                    onClick={() => handleCardClick(machine, index, diff)}
                    aria-label={
                      isActive
                        ? `Zvětšit fotku: ${machine.name}`
                        : `Zobrazit stroj: ${machine.name}`
                    }
                    aria-hidden={!isVisible}
                    tabIndex={isVisible ? 0 : -1}
                    className={cn(
                      "group absolute left-1/2 top-1/2 w-56 -translate-y-1/2 overflow-hidden rounded-2xl bg-slate-900 text-left ring-1 ring-white/5 transition-all duration-500 ease-out sm:w-72",
                      isActive && "z-20 -translate-x-1/2 scale-100 opacity-100 shadow-2xl",
                      isPrev && "z-10 -translate-x-[130%] scale-[0.82] opacity-70 shadow-xl",
                      isNext && "z-10 translate-x-[30%] scale-[0.82] opacity-70 shadow-xl",
                      !isVisible &&
                        "pointer-events-none z-0 -translate-x-1/2 scale-75 opacity-0"
                    )}
                  >
                    <div
                      ref={(node) => {
                        imageRefs.current[machine.id] = node;
                      }}
                      className="relative aspect-[3/4] w-full bg-slate-950"
                    >
                      <Image
                        src={machine.imageSrc}
                        alt={machine.name}
                        fill
                        sizes="(max-width: 640px) 224px, 288px"
                        className={cn(
                          "object-cover transition-transform duration-500 group-hover:scale-105",
                          lightbox?.machine.id === machine.id &&
                            lightbox.phase !== "closing" &&
                            "opacity-0"
                        )}
                      />
                      <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-colors group-hover:bg-slate-950/30">
                          <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      )}
                    </div>

                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm font-semibold text-white sm:text-base">
                        {machine.name}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                        {machine.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Předchozí stroj"
            className="absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-md transition-colors hover:border-blue-300 hover:text-blue-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Další stroj"
            className="absolute right-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-md transition-colors hover:border-blue-300 hover:text-blue-600"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {MACHINES.map((machine, index) => (
            <button
              key={machine.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Zobrazit stroj ${index + 1}`}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                index === currentIndex ? "bg-blue-600" : "bg-slate-300"
              )}
            />
          ))}
        </div>
      </div>

      {lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.machine.name}
          >
            <div
              onClick={closeLightbox}
              className={cn(
                "absolute inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity",
                lightbox.phase === "open" ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDuration: `${LIGHTBOX_TRANSITION_MS}ms` }}
              aria-hidden="true"
            />

            <div
              onTransitionEnd={() => {
                if (lightbox.phase === "closing") setLightbox(null);
              }}
              style={{
                top: lightbox.targetRect.top,
                left: lightbox.targetRect.left,
                width: lightbox.targetRect.width,
                height: lightbox.targetRect.height,
                transform:
                  lightbox.phase === "open"
                    ? "translate(0, 0) scale(1, 1)"
                    : getFlipTransform(lightbox.originRect, lightbox.targetRect),
                transformOrigin: "top left",
                transitionDuration: `${LIGHTBOX_TRANSITION_MS}ms`,
              }}
              className="absolute overflow-hidden rounded-2xl bg-slate-900 shadow-2xl transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            >
              <Image
                src={lightbox.machine.imageSrc}
                alt={lightbox.machine.name}
                fill
                sizes={`${LIGHTBOX_IMAGE_WIDTH}px`}
                priority
                className="object-cover"
              />
            </div>

            <div
              style={{
                top: lightbox.targetRect.top + lightbox.targetRect.height + 16,
                left: lightbox.targetRect.left,
                width: lightbox.targetRect.width,
                transitionDelay: lightbox.phase === "open" ? "200ms" : "0ms",
              }}
              className={cn(
                "absolute rounded-xl bg-slate-900/95 p-4 text-left shadow-lg transition-opacity duration-300",
                lightbox.phase === "open"
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              )}
            >
              <p className="text-base font-semibold text-white">
                {lightbox.machine.name}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {lightbox.machine.description}
              </p>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Zavřít zvětšenou fotku"
              style={{
                top: lightbox.targetRect.top - 16,
                left: lightbox.targetRect.left + lightbox.targetRect.width - 16,
                transitionDelay: lightbox.phase === "open" ? "150ms" : "0ms",
              }}
              className={cn(
                "absolute flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-opacity duration-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600",
                lightbox.phase === "open"
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              )}
            >
              <X className="h-5 w-5" />
            </button>
          </div>,
          document.body
        )}
    </section>
  );
}
