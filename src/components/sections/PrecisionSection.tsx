import { FileSearch } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Příjem výkresu a poptávky",
    description:
      "Zaslání výkresové dokumentace a specifikace dílu. Posouzení poptávky a návrh technologického postupu výroby.",
  },
  {
    number: "02",
    title: "Výroba a kontrola rozměrů",
    description:
      "Výroba dílu na vlastním strojním vybavení a kontrola rozměrové přesnosti v průběhu výroby i po jejím dokončení.",
  },
  {
    number: "03",
    title: "Balení a doručení",
    description:
      "Výrobek odpovídající zadání osobně zabalím a doručím přímo na zákazníkem určené místo.",
  },
];

export default function PrecisionSection() {
  return (
    <section id="o-nas" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Nástrojárna s 30 lety zkušeností | Jiří Vorlický
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-base leading-relaxed text-slate-600">
            <p>
              Jmenuji se Jiří Vorlický a přes 30 let vedu zakázkovou
              nástrojárnu, kterou jsem od nuly vybudoval na poctivém řemesle a
              maximální přesnosti.
            </p>
            <p>
              Dnes dílna disponuje více než 10 nástrojařskými a kovoobráběcími
              stroji pro frézování, soustružení i broušení.
            </p>
            <p>
              Za tři dekády jsem dodal tisíce přesných dílů a nástrojů pro
              desítky výrobních podniků po celém Libereckém kraji. Vždy s
              garancí dodržení termínů a osobním dohledem nad každým výkresem.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 shadow-lg sm:p-8">
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-400">
              <FileSearch className="h-4 w-4" />
              Zakládám si na kvalitě
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
          </div>
        </div>
      </div>
    </section>
  );
}
