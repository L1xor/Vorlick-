import type { LucideIcon } from "lucide-react";
import { Check, Cog, Layers, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Datový model jednoho kroku (schodu) v sekci služeb.
 */
interface ServiceStep {
  id: string;
  step: string;
  title: string;
  description: string;
  specs: string[];
  icon: LucideIcon;
  imageLabel: string;
  imageCaption: string;
}

const SERVICES: ServiceStep[] = [
  {
    id: "vyroba-nastroju",
    step: "01",
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
    imageLabel: "Nástrojařská výroba",
    imageCaption: "Detail výroby upínacího přípravku",
  },
  {
    id: "presne-kovoobrabeni",
    step: "02",
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
    imageLabel: "Kovoobráběcí výroba",
    imageCaption: "Detail obrábění přesné součásti",
  },
  {
    id: "brouseni-ostreni",
    step: "03",
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

        <div className="relative mt-24">
          {/* Souvislá technická vodicí linka propojující jednotlivé schody */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-slate-300 lg:left-1/2"
          />

          <div className="space-y-24 sm:space-y-28 lg:space-y-32">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 1;

              return (
                <div key={service.id} className="relative">
                  {/* Technologický indikátor kroku na vodicí lince */}
                  <div
                    aria-hidden="true"
                    className="absolute left-6 top-10 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-sm font-bold text-white shadow-md lg:left-1/2 lg:top-1/2"
                  >
                    {service.step}
                  </div>

                  <div
                    className={cn(
                      "flex flex-col lg:flex-row lg:items-center",
                      isEven && "lg:flex-row-reverse"
                    )}
                  >
                    {/* Vyvýšená bílá karta s textem */}
                    <div
                      className={cn(
                        "relative z-20 order-1 ml-10 -mb-8 rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-8 lg:order-none lg:ml-0 lg:w-[56%] lg:-mb-0",
                        isEven ? "lg:-ml-14" : "lg:-mr-14"
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="secondary">Krok {service.step}</Badge>
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

                    {/* Podkladový blok s fotkou */}
                    <div
                      className={cn(
                        "relative z-10 order-2 ml-10 aspect-[4/3] overflow-hidden rounded-2xl border border-slate-800/60 shadow-lg lg:order-none lg:ml-0 lg:aspect-[16/9] lg:w-[56%]"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black" />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                          backgroundSize: "28px 28px",
                        }}
                      />
                      <Icon
                        aria-hidden="true"
                        className="absolute -bottom-8 -right-8 h-44 w-44 text-white/[0.06]"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 sm:p-6">
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
