"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";

const ENTITIES = [
  {
    tag: "Platform",
    title: "Geldinstituut",
    body: "Voor ondernemers die grip willen op cijfers, belasting, boekhouding en financiële strategie.",
    meta: ["Boekhouding", "Fiscaliteit", "Control"],
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Community",
    title: "Moneyfesto",
    body: "Een exclusieve omgeving voor mensen die anders willen leren kijken naar geld, kapitaal, vrijheid en het systeem.",
    meta: ["Members only", "Kapitaal", "Systeemdenken"],
    img: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Media",
    title: "Content & media",
    body: "Inzichten over geld, fiscaliteit, ondernemerschap en vermogensopbouw — direct en zonder ruis.",
    meta: ["Essays", "Podcast", "Long-form"],
    img: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Samenwerking",
    title: "Partnerships",
    body: "Voor media, podcasts, events, partnerships en zakelijke aanvragen die serieus en passend zijn.",
    meta: ["Media", "Events", "Strategisch"],
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Ecosystem() {
  return (
    <section id="werk" className="relative py-28 md:py-40">
      <div className="section-wrap mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="h-px w-10 bg-foreground/20" />
                <span className="eyebrow">Mijn werk — 05</span>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="display-lg">
                De bedrijven en platformen achter{" "}
                <span className="display-italic">mijn missie.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={300} className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted-foreground text-base leading-relaxed">
              Een ecosysteem dat is opgebouwd rondom één principe: mensen
              leren geld, structuur en vrijheid beter begrijpen.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {ENTITIES.map((e, i) => (
            <Reveal
              key={e.title}
              delay={i * 100}
              className="group card-premium glow-border relative overflow-hidden"
            >
              <div className="relative h-[260px] md:h-[300px] overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${e.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%) brightness(0.45)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.85) 100%)",
                  }}
                />
                <div className="relative h-full p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-foreground">{e.tag}</span>
                    <span className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
                      0{i + 1} / 04
                    </span>
                  </div>
                  <ArrowUpRight className="self-end h-5 w-5 text-foreground/70 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-border">
                <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                  {e.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-md">
                  {e.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {e.meta.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground border border-border px-3 py-1.5 rounded-full"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
