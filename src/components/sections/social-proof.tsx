"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";
import { Instagram, Mic, Tv, ArrowUpRight } from "lucide-react";

const STATS = [
  { value: "120K+", label: "Community bereik" },
  { value: "20M+", label: "Content views" },
  { value: "100+", label: "Inzichten & essays" },
  { value: "Top 1%", label: "Finance NL · org." },
];

const FEATURES = [
  { icon: Instagram, label: "Instagram", note: "@rabiadli" },
  { icon: Mic, label: "Podcasts", note: "Gast · interviews" },
  { icon: Tv, label: "Media", note: "Pers · publicaties" },
];

export function SocialProof() {
  return (
    <section id="media" className="relative py-28 md:py-40 bg-muted">
      <div className="section-wrap mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="eyebrow">Media & bereik — 06</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
          <Reveal delay={150} className="lg:col-span-8">
            <h2 className="display-lg">
              Gebouwd op kennis,{" "}
              <span className="display-italic">ervaring</span> en bereik.
            </h2>
          </Reveal>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className="bg-muted p-8 md:p-10"
            >
              <div className="font-serif text-4xl md:text-5xl text-foreground mb-2">
                {s.value}
              </div>
              <div className="eyebrow-muted">{s.label}</div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Quote block */}
          <Reveal delay={200} className="lg:col-span-7">
            <div className="border-l border-accent pl-8 max-w-2xl">
              <p className="font-serif text-2xl md:text-[34px] leading-snug text-foreground">
                Geen standaard finance content. Geen oppervlakkige motivatie.
                Maar <span className="display-italic">scherpe inzichten</span>{" "}
                over geld, systeemdenken en ondernemerschap.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <a
                  key={f.label}
                  href="#"
                  className="card-premium glow-border p-5 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <f.icon className="h-4 w-4 text-accent" />
                    <div>
                      <div className="text-sm text-foreground">{f.label}</div>
                      <div className="text-[11px] text-subtle-foreground tracking-wide">
                        {f.note}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-subtle-foreground group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Side — press mentions */}
          <Reveal delay={350} className="lg:col-span-5 lg:pl-10 lg:border-l border-border">
            <div className="eyebrow-muted mb-6">Eerder verschenen</div>
            <ul className="space-y-5">
              {[
                ["Quote Magazine", "Interview · ondernemerschap & vermogen"],
                ["Bouwstenen Podcast", "Gast · fiscaliteit & control"],
                ["De Ondernemer", "Profiel · founder Geldinstituut"],
                ["Sprout", "Long-form · systeemdenken in finance"],
              ].map(([t, sub]) => (
                <li
                  key={t}
                  className="flex items-baseline justify-between border-b border-border pb-5 last:border-b-0"
                >
                  <div>
                    <div className="text-foreground text-sm md:text-base">{t}</div>
                    <div className="text-subtle-foreground text-xs mt-1">{sub}</div>
                  </div>
                  <span className="text-subtle-foreground text-[10px] tracking-[0.32em] uppercase">
                    24 — 25
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
