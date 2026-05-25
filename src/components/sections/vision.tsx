"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";

const PILLARS = [
  {
    n: "I",
    title: "Geld",
    body: "Niet als einddoel, maar als middel voor vrijheid, keuze en controle.",
  },
  {
    n: "II",
    title: "Controle",
    body: "Wie zijn cijfers niet begrijpt, blijft afhankelijk van anderen.",
  },
  {
    n: "III",
    title: "Ondernemerschap",
    body: "Een bedrijf moet meer zijn dan een baan voor jezelf. Het moet een voertuig worden voor groei en vrijheid.",
  },
  {
    n: "IV",
    title: "Vermogen",
    body: "Echt financieel denken begint pas wanneer je niet alleen kijkt naar verdienen, maar naar behouden, structureren en opbouwen.",
  },
];

export function Vision() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="section-wrap mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="eyebrow">Visie — 04</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
          <Reveal delay={150} className="lg:col-span-7">
            <h2 className="display-lg">
              Meer omzet is niet hetzelfde als{" "}
              <span className="display-italic">meer vrijheid.</span>
            </h2>
          </Reveal>
          <Reveal delay={300} className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted-foreground leading-relaxed text-base">
              Vier pijlers waarop Rabi&apos;s denken rust. Geen losse tactieken,
              maar een manier van kijken die structureel is, lange termijn,
              en ontworpen voor mensen die serieus bouwen.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {PILLARS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 100}
              className="card-premium relative p-8 md:p-10 min-h-[280px] flex flex-col justify-between group cursor-default"
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-4xl text-accent leading-none">
                  {p.n}
                </span>
                <ArrowUpRight className="h-4 w-4 text-subtle-foreground group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-[28px] text-foreground mb-3">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <div className="mt-24 border-l border-accent pl-8 max-w-3xl">
            <p className="font-serif text-2xl md:text-3xl leading-snug text-foreground">
              <span className="text-accent">&ldquo;</span>
              De meeste mensen verdienen geld. Weinigen begrijpen het
              systeem erachter.
              <span className="text-accent">&rdquo;</span>
            </p>
            <p className="mt-5 eyebrow-muted">— Rabi Adli</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
