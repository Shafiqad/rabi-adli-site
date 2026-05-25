"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";

interface Usp {
  n: string;
  title: string;
  body: string;
}

const ITEMS: Usp[] = [
  {
    n: "01",
    title: "10+ jaar in finance",
    body: "Van ABN AMRO tot Deloitte. Het systeem van binnenuit gezien — en geleerd hoe geld, advies en structuur echt werken.",
  },
  {
    n: "02",
    title: "Ondernemer in finance",
    body: "Niet alleen praten over kapitaal en vrijheid. Zelf bedrijven gebouwd rondom de inzichten die ik deel.",
  },
  {
    n: "03",
    title: "Onafhankelijk denken",
    body: "Geen producten verkopen. Geen verborgen incentives. Alleen scherp kijken naar geld, structuur en keuzes.",
  },
];

export function Usps() {
  return (
    <section className="relative py-24 md:py-32 border-y border-border">
      <div className="section-wrap mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4 mb-14 md:mb-20">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="eyebrow">Waar ik voor sta — 01</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {ITEMS.map((item, i) => (
            <Reveal key={item.n} delay={i * 120}>
              <div className="group relative pl-6 border-l border-border hover:border-accent transition-colors duration-500">
                <span className="block text-[10px] tracking-[0.32em] uppercase text-subtle-foreground mb-5">
                  {item.n}
                </span>
                <h3 className="font-serif text-[26px] md:text-[30px] leading-[1.15] text-foreground mb-5">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground max-w-sm">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
