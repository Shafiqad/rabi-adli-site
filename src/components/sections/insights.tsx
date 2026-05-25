"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";

const POSTS = [
  {
    n: "001",
    date: "24 · 03 · 2025",
    tag: "Inzicht",
    title: "Waarom geld verdienen niet genoeg is.",
    body: "De meeste ondernemers focussen op de top-line. Maar omzet zonder structuur, fiscale logica en lange termijn denken bouwt geen vermogen op.",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "002",
    date: "11 · 02 · 2025",
    tag: "Essay",
    title: "De fout die veel ondernemers maken met hun cijfers.",
    body: "Boekhouding is geen administratie achteraf. Het is een instrument waarmee je richting geeft, beslissingen onderbouwt en grip houdt.",
    img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "003",
    date: "28 · 01 · 2025",
    tag: "Long-form",
    title: "Vrijheid begint bij controle.",
    body: "Niet harder werken. Scherper sturen. Waarom de échte sprong in ondernemerschap begint op het moment dat je je structuur kent.",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Insights() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="section-wrap mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="eyebrow">Inzichten — 07</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
          <Reveal delay={150} className="lg:col-span-8">
            <h2 className="display-lg">
              Inzichten voor mensen die{" "}
              <span className="display-italic">scherper</span> willen kijken.
            </h2>
          </Reveal>
          <Reveal delay={300} className="lg:col-span-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-foreground hover:text-accent transition-colors group"
            >
              <span className="border-b border-border group-hover:border-accent pb-1">
                Alle inzichten
              </span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {POSTS.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 120}
              className="card-premium glow-border group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${p.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%) brightness(0.5) contrast(1.05)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.65) 100%)",
                  }}
                />
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <span className="self-start eyebrow text-foreground">{p.tag}</span>
                  <span className="self-end font-serif text-5xl text-foreground/30">
                    {p.n}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="eyebrow-muted">{p.date}</span>
                  <span className="text-subtle-foreground text-[10px] tracking-[0.32em] uppercase">
                    5 min
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-foreground leading-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.body}
                </p>
                <a
                  href="#"
                  className="mt-auto pt-4 border-t border-border inline-flex items-center justify-between text-[11px] tracking-[0.32em] uppercase text-foreground hover:text-accent transition-colors"
                >
                  Lees inzicht
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
