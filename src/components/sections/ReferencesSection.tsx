"use client";

import { useState } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
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
  const [zoomedMachine, setZoomedMachine] = useState<MachineItem | null>(null);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MACHINE_COUNT);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MACHINE_COUNT) % MACHINE_COUNT);
  };

  const goTo = (index: number) => {
    setCurrentIndex(((index % MACHINE_COUNT) + MACHINE_COUNT) % MACHINE_COUNT);
  };

  const handleCardClick = (machine: MachineItem, index: number, diff: number) => {
    if (diff === 0) {
      setZoomedMachine(machine);
    } else if (diff === -1 || diff === 1) {
      goTo(index);
    }
  };

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
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
                    <div className="relative aspect-[3/4] w-full bg-slate-950">
                      <Image
                        src={machine.imageSrc}
                        alt={machine.name}
                        fill
                        sizes="(max-width: 640px) 224px, 288px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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

      <DialogPrimitive.Root
        open={zoomedMachine !== null}
        onOpenChange={(open) => {
          if (!open) setZoomedMachine(null);
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            aria-describedby={undefined}
          >
            <DialogPrimitive.Title className="sr-only">
              {zoomedMachine?.name ?? "Fotka stroje"}
            </DialogPrimitive.Title>
            {zoomedMachine && (
              <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={zoomedMachine.imageSrc}
                  alt={zoomedMachine.name}
                  className="max-h-[80vh] w-full object-contain"
                />
                <div className="p-5 sm:p-6">
                  <p className="text-base font-semibold text-white">
                    {zoomedMachine.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {zoomedMachine.description}
                  </p>
                </div>
              </div>
            )}
            <DialogPrimitive.Close
              aria-label="Zavřít zvětšenou fotku"
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}
