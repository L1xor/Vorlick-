export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold text-slate-900">
              Jiří Vorlický
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Nástrojárna a zakázkové kovoobrábění
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Dolní Řasnice 119, 464 01 Frýdlant v Čechách
            </p>
          </div>

          <div className="text-sm text-slate-600 sm:text-right">
            <p>IČO: 49898213</p>
            <p className="mt-1">
              Fyzická osoba zapsaná v živnostenském rejstříku
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          © {currentYear} Jiří Vorlický. Všechna práva vyhrazena.
        </div>
      </div>
    </footer>
  );
}
