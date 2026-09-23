"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/#sluzby", label: "Služby" },
  { href: "/#o-nas", label: "O nástrojárně" },
  { href: "/#kontakt", label: "Kontakt" },
];

const PHONE_NUMBER = "+420 606 265 474";
const PHONE_HREF = "tel:+420606265474";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
            Jiří Vorlický
          </span>
          <span className="text-xs font-medium text-slate-500">
            Nástrojárna a kovoobrábění
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={PHONE_HREF}>
              <PhoneCall className="h-4 w-4" />
              {PHONE_NUMBER}
            </a>
          </Button>

          <Button asChild size="icon" variant="default" className="sm:hidden">
            <a href={PHONE_HREF} aria-label="Zavolat">
              <PhoneCall className="h-4 w-4" />
            </a>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Otevřít menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4 sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>Jiří Vorlický</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-slate-700 transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={PHONE_HREF}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-base font-semibold text-blue-600"
                >
                  <PhoneCall className="h-4 w-4" />
                  {PHONE_NUMBER}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
