import type { LucideIcon } from "lucide-react";
import { BadgeCheck, ClipboardCheck, FileSearch, PackageCheck, Settings2 } from "lucide-react";

interface ReliabilityPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const RELIABILITY_POINTS: ReliabilityPoint[] = [
  {
    icon: BadgeCheck,
    title: "Dlouholetá praxe v oboru",
    description:
      "Řadu let se věnuji nástrojářské výrobě a kovoobrábění pro strojírenské a automotive dodavatele v regionu i mimo něj.",
  },
  {
    icon: Settings2,
    title: "Flexibilita zakázkové nástrojárny",
    description:
      "Přizpůsobím se konkrétní poptávce, od jednoho kusu přípravku po opakovanou maloseriovou výrobu součástí.",
  },
  {
    icon: ClipboardCheck,
    title: "Přísná výstupní kontrola",
    description:
      "Každý vyrobený díl u mě prochází kontrolou rozměrů a tvarové přesnosti tak, aby splňoval požadavky výkresové dokumentace.",
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Příjem výkresu a poptávky",
    description:
      "Zašlete mi výkresovou dokumentaci a specifikaci dílu. Poptávku posoudím a navrhnu technologický postup výroby.",
  },
  {
    number: "02",
    title: "Výroba a kontrola rozměrů",
    description:
      "Díl vyrobím na vlastním strojním vybavení a v průběhu výroby i po jejím dokončení provádím kontrolu rozměrové přesnosti.",
  },
  {
    number: "03",
    title: "Expedice hotových dílů",
    description:
      "Hotové díly zabalím a připravím k předání či expedici tak, aby dorazily k zákazníkovi ve stavu odpovídajícím zadání.",
  },
];

export default function PrecisionSection() {
  return (
    <section id="o-nas" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            O nástrojárně a přesnosti výroby
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Spojuji řemeslnou zkušenost s důrazem na přesnost, kterou vyžadují
            dodavatelé pro automotive a strojírenský průmysl.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            {RELIABILITY_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="flex gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 shadow-lg sm:p-8">
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-400">
              <FileSearch className="h-4 w-4" />
              Výrobní postup
            </div>
            <ol className="space-y-6">
              {PROCESS_STEPS.map((step, index) => (
                <li key={step.number} className="relative flex gap-4 pl-1">
                  <div className="flex flex-col items-center">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {step.number}
                    </span>
                    {index < PROCESS_STEPS.length - 1 && (
                      <span className="mt-1 h-full w-px flex-1 bg-slate-700" />
                    )}
                  </div>
                  <div className="pb-2">
                    <h4 className="text-base font-semibold text-white">
                      {step.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-slate-800 p-3 text-sm text-blue-300">
              <PackageCheck className="h-4 w-4 flex-shrink-0" />
              <span>Hotové díly předávám pouze po ověření shody s dokumentací.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
