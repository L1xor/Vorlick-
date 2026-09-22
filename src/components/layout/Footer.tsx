import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

interface FooterNavLink {
  href: string;
  label: string;
}

interface FooterContactItem {
  icon: LucideIcon;
  text: string;
  href?: string;
}

const NAV_LINKS: FooterNavLink[] = [
  { href: "#", label: "Úvod" },
  { href: "#sluzby", label: "Služby" },
  { href: "#o-nas", label: "O nástrojárně" },
  { href: "#kontakt", label: "Poptávka" },
];

const CONTACT_ITEMS: FooterContactItem[] = [
  {
    icon: Phone,
    text: "+420 606 265 474",
    href: "tel:+420606265474",
  },
  {
    icon: Mail,
    text: "kovovorlicky@seznam.cz",
    href: "mailto:kovovorlicky@seznam.cz",
  },
  {
    icon: MapPin,
    text: "Dolní Řasnice 119, 464 01 Frýdlant v Čechách",
  },
  {
    icon: Clock,
    text: "Po–Pá 7:00–15:30, So–Ne zavřeno",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">Jiří Vorlický</p>
            <p className="mt-1 text-sm text-slate-400">
              Nástrojárna a zakázkové kovoobrábění · Dolní Řasnice
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Výroba nástrojů, přípravků a přesné kovoobrábění včetně soustružení
              a frézování pro strojírenský průmysl na Frýdlantsku.
            </p>
            <div className="mt-6 space-y-1 text-xs text-slate-500">
              <p>IČO: 49898213</p>
              <p>Fyzická osoba zapsaná v živnostenském rejstříku</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Rychlá navigace
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Kontakt
            </p>
            <div className="mt-4 space-y-3">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon;

                if (item.href) {
                  return (
                    <a
                      key={item.text}
                      href={item.href}
                      className="group flex items-start gap-3 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400 group-hover:text-blue-300" />
                      <span>{item.text}</span>
                    </a>
                  );
                }

                return (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 text-sm text-slate-400"
                  >
                    <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Jiří Vorlický. Všechna práva vyhrazena.</p>
          <p>Nástrojárna a kovoobrábění pro strojírenský průmysl</p>
        </div>
      </div>
    </footer>
  );
}
