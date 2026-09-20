import type { LucideIcon } from "lucide-react";
import { Check, Cog, Layers, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Datový model jednoho kroku (schodu) v sekci služeb.
 */
interface ServiceStep {
  id: string;
  title: string;
  description: string;
  specs: string[];
  icon: LucideIcon;
  imageSrc: string;
  imageLabel: string;
  imageCaption: string;
}

/**
 * Poměr šířky textové karty a fotoblu pro každý schod. Hodnoty se lisi,
 * aby jednotlive schody nepusobily jako pravidelna tabulka, a textova
 * karta je zaroven o kus sirsi nez podkladova fotka.
 */
const STEP_WIDTHS: { text: string; photo: string }[] = [
  { text: "lg:w-[58%]", photo: "lg:w-[42%]" },
  { text: "lg:w-[52%]", photo: "lg:w-[48%]" },
  { text: "lg:w-[62%]", photo: "lg:w-[38%]" },
];

const SERVICES: ServiceStep[] = [
  {
    id: "vyroba-nastroju",
    title: "Výroba nástrojů a přípravků",
    description:
      "Vyrábím technologické, upínací, montážní a kontrolní přípravky pro automotive linky. Zajišťuji kusovou i drobnou nástrojařskou výrobu dle výkresové dokumentace.",
    specs: [
      "Výroba dle výkresové dokumentace zákazníka",
      "Upínací a montážní přípravky pro výrobní linky",
      "Kontrolní a měřicí přípravky",
      "Konzultace konstrukčního řešení s technologem",
    ],
    icon: Wrench,
    imageSrc: "https://picsum.photos/seed/vorlicky-nastroje/1200/900",
    imageLabel: "Nástrojařská výroba",
    imageCaption: "Detail výroby upínacího přípravku",
  },
  {
    id: "presne-kovoobrabeni",
    title: "Přesné kovoobrábění",
    description:
      "Provádím třískové obrábění kovu, maloseriovou i zakázkovou výrobu součástí s důrazem na vysokou tvarovou a rozměrovou přesnost.",
    specs: [
      "Soustružení a frézování přesných dílů",
      "Kusová i maloseriová výroba součástí",
      "Obrábění široké škály konstrukčních materiálů",
      "Výstupní kontrola rozměrů a tolerancí",
    ],
    icon: Cog,
    imageSrc: "https://picsum.photos/seed/vorlicky-obrabeni/1200/900",
    imageLabel: "Kovoobráběcí výroba",
    imageCaption: "Detail obrábění přesné součásti",
  },
  {
    id: "brouseni-ostreni",
    title: "Broušení a ostření nástrojů",
    description:
      "Provádím rovinné a tvarové broušení, renovaci a ostření průmyslových řezných i tvarovacích nástrojů.",
    specs: [
      "Rovinné broušení kovových ploch a dílů",
      "Tvarové broušení dle požadované geometrie",
      "Renovace opotřebených nástrojů",
      "Ostření řezných a tvarovacích nástrojů",
    ],
    icon: Layers,
    imageSrc: "https://picsum.photos/seed/vorlicky-brouseni/1200/900",
    imageLabel: "Broušení nástrojů",
    imageCaption: "Detail broušení řezného nástroje",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="sluzby"
      className="relative overflow-x-clip bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Moje služby
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Nabízím komplexní nástrojařskou a kovoobráběcí výrobu pod jednou
            střechou, od výkresu až po hotový precizní díl.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Souvislá technická vodicí linka propojující jednotlivé schody */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-slate-300 lg:left-1/2"
          />

          <div>
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 1;
              const widths = STEP_WIDTHS[index % STEP_WIDTHS.length];

              return (
                <div key={service.id} className="relative">
                  {/* Technický uzel na vodicí lince */}
                  <div
                    aria-hidden="true"
                    className="absolute left-6 top-10 z-30 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 ring-4 ring-white lg:left-1/2 lg:top-1/2"
                  />

                  <div
                    className={cn(
                      "flex flex-col lg:flex-row lg:items-stretch",
                      isEven && "lg:flex-row-reverse"
                    )}
                  >
                    {/* Vyvýšená bílá karta s textem */}
                    <div
                      className={cn(
                        "relative z-20 order-1 ml-10 border border-slate-200/80 bg-white p-7 sm:p-8 lg:order-none lg:ml-0",
                        widths.text
                      )}
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon className="h-6 w-6" />
                      </div>

                      <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {service.description}
                      </p>

                      <ul className="mt-5 space-y-2.5">
                        {service.specs.map((spec) => (
                          <li
                            key={spec}
                            className="flex items-start gap-2.5 text-sm text-slate-600"
                          >
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Podkladový blok s ilustrační fotkou */}
                    <div
                      className={cn(
                        "relative z-10 order-2 ml-10 aspect-[4/3] overflow-hidden border border-slate-800/60 lg:order-none lg:ml-0 lg:aspect-auto",
                        widths.photo
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.imageSrc}
                        alt={service.imageCaption}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 brightness-[0.6]"
                      />
                      <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-400">
                          {service.imageLabel}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-white">
                          {service.imageCaption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
