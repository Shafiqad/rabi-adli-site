"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";
import { Quote } from "lucide-react";

interface Review {
  quote: string;
  name: string;
  role: string;
}

const REVIEWS: Review[] = [
  {
    quote:
      "Rabi heeft mijn kijk op geld, structuur en ondernemerschap compleet veranderd. Geen vage termen — direct, scherp en altijd vanuit de praktijk.",
    name: "Naam Klant",
    role: "Founder · Sector",
  },
  {
    quote:
      "Eindelijk iemand die finance niet alleen begrijpt maar ook kan uitleggen. Zijn inzichten hebben me geholpen mijn bedrijf strategischer te runnen.",
    name: "Naam Klant",
    role: "CEO · Sector",
  },
  {
    quote:
      "Wat me het meest opvalt: Rabi denkt lange termijn. Geen hype, geen quick wins — wel structuur, controle en richting voor de jaren erna.",
    name: "Naam Klant",
    role: "Ondernemer",
  },
];

export function Reviews() {
  return (
    <section id="media" className="relative py-28 md:py-40">
      <div className="section-wrap mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="h-px w-10 bg-foreground/20" />
                <span className="eyebrow">Wat mensen zeggen — 04</span>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="display-lg">
                Stemmen uit{" "}
                <span className="display-italic">de praktijk.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={300} className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted-foreground text-base leading-relaxed">
              Ondernemers, professionals en bouwers die met Rabi werkten —
              en hun denken over geld en structuur fundamenteel veranderden.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 120}>
              <article className="group relative h-full card-premium rounded-[20px] p-7 md:p-8 flex flex-col justify-between">
                <Quote
                  aria-hidden
                  className="h-6 w-6 text-accent/70 mb-6"
                  strokeWidth={1.4}
                />
                <p className="font-serif text-[19px] md:text-[20px] leading-[1.45] text-foreground mb-8 flex-1">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="pt-6 border-t border-border">
                  <div className="text-[14px] text-foreground font-medium">
                    {r.name}
                  </div>
                  <div className="text-[11px] tracking-[0.18em] uppercase text-subtle-foreground mt-1.5">
                    {r.role}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
