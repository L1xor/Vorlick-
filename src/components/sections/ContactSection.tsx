"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  CheckCircle2,
  Layers,
  MapPin,
  Paperclip,
  PhoneCall,
  RotateCcw,
  Send,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Datový model poptávkového formuláře.
 */
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * Chybové hlášky pro jednotlivá pole formuláře.
 */
interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Stav odesílání formuláře.
 */
interface ContactFormState {
  data: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSuccess: boolean;
}

interface QuickHighlight {
  icon: LucideIcon;
  label: string;
}

const INITIAL_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const PHONE_NUMBER = "+420 606 265 474";
const PHONE_HREF = "tel:+420606265474";
const EMAIL_ADDRESS = "kovovorlicky@seznam.cz";
const EMAIL_HREF = "mailto:kovovorlicky@seznam.cz";

const QUICK_HIGHLIGHTS: QuickHighlight[] = [
  { icon: ShieldCheck, label: "Soustružení a frézování" },
  { icon: Layers, label: "Zakázková i maloseriová výroba" },
  { icon: MapPin, label: "Frýdlantský výběžek a Liberecko" },
];

function validateForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (data.name.trim().length < 2) {
    errors.name = "Zadejte prosím jméno a příjmení nebo název firmy.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email.trim())) {
    errors.email = "Zadejte prosím platnou e-mailovou adresu.";
  }

  if (data.message.trim().length < 10) {
    errors.message = "Popište prosím poptávku alespoň v jedné souvislé větě.";
  }

  return errors;
}

export default function ContactSection() {
  const [state, setState] = useState<ContactFormState>({
    data: INITIAL_FORM_DATA,
    errors: {},
    isSubmitting: false,
    isSuccess: false,
  });

  const handleChange = (field: keyof ContactFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState((prev) => ({
        ...prev,
        data: { ...prev.data, [field]: event.target.value },
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm(state.data);

    if (Object.keys(errors).length > 0) {
      setState((prev) => ({ ...prev, errors }));
      return;
    }

    setState((prev) => ({ ...prev, errors: {}, isSubmitting: true }));

    // MOCK REŽIM: síťové volání je simulováno pomocí setTimeout.
    // Po napojení na Web3Forms nahraďte simulaci níže tímto voláním:
    //
    // const response = await fetch("https://api.web3forms.com/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
    //     subject: "Nová poptávka z webu - Jiří Vorlický",
    //     from_name: state.data.name,
    //     email: state.data.email,
    //     phone: state.data.phone,
    //     message: state.data.message,
    //   }),
    // });
    // const result = await response.json();
    // if (!result.success) { /* zpracování chyby */ }

    setTimeout(() => {
      setState({
        data: INITIAL_FORM_DATA,
        errors: {},
        isSubmitting: false,
        isSuccess: true,
      });
    }, 1000);
  };

  const handleNewInquiry = () => {
    setState({
      data: INITIAL_FORM_DATA,
      errors: {},
      isSubmitting: false,
      isSuccess: false,
    });
  };

  return (
    <section id="kontakt" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Poptávka výroby
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Poptávka na výrobu nástroje, přípravku nebo obrobku? Napište nebo
            zavolejte, odpověď přijde s návrhem řešení.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-between rounded-2xl bg-slate-900 p-8 text-white sm:p-10">
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">
                Rychlé vyřízení poptávky bez zbytečných průtahů
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Po zaslání výkresové dokumentace a specifikace dílu přijde do
                nejbližšího pracovního dne odpověď s návrhem řešení a orientační
                cenou.
              </p>

              <ul className="mt-8 space-y-4">
                {QUICK_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 flex-shrink-0 text-blue-400" />
                      <span className="text-sm text-slate-200">
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-10 border-t border-slate-800 pt-6">
              <p className="text-sm text-slate-400">Preferujete telefon?</p>
              <a
                href={PHONE_HREF}
                className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-blue-400"
              >
                <PhoneCall className="h-5 w-5" />
                {PHONE_NUMBER}
              </a>
            </div>
          </div>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Poptávkový formulář</CardTitle>
              <CardDescription>
                Vyplňte základní údaje a stručně popište zadání, odpověď
                přijde s cenovou nabídkou.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {state.isSuccess ? (
                <div className="flex flex-col items-center gap-4 rounded-xl bg-green-50 px-6 py-10 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      Poptávka byla úspěšně odeslána
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Děkujeme za váš zájem. Odpověď přijde na uvedený kontakt
                      co nejdříve.
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleNewInquiry}>
                    <RotateCcw className="h-4 w-4" />
                    Poslat další dotaz
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Jméno a příjmení nebo název firmy
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Např. Jan Novák nebo Novák strojírny s.r.o."
                      value={state.data.name}
                      onChange={handleChange("name")}
                      aria-invalid={Boolean(state.errors.name)}
                    />
                    {state.errors.name && (
                      <p className="text-sm text-red-600">{state.errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="vas@email.cz"
                        value={state.data.email}
                        onChange={handleChange("email")}
                        aria-invalid={Boolean(state.errors.email)}
                      />
                      {state.errors.email && (
                        <p className="text-sm text-red-600">
                          {state.errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+420 XXX XXX XXX"
                        value={state.data.phone}
                        onChange={handleChange("phone")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Zadání poptávky a specifikace dílu
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Popište prosím typ dílu, materiál, množství a případně termín poptávky."
                      value={state.data.message}
                      onChange={handleChange("message")}
                      aria-invalid={Boolean(state.errors.message)}
                    />
                    {state.errors.message && (
                      <p className="text-sm text-red-600">
                        {state.errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                    <Paperclip className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                    <span>
                      Hotová výkresová dokumentace v PDF, STEP nebo DWG? Pošlete
                      ji přímo na e-mail:{" "}
                      <a
                        href={EMAIL_HREF}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {EMAIL_ADDRESS}
                      </a>
                      .
                    </span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={state.isSubmitting}
                  >
                    {state.isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Odesílání poptávky...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Odeslat poptávku
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs leading-relaxed text-slate-500">
                    Odesláním formuláře berete na vědomí zpracování osobních
                    údajů za účelem vyřízení vaší poptávky.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
