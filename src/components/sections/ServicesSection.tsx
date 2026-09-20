import type { LucideIcon } from "lucide-react";
import { Cog, Layers, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  specs: string[];
}

const SERVICES: ServiceItem[] = [
  {
    icon: Wrench,
    title: "Výroba nástrojů a přípravků",
    description:
      "Vyrábím technologické, upínací, montážní a kontrolní přípravky a díly pro automotive linky dle výkresové dokumentace.",
    specs: [
      "Výroba dle výkresové dokumentace zákazníka",
      "Upínací a montážní přípravky pro výrobní linky",
      "Kontrolní a měřicí přípravky",
      "Konzultace konstrukčního řešení s technologem",
    ],
  },
  {
    icon: Cog,
    title: "Přesné kovoobrábění",
    description:
      "Provádím třískové obrábění kovu, kusovou i maloseriovou výrobu součástí s důrazem na tvarovou a rozměrovou přesnost.",
    specs: [
      "Soustružení a frézování přesných dílů",
      "Kusová i maloseriová výroba součástí",
      "Obrábění široké škály konstrukčních materiálů",
      "Výstupní kontrola rozměrů a tolerancí",
    ],
  },
  {
    icon: Layers,
    title: "Broušení a ostření nástrojů",
    description:
      "Provádím rovinné i tvarové broušení, renovaci a ostření průmyslových řezných a tvarovacích nástrojů.",
    specs: [
      "Rovinné broušení kovových ploch a dílů",
      "Tvarové broušení dle požadované geometrie",
      "Renovace opotřebených nástrojů",
      "Ostření řezných a tvarovacích nástrojů",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="sluzby" className="bg-white py-20 sm:py-28">
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

        <div className="mt-16 space-y-16 sm:space-y-20">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.title}
                className={cn(
                  "flex flex-col gap-6 md:flex-row md:items-end md:gap-10",
                  isReversed && "md:flex-row-reverse"
                )}
              >
                {/* Vyvýšený "schod" s textem */}
                <div className="relative z-10 flex-1 rounded-2xl bg-white p-8 shadow-[0_25px_50px_-20px_rgba(15,23,42,0.35)] ring-1 ring-slate-100 md:-mb-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold leading-tight tracking-tight text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {service.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Nášlapná hrana schodu */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-4 h-4 w-20 rounded-b-lg bg-blue-600",
                      isReversed ? "right-8" : "left-8"
                    )}
                  />
                </div>

                {/* Ilustrační fotka "na zemi" vedle schodu */}
                <div className="relative h-40 flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black shadow-lg md:h-36 md:max-w-sm">
                  <Icon
                    aria-hidden="true"
                    className="absolute -bottom-6 -right-6 h-36 w-36 text-white/10"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Ilustrační foto
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      {service.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
