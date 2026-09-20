import type { LucideIcon } from "lucide-react";
import { Cog, Layers, Wrench } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      "Výroba technologických, upínacích, montážních a kontrolních přípravků a dílů pro automotive linky dle výkresové dokumentace.",
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
      "Třískové obrábění kovu, kusová a maloseriová výroba součástí, důraz na tvarovou a rozměrovou přesnost.",
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
      "Rovinné a tvarové broušení, renovace a ostření průmyslových řezných a tvarovacích nástrojů.",
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
            Naše služby
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Komplexní nástrojařská a kovoobráběcí výroba pod jednou střechou,
            od výkresu až po hotový precizní díl.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="group border-slate-200 transition-colors hover:border-blue-300 hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white transition-colors group-hover:bg-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
