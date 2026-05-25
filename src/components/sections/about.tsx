"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";

const STATS = [
  { label: "Achtergrond", value: "Ex ABN · Deloitte" },
  { label: "Focus", value: "Finance & ondernemerschap" },
  { label: "Domein", value: "Boekhouding · fiscaliteit · control" },
  { label: "Lange termijn", value: "Vermogensopbouw" },
];

export function About() {
  return (
    <section id="visie" className="relative py-28 md:py-40">
      <div className="section-wrap mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="h-px w-10 bg-foreground/20" />
                <span className="eyebrow">Over Rabi — 02</span>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="display-lg max-w-2xl">
                Wie is <span className="display-italic">Rabi Adli</span>?
              </h2>
            </Reveal>

            <Reveal delay={250} className="mt-12 space-y-7 max-w-xl">
              <p className="text-lg leading-relaxed text-foreground font-light">
                Rabi Adli is ondernemer, financieel denker en bouwer van
                platformen rondom boekhouding, fiscaliteit, control en
                vermogensopbouw.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Na zijn ervaring binnen de financiële wereld, onder andere bij{" "}
                <span className="text-foreground">ABN AMRO</span> en{" "}
                <span className="text-foreground">Deloitte</span>, zag hij hoe
                groot het verschil is tussen geld verdienen en geld begrijpen.
                Veel ondernemers draaien omzet, maar missen overzicht,
                strategie en controle.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Daarom bouwt Rabi aan content, bedrijven en communities die
                mensen helpen anders kijken naar geld, groei en vrijheid.
              </p>
            </Reveal>

            {/* Stats grid */}
            <Reveal delay={400}>
              <div className="mt-16 grid grid-cols-2 gap-px bg-border border border-border">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-background p-6 md:p-7 group cursor-default"
                  >
                    <div className="eyebrow-muted mb-3 group-hover:text-accent transition-colors">
                      {s.label}
                    </div>
                    <div className="text-sm md:text-base text-foreground">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — portrait card */}
          <Reveal delay={300} className="lg:col-span-5">
            <div className="relative">
              {/* portrait */}
              <div className="relative aspect-[3/4] overflow-hidden border border-border bg-card">
                {/* Placeholder bg — visible until the user drops their portrait */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #181818 0%, #0a0a0a 60%, #050505 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <span className="font-serif text-[200px] leading-none text-foreground/[0.05]">
                    R · A
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/rabi-portrait.jpg"
                  alt="Rabi Adli — portrait"
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.85] contrast-[1.08] hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />
                {/* overlay gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,5,5,0) 50%, rgba(5,5,5,0.6) 100%)",
                  }}
                />
                {/* corner labels */}
                <div className="absolute top-5 left-5 right-5 flex justify-between text-[10px] tracking-[0.32em] uppercase text-foreground/80">
                  <span>R · A</span>
                  <span>NL · 2025</span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
                      Founder
                    </div>
                    <div className="font-serif text-2xl text-foreground">
                      Rabi Adli
                    </div>
                  </div>
                  <div className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground text-right">
                    Geld<br />Controle<br />Vrijheid
                  </div>
                </div>
              </div>

              {/* caption strip */}
              <div className="mt-4 flex items-center justify-between text-[11px] tracking-[0.28em] uppercase text-subtle-foreground">
                <span>Private Office</span>
                <span>—</span>
                <span>Op afspraak</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
