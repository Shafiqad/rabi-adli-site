"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";

/* -------------------------------------------------------------------------- */
/*  Data — edit copy / swap image paths here.                                  */
/* -------------------------------------------------------------------------- */

interface TimelineItem {
  n: string;
  phase: string;
  title: string;
  body: string;
  img: string;
}

const ITEMS: TimelineItem[] = [
  {
    n: "01",
    phase: "Geboorte",
    title: "Het begin",
    body: "Iedere visie begint ergens. Bij afkomst, omgeving en de eerste lessen die je meekrijgt.",
    img: "/images/rabi-timeline-01.jpg",
  },
  {
    n: "02",
    phase: "Jeugd",
    title: "Vroege vorming",
    body: "De jaren waarin karakter, nieuwsgierigheid en discipline langzaam vorm krijgen.",
    img: "/images/rabi-timeline-02.jpg",
  },
  {
    n: "03",
    phase: "Familie & omgeving",
    title: "De basis",
    body: "De omgeving waarin waarden, verantwoordelijkheid en ambitie steeds belangrijker werden.",
    img: "/images/rabi-timeline-03.jpg",
  },
  {
    n: "04",
    phase: "Schooltijd",
    title: "Leren kijken",
    body: "Niet alleen leren wat er gezegd wordt, maar leren begrijpen hoe systemen werken.",
    img: "/images/rabi-timeline-04.jpg",
  },
  {
    n: "05",
    phase: "Eerste ambitie",
    title: "Meer willen begrijpen",
    body: "Het besef dat geld, keuzes en vrijheid sterker met elkaar verbonden zijn dan mensen denken.",
    img: "/images/rabi-timeline-05.jpg",
  },
  {
    n: "06",
    phase: "Studie",
    title: "De verdieping",
    body: "Een fase waarin kennis, financiële inzichten en persoonlijke groei samenkwamen.",
    img: "/images/rabi-timeline-06.jpg",
  },
  {
    n: "07",
    phase: "Eerste stappen",
    title: "De financiële wereld",
    body: "De eerste ervaringen binnen omgevingen waar cijfers, structuur en verantwoordelijkheid centraal staan.",
    img: "/images/rabi-timeline-07.jpg",
  },
  {
    n: "08",
    phase: "ABN AMRO",
    title: "Binnen het systeem",
    body: "Van dichtbij zien hoe geld, advies en financiële structuren in de praktijk werken.",
    img: "/images/rabi-timeline-08.jpg",
  },
  {
    n: "09",
    phase: "Deloitte",
    title: "Structuur en strategie",
    body: "Leren denken in systemen, processen, controle en besluitvorming.",
    img: "/images/rabi-timeline-09.jpg",
  },
  {
    n: "10",
    phase: "De shift",
    title: "Een andere blik",
    body: "Het besef dat veel mensen geld verdienen, maar het systeem erachter niet echt begrijpen.",
    img: "/images/rabi-timeline-10.jpg",
  },
  {
    n: "11",
    phase: "Ondernemerschap",
    title: "Zelf bouwen",
    body: "Van kennis naar actie. Van ervaring naar eigen visie. Van meedraaien naar creëren.",
    img: "/images/rabi-timeline-11.jpg",
  },
  {
    n: "12",
    phase: "Geldinstituut",
    title: "Grip voor ondernemers",
    body: "Een platform voor ondernemers die hun cijfers, belasting en financiële strategie serieuzer willen nemen.",
    img: "/images/rabi-timeline-12.jpg",
  },
  {
    n: "13",
    phase: "Moneyfesto",
    title: "Denken in vrijheid",
    body: "Een omgeving voor mensen die anders willen kijken naar geld, kapitaal, ondernemerschap en het systeem.",
    img: "/images/rabi-timeline-13.jpg",
  },
  {
    n: "14",
    phase: "Content & bereik",
    title: "De boodschap delen",
    body: "Inzichten over geld, fiscaliteit, ondernemerschap en vermogensopbouw toegankelijk maken voor een groter publiek.",
    img: "/images/rabi-timeline-14.jpg",
  },
  {
    n: "15",
    phase: "Nu",
    title: "De missie",
    body: "Mensen helpen niet alleen meer te verdienen, maar vooral beter te begrijpen, scherper te sturen en vrijer te bouwen.",
    img: "/images/rabi-timeline-15.jpg",
  },
];

const TOTAL = ITEMS.length;

/* -------------------------------------------------------------------------- */
/*  Section — sticky-stack scroll (mobile + desktop)                           */
/* -------------------------------------------------------------------------- */

export function LifeTimeline() {
  return (
    <section
      id="reis"
      className="relative bg-background py-24 md:py-32"
      aria-label="De reis achter de visie"
    >
      {/* ----- Header ----- */}
      <div className="section-wrap mx-auto max-w-7xl mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="h-px w-10 bg-foreground/20" />
                <span className="eyebrow">Life Timeline — 03</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display-lg">
                De reis achter <span className="display-italic">de visie.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={260} className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted-foreground text-base leading-relaxed">
              Van vroege lessen tot financiële expertise. Van persoonlijke groei
              tot het bouwen van platformen die mensen anders leren kijken naar
              geld, controle en vrijheid.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ----- Sticky stack ----- */}
      <div className="px-6 md:px-10 max-w-[640px] md:max-w-[760px] mx-auto">
        {ITEMS.map((item, i) => (
          <div
            key={item.n}
            className="sticky top-[12vh] md:top-[14vh] mb-[12vh] md:mb-[16vh] last:mb-0"
            style={{ zIndex: i + 1 }}
          >
            <StackCard item={item} index={i} />
          </div>
        ))}
        {/* Tail spacer so the final card lingers before the next section */}
        <div className="h-[26vh] md:h-[30vh]" aria-hidden />
      </div>

      {/* ----- Caption strip below stack ----- */}
      <div className="mt-10 px-6 md:px-10 max-w-[760px] mx-auto flex items-center justify-between text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
        <span>Hoofdstuk 01 — 15</span>
        <span>{TOTAL} fragmenten</span>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  StackCard — single tile in the sticky scroll stack                         */
/* -------------------------------------------------------------------------- */

const NOISE_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>\")";

function StackCard({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <article
      className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[24px] overflow-hidden border border-white/[0.08] bg-card shadow-[0_30px_80px_-25px_rgba(0,0,0,0.9)]"
    >
      {/* Placeholder gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #181818 0%, #0a0a0a 60%, #050505 100%)",
        }}
      />

      {/* Ghost numeral backdrop (placeholder & atmospheric texture) */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="font-serif text-[180px] md:text-[240px] leading-none text-foreground/[0.045]">
          {item.n}
        </span>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.img}
        alt={item.title}
        loading={index < 3 ? "eager" : "lazy"}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.65] contrast-[1.05]"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = "0";
        }}
      />

      {/* Bottom gradient for legibility */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[68%] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Noise overlay */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage: NOISE_URL,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Border */}
      <div className="absolute inset-0 rounded-[inherit] border border-white/[0.05] pointer-events-none" />

      {/* Overlay text */}
      <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-foreground/75">
            {item.phase}
          </span>
          <span className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
            {item.n}&nbsp;/&nbsp;{TOTAL}
          </span>
        </div>

        <div className="max-w-lg">
          <h3 className="font-serif text-[28px] sm:text-[32px] md:text-[40px] leading-[1.06] tracking-[-0.005em] text-foreground">
            {item.title}
          </h3>
          <p className="mt-4 text-[13.5px] md:text-[15px] leading-[1.55] text-muted-foreground">
            {item.body}
          </p>
        </div>
      </div>
    </article>
  );
}
