"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";

const PHASES = [
  {
    n: "01",
    label: "De basis",
    body: "Een persoonlijke achtergrond waarin ambitie, discipline en financiële bewustwording steeds belangrijker werden.",
  },
  {
    n: "02",
    label: "De financiële wereld",
    body: "Ervaring binnen professionele omgevingen — ABN AMRO, Deloitte — waar cijfers, structuren en systemen centraal staan.",
  },
  {
    n: "03",
    label: "De shift",
    body: "Het besef dat veel mensen en ondernemers geld verdienen, maar het financiële systeem erachter niet echt begrijpen.",
  },
  {
    n: "04",
    label: "De missie",
    body: "Het bouwen van platformen, content en bedrijven die mensen helpen meer grip, controle en vrijheid te creëren.",
  },
];

export function Timeline() {
  return (
    <section className="relative py-28 md:py-40 bg-muted/0">
      <div className="section-wrap mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="eyebrow">Levensloop — 03</span>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h2 className="display-lg max-w-3xl">
            Van <span className="display-italic">ervaring</span> naar missie.
          </h2>
        </Reveal>

        <div className="mt-20 md:mt-28 relative">
          {/* vertical line */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-border" aria-hidden />

          <div className="space-y-16 md:space-y-24">
            {PHASES.map((p, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal
                  key={p.n}
                  delay={i * 120}
                  className={`relative grid grid-cols-[28px_1fr] md:grid-cols-2 gap-6 md:gap-16 items-start`}
                >
                  {/* dot */}
                  <div className="md:col-span-2 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-2 flex items-center">
                    <span className="block w-1.5 h-1.5 rounded-full bg-accent md:mx-auto" />
                    <span className="md:hidden flex-1 h-px bg-border ml-2" />
                  </div>

                  {/* content */}
                  <div className={`md:col-span-1 ${left ? "md:pr-16 md:text-right md:order-1" : "md:pl-16 md:order-2"} col-span-2`}>
                    <div className={`flex items-baseline gap-3 ${left ? "md:justify-end" : ""} mb-4`}>
                      <span className="font-serif text-5xl text-accent leading-none">{p.n}</span>
                      <span className="eyebrow-muted">Fase</span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                      {p.label}
                    </h3>
                    <p className="text-muted-foreground max-w-md leading-relaxed text-sm md:text-base md:inline-block">
                      {p.body}
                    </p>
                  </div>

                  {/* spacer for opposite side */}
                  <div className={`hidden md:block ${left ? "md:order-2" : "md:order-1"}`} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
