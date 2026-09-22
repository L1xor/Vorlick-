"use client";

import { useEffect, useState } from "react";
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

// Klon poslední a první fotky na okraje pole, aby přechod z posledního
// na první stroj (a naopak) vypadal jako plynulé pokračování v jednom
// směru, nikoliv jako skok zpět na začátek.
const SLIDES: MachineItem[] =
  MACHINE_COUNT > 1
    ? [
        { ...MACHINES[MACHINE_COUNT - 1], id: `${MACHINES[MACHINE_COUNT - 1].id}-clone-start` },
        ...MACHINES,
        { ...MACHINES[0], id: `${MACHINES[0].id}-clone-end` },
      ]
    : MACHINES;

export default function ReferencesSection() {
  const [position, setPosition] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [zoomedMachine, setZoomedMachine] = useState<MachineItem | null>(null);

  const activeIndex = ((position - 1) % MACHINE_COUNT + MACHINE_COUNT) % MACHINE_COUNT;

  const goNext = () => {
    setWithTransition(true);
    setPosition((prev) => prev + 1);
  };

  const goPrev = () => {
    setWithTransition(true);
    setPosition((prev) => prev - 1);
  };

  const goTo = (index: number) => {
    setWithTransition(true);
    setPosition(index + 1);
  };

  // Po doklouzání na klonovaný snímek na okraji se pozice bez animace
  // přeskočí na odpovídající reálný snímek na druhé straně pole.
  const handleTransitionEnd = () => {
    if (position === SLIDES.length - 1) {
      setWithTransition(false);
      setPosition(1);
    } else if (position === 0) {
      setWithTransition(false);
      setPosition(MACHINE_COUNT);
    }
  };

  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Flotila strojů
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Přehled nástrojařských a kovoobráběcích strojů v dílně. Fotky a
            popisky budou postupně doplněny.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
            <div
              onTransitionEnd={handleTransitionEnd}
              className={cn(
                "flex",
                withTransition && "transition-transform duration-700 ease-in-out"
              )}
              style={{ transform: `translateX(-${position * 100}%)` }}
            >
              {SLIDES.map((machine) => (
                <div key={machine.id} className="w-full flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setZoomedMachine(machine)}
                    aria-label={`Zvětšit fotku: ${machine.name}`}
                    className="group relative block aspect-[4/3] w-full overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={machine.imageSrc}
                      alt={machine.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 brightness-[0.7] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-colors group-hover:bg-slate-950/30">
                      <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </button>

                  <div className="p-6 text-white sm:p-8">
                    <h3 className="text-lg font-semibold text-white">
                      {machine.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {machine.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Předchozí stroj"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {MACHINES.map((machine, index) => (
                <button
                  key={machine.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Zobrazit stroj ${index + 1}`}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    index === activeIndex ? "bg-blue-600" : "bg-slate-300"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Další stroj"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
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
