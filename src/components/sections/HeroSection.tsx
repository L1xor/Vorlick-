import type { LucideIcon } from "lucide-react";
import { ArrowRight, Layers, MapPin, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Highlight {
  icon: LucideIcon;
  label: string;
}

const HIGHLIGHTS: Highlight[] = [
  { icon: ShieldCheck, label: "Automotive standardy" },
  { icon: Layers, label: "Zakázková i maloseriová výroba" },
  { icon: MapPin, label: "Frýdlantský výběžek a Liberecko" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            <ShieldCheck className="h-4 w-4" />
            Nástrojárna a kovoobrábění Dolní Řasnice
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Vyrábím nástroje a provádím přesné kovoobrábění pro průmysl
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Vyrábím nástroje, přípravky a přesné díly pro automotive, provádím
            zakázkové kovoobrábění a broušení ve své provozovně v Dolní
            Řasnici na Frýdlantsku.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <a href="#kontakt">
                Poptat výrobu
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#sluzby">Přehled činnosti</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-y border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-slate-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-3 py-5 text-center sm:px-6"
                >
                  <Icon className="h-5 w-5 flex-shrink-0 text-blue-400" />
                  <span className="text-sm font-medium text-slate-200">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
