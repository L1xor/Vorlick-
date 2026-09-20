"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Datový model jedné reference klienta.
 */
interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "reference-01",
    name: "Petr Malý",
    role: "Vedoucí nákupu, dodavatel dílů pro automotive",
    quote:
      "Pan Vorlický nám opakovaně vyrobil upínací přípravky přesně dle výkresové dokumentace a v domluveném termínu. Rozměrová přesnost byla vždy bez připomínek.",
  },
  {
    id: "reference-02",
    name: "Ing. Jana Kovářová",
    role: "Technoložka, strojírenská výroba",
    quote:
      "Cením si zejména flexibility při menších zakázkách. I na kusovou výrobu speciálního nástroje reagoval pan Vorlický rychle a s odborným přístupem.",
  },
  {
    id: "reference-03",
    name: "Tomáš Novotný",
    role: "Majitel výrobní firmy, Liberecký kraj",
    quote:
      "Broušení a renovaci našich řezných nástrojů řešíme s panem Vorlickým dlouhodobě. Nástroje se nám vrací v kvalitě, na kterou se dá spolehnout.",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => part.length > 0 && part[0] === part[0].toUpperCase())
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function ReferencesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Reference klientů
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Co o spolupráci se mnou říkají zákazníci z automotive a
            strojírenského průmyslu.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 p-8 text-white sm:p-12"
                >
                  <Quote className="h-8 w-8 text-blue-500" aria-hidden="true" />

                  <p className="mt-6 min-h-[6rem] text-lg leading-relaxed text-slate-200 sm:text-xl">
                    „{testimonial.quote}“
                  </p>

                  <div className="mt-8 flex items-center gap-4 border-t border-slate-800 pt-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white">
                      {getInitials(testimonial.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Předchozí reference"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Zobrazit referenci ${index + 1}`}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    index === activeIndex ? "bg-blue-600" : "bg-slate-300"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Další reference"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
