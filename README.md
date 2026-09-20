# Jiří Vorlický – Nástrojárna a kovoobrábění

Firemní prezentační web (one-page) pro firmu Jiří Vorlický, nástrojárna a zakázkové kovoobrábění se sídlem v Dolní Řasnici (Frýdlantsko).

## Tech stack

- Next.js (App Router, `src/app`)
- TypeScript (striktní typování)
- Tailwind CSS (světlé téma)
- shadcn/ui komponenty (Button, Input, Textarea, Card, Badge, Sheet)
- lucide-react ikony

## Spuštění

```bash
npm install
npm run dev
```

Aplikace poběží na [http://localhost:3000](http://localhost:3000).

## Poznámky

- Web neobsahuje žádné sledovací cookies ani cookie banner.
- Kontaktní formulář (`src/components/sections/ContactSection.tsx`) běží v mock režimu se simulací odeslání. Pro napojení na Web3Forms postupujte podle komentáře v kódu funkce `handleSubmit`.
