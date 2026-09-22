import type { LucideIcon } from "lucide-react";
import { ArrowRight, Layers, MapPin, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Highlight {
  icon: LucideIcon;
  label: string;
}

const HIGHLIGHTS: Highlight[] = [
  { icon: ShieldCheck, label: "Soustružení a frézování" },
  { icon: Layers, label: "Zakázková i maloseriová výroba" },
  { icon: MapPin, label: "Frýdlantský výběžek a Liberecko" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-32 sm:pt-40">
      {/* Podkladová fotka kovovýroby s tmavým překrytím pro čitelnost textu */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/vorlicky-hero-kovovyroba/1920/1080"
          alt=""
          className="h-full w-full object-cover grayscale contrast-125 brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/85 to-slate-950" />
        <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            <ShieldCheck className="h-4 w-4" />
            Nástrojárna a kovoobrábění Dolní Řasnice
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Výroba nástrojů a přesné kovoobrábění
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Výroba nástrojů, přípravků a přesných dílů pro průmysl. Soustružení,
            frézování a zakázkové kovoobrábění v provozovně v Dolní Řasnici na
            Frýdlantsku.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <a href="#kontakt">
                Poptat výrobu
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#sluzby">Přehled činnosti</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative border-y border-white/10 bg-slate-950/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
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
