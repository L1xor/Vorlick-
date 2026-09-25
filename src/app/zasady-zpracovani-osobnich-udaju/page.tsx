import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Zásady zpracování osobních údajů | Jiří Vorlický",
  description:
    "Informace o zpracování osobních údajů v nástrojárně Jiřího Vorlického v Dolní Řasnici.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Zásady zpracování osobních údajů
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Tyto zásady popisují, jakým způsobem jsou zpracovávány osobní
              údaje v souvislosti s provozem webových stránek a vyřizováním
              poptávek zákazníků.
            </p>

            <div className="mt-10 space-y-10 text-sm leading-relaxed text-slate-600 sm:text-base">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  1. Správce osobních údajů
                </h2>
                <p className="mt-3">
                  Správcem osobních údajů je{" "}
                  <strong className="font-semibold text-slate-900">
                    Jiří Vorlický
                  </strong>
                  , IČO 49898213, fyzická osoba podnikající dle živnostenského
                  zákona, se sídlem provozovny Dolní Řasnice 119, 464 01
                  Frýdlant v Čechách.
                </p>
                <p className="mt-3">
                  Jiří Vorlický provozuje zakázkovou nástrojárnu a kovoobrábění
                  v Dolní Řasnici. V dílně se věnuje výrobě nástrojů a
                  přípravků, soustružení, frézování, vrtání i broušení pro
                  zákazníky ze strojírenského průmyslu v celém Libereckém kraji.
                </p>
                <ul className="mt-3 space-y-1">
                  <li>
                    E-mail:{" "}
                    <a
                      href="mailto:kovovorlicky@seznam.cz"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      kovovorlicky@seznam.cz
                    </a>
                  </li>
                  <li>
                    Telefon:{" "}
                    <a
                      href="tel:+420606265474"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      +420 606 265 474
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  2. Jaké osobní údaje zpracováváme
                </h2>
                <p className="mt-3">
                  V souvislosti s poptávkou výroby nebo dotazem zpracováváme
                  zejména tyto údaje:
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  <li>jméno a příjmení, popřípadě název firmy,</li>
                  <li>e-mailovou adresu,</li>
                  <li>telefonní číslo (pokud jej uvedete),</li>
                  <li>obsah zprávy a specifikaci poptávky,</li>
                  <li>
                    případně další údaje obsažené ve výkresové dokumentaci nebo
                    přílohách, které nám zašlete.
                  </li>
                </ul>
                <p className="mt-3">
                  Při návštěvě webových stránek mohou být zpracovávány také
                  technické údaje související s provozem webu, například IP
                  adresa, typ prohlížeče nebo informace o zařízení.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  3. Účel a právní základ zpracování
                </h2>
                <p className="mt-3">
                  Osobní údaje zpracováváme za účelem vyřízení vaší poptávky,
                  přípravy cenové nabídky, domluvy výroby a následné komunikace
                  ohledně zakázky.
                </p>
                <p className="mt-3">
                  Právním základem zpracování je jednání o uzavření smlouvy nebo
                  plnění smlouvy, popřípadě oprávněný zájem správce na
                  zajištění komunikace se zájemci o výrobu a na ochranu svých
                  práv.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  4. Doba uchování údajů
                </h2>
                <p className="mt-3">
                  Osobní údaje uchováváme po dobu nezbytnou k vyřízení poptávky
                  a následné komunikace. Pokud z poptávky vznikne obchodní
                  vztah, údaje uchováváme po dobu trvání spolupráce a dále po
                  dobu stanovenou příslušnými právními předpisy, zejména v
                  oblasti účetnictví a daňové evidence.
                </p>
                <p className="mt-3">
                  Údaje, které nejsou potřebné k dalšímu zpracování, jsou
                  vymazány nebo anonymizovány.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  5. Příjemci osobních údajů
                </h2>
                <p className="mt-3">
                  Osobní údaje neprodáváme ani neposkytujeme třetím stranám pro
                  marketingové účely. Údaje mohou být zpřístupněny pouze
                  poskytovatelům technických služeb nezbytných pro provoz webu
                  nebo doručování e-mailové komunikace, a to v rozsahu nutném
                  pro zajištění těchto služeb.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  6. Vaše práva
                </h2>
                <p className="mt-3">V souvislosti se zpracováním osobních údajů máte právo:</p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  <li>požádat o přístup ke svým osobním údajům,</li>
                  <li>požadovat opravu nebo výmaz údajů,</li>
                  <li>požadovat omezení zpracování,</li>
                  <li>vznést námitku proti zpracování,</li>
                  <li>požadovat přenositelnost údajů,</li>
                  <li>
                    podat stížnost u Úřadu pro ochranu osobních údajů (
                    <a
                      href="https://www.uoou.cz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      www.uoou.cz
                    </a>
                    ).
                  </li>
                </ul>
                <p className="mt-3">
                  Svá práva můžete uplatnit kontaktováním správce na e-mailové
                  adrese{" "}
                  <a
                    href="mailto:kovovorlicky@seznam.cz"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    kovovorlicky@seznam.cz
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  7. Závěrečná ustanovení
                </h2>
                <p className="mt-3">
                  Tyto zásady jsou platné od 23. 9. 2026. Správce si vyhrazuje
                  právo je v případě potřeby aktualizovat. Aktuální znění je
                  vždy dostupné na této stránce.
                </p>
                <p className="mt-6">
                  <Link
                    href="/#kontakt"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    ← Zpět na poptávkový formulář
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
