"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";

export function Manifest() {
  return (
    <section id="verhaal" className="relative py-32 md:py-48">
      <div className="section-wrap mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-4 mb-14">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="eyebrow">Manifest — 01</span>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h2 className="display-lg max-w-4xl">
            Het standaardpad is{" "}
            <span className="display-italic">niet ontworpen</span>{" "}
            voor vrijheid.
          </h2>
        </Reveal>

        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <Reveal delay={250} className="md:col-span-1 hidden md:block">
            <div className="text-subtle-foreground text-xs tracking-[0.32em] uppercase rotate-180" style={{ writingMode: "vertical-rl" }}>
              Visie
            </div>
          </Reveal>

          <Reveal delay={300} className="md:col-span-7 space-y-7">
            <p className="text-xl md:text-2xl leading-[1.5] text-foreground font-light">
              De meeste mensen leren hoe ze geld moeten <em className="not-italic text-accent">verdienen</em>,
              maar niet hoe ze het moeten <em className="not-italic text-accent">begrijpen</em>.
              Ze werken harder, betalen meer, bouwen weinig structuur op en
              blijven afhankelijk van een systeem dat ze nooit echt hebben
              leren doorzien.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Rabi&apos;s werk begint bij een andere manier van kijken.
              Naar geld. Naar belasting. Naar ondernemerschap. Naar controle.
              En vooral — naar vrijheid.
            </p>
          </Reveal>

          <Reveal delay={400} className="md:col-span-4 md:pl-10 md:border-l border-border space-y-8">
            {[
              {
                k: "Geld",
                v: "Een middel, geen einddoel.",
              },
              {
                k: "Controle",
                v: "De voorwaarde voor vrijheid.",
              },
              {
                k: "Systeem",
                v: "Iets dat je leert doorzien.",
              },
            ].map((row) => (
              <div key={row.k} className="border-b border-border pb-5 last:border-b-0">
                <div className="eyebrow-muted mb-2">{row.k}</div>
                <div className="text-foreground text-base">{row.v}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={500}>
          <div className="divider-champagne mt-28" />
        </Reveal>
      </div>
    </section>
  );
}
