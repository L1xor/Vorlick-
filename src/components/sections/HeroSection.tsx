import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HIGHLIGHTS: string[] = [
  "Automotive standardy",
  "Zakázková i maloseriová výroba",
  "Frýdlantský výběžek a Liberecko",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-6">
            <ShieldCheck className="h-3.5 w-3.5" />
            Nástrojárna a kovoobrábění Dolní Řasnice
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Zakázková výroba nástrojů a přesné kovoobrábění pro průmysl
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Vyrábíme nástroje, přípravky a přesné díly pro automotive,
            provádíme zakázkové kovoobrábění a broušení v naší provozovně v
            Dolní Řasnici na Frýdlantsku.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {HIGHLIGHTS.map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>

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
    </section>
  );
}
