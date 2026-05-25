"use client";

import * as React from "react";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Reveal } from "@/components/reveal";

/* -------------------------------------------------------------------------- */
/*  Data — edit copy / swap image paths here.                                  */
/* -------------------------------------------------------------------------- */

type CardSize = "sm" | "md" | "lg" | "xl";

const SIZE_CLASS: Record<CardSize, string> = {
  sm: "w-[260px] h-[360px]",
  md: "w-[300px] h-[400px]",
  lg: "w-[340px] h-[440px]",
  xl: "w-[380px] h-[480px]",
};

interface TimelineItem {
  n: string;
  phase: string;
  title: string;
  body: string;
  img: string;
  size: CardSize;
  rotate: number;
  offset: number; // px translateY for floating archive feel
}

const ITEMS: TimelineItem[] = [
  {
    n: "01",
    phase: "Geboorte",
    title: "Het begin",
    body: "Iedere visie begint ergens. Bij afkomst, omgeving en de eerste lessen die je meekrijgt.",
    img: "/images/rabi-timeline-01.jpg",
    size: "md",
    rotate: -1.6,
    offset: 0,
  },
  {
    n: "02",
    phase: "Jeugd",
    title: "Vroege vorming",
    body: "De jaren waarin karakter, nieuwsgierigheid en discipline langzaam vorm krijgen.",
    img: "/images/rabi-timeline-02.jpg",
    size: "lg",
    rotate: 0.9,
    offset: -28,
  },
  {
    n: "03",
    phase: "Familie & omgeving",
    title: "De basis",
    body: "De omgeving waarin waarden, verantwoordelijkheid en ambitie steeds belangrijker werden.",
    img: "/images/rabi-timeline-03.jpg",
    size: "sm",
    rotate: -0.4,
    offset: 22,
  },
  {
    n: "04",
    phase: "Schooltijd",
    title: "Leren kijken",
    body: "Niet alleen leren wat er gezegd wordt, maar leren begrijpen hoe systemen werken.",
    img: "/images/rabi-timeline-04.jpg",
    size: "md",
    rotate: 1.3,
    offset: -12,
  },
  {
    n: "05",
    phase: "Eerste ambitie",
    title: "Meer willen begrijpen",
    body: "Het besef dat geld, keuzes en vrijheid sterker met elkaar verbonden zijn dan mensen denken.",
    img: "/images/rabi-timeline-05.jpg",
    size: "xl",
    rotate: -0.8,
    offset: 14,
  },
  {
    n: "06",
    phase: "Studie",
    title: "De verdieping",
    body: "Een fase waarin kennis, financiële inzichten en persoonlijke groei samenkwamen.",
    img: "/images/rabi-timeline-06.jpg",
    size: "md",
    rotate: 0,
    offset: -22,
  },
  {
    n: "07",
    phase: "Eerste stappen",
    title: "De financiële wereld",
    body: "De eerste ervaringen binnen omgevingen waar cijfers, structuur en verantwoordelijkheid centraal staan.",
    img: "/images/rabi-timeline-07.jpg",
    size: "lg",
    rotate: 0.6,
    offset: 8,
  },
  {
    n: "08",
    phase: "ABN AMRO",
    title: "Binnen het systeem",
    body: "Van dichtbij zien hoe geld, advies en financiële structuren in de praktijk werken.",
    img: "/images/rabi-timeline-08.jpg",
    size: "md",
    rotate: -1.2,
    offset: -16,
  },
  {
    n: "09",
    phase: "Deloitte",
    title: "Structuur en strategie",
    body: "Leren denken in systemen, processen, controle en besluitvorming.",
    img: "/images/rabi-timeline-09.jpg",
    size: "sm",
    rotate: 1.0,
    offset: 24,
  },
  {
    n: "10",
    phase: "De shift",
    title: "Een andere blik",
    body: "Het besef dat veel mensen geld verdienen, maar het systeem erachter niet echt begrijpen.",
    img: "/images/rabi-timeline-10.jpg",
    size: "lg",
    rotate: -0.3,
    offset: -10,
  },
  {
    n: "11",
    phase: "Ondernemerschap",
    title: "Zelf bouwen",
    body: "Van kennis naar actie. Van ervaring naar eigen visie. Van meedraaien naar creëren.",
    img: "/images/rabi-timeline-11.jpg",
    size: "xl",
    rotate: 0.7,
    offset: 12,
  },
  {
    n: "12",
    phase: "Geldinstituut",
    title: "Grip voor ondernemers",
    body: "Een platform voor ondernemers die hun cijfers, belasting en financiële strategie serieuzer willen nemen.",
    img: "/images/rabi-timeline-12.jpg",
    size: "md",
    rotate: -0.9,
    offset: -18,
  },
  {
    n: "13",
    phase: "Moneyfesto",
    title: "Denken in vrijheid",
    body: "Een omgeving voor mensen die anders willen kijken naar geld, kapitaal, ondernemerschap en het systeem.",
    img: "/images/rabi-timeline-13.jpg",
    size: "lg",
    rotate: 0.4,
    offset: 16,
  },
  {
    n: "14",
    phase: "Content & bereik",
    title: "De boodschap delen",
    body: "Inzichten over geld, fiscaliteit, ondernemerschap en vermogensopbouw toegankelijk maken voor een groter publiek.",
    img: "/images/rabi-timeline-14.jpg",
    size: "md",
    rotate: -0.6,
    offset: -6,
  },
  {
    n: "15",
    phase: "Nu",
    title: "De missie",
    body: "Mensen helpen niet alleen meer te verdienen, maar vooral beter te begrijpen, scherper te sturen en vrijer te bouwen.",
    img: "/images/rabi-timeline-15.jpg",
    size: "xl",
    rotate: 0,
    offset: 0,
  },
];

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

const NOISE_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>\")";

function TimelineCard({
  item,
  index,
  scrollProgress,
}: {
  item: TimelineItem;
  index: number;
  scrollProgress: MotionValue<number>;
}) {
  // Subtle parallax — every other card drifts a touch
  const direction = index % 3 === 0 ? -1 : index % 3 === 1 ? 0.6 : 0.2;
  const yShift = useTransform(scrollProgress, [0, 1], [0, 36 * direction]);

  return (
    <motion.div
      className={cn(
        "relative shrink-0 transition-[transform,filter] duration-700 ease-out",
        SIZE_CLASS[item.size],
        "group/peer peer-hover:opacity-60"
      )}
      style={{
        y: yShift,
        translateY: item.offset,
        rotate: item.rotate,
      }}
    >
      <div className="group relative w-full h-full rounded-[22px] overflow-hidden cursor-pointer">
        {/* Base gradient placeholder background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #181818 0%, #0a0a0a 60%, #050505 100%)",
          }}
        />

        {/* Ghost numeral — visible as a backdrop on placeholder cards */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-serif text-[180px] leading-none text-foreground/[0.045]">
            {item.n}
          </span>
        </div>

        {/* User-replaceable image (gracefully falls back to placeholder bg) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.55] contrast-[1.06] opacity-100 transition-[filter,transform] duration-1000 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03]"
          onError={(e) => {
            // If user hasn't dropped the file yet, hide image and let the
            // placeholder gradient + ghost numeral show through.
            (e.currentTarget as HTMLImageElement).style.opacity = "0";
          }}
        />

        {/* Bottom gradient for legibility */}
        <div
          className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* Noise overlay */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: NOISE_URL,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Border */}
        <div className="absolute inset-0 rounded-[inherit] border border-white/[0.07] group-hover:border-accent/55 transition-colors duration-700 pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] tracking-[0.32em] uppercase text-foreground/70 group-hover:text-accent transition-colors duration-500">
              {item.phase}
            </span>
            <span className="text-[10px] tracking-[0.32em] uppercase text-subtle-foreground">
              {item.n}&nbsp;/&nbsp;15
            </span>
          </div>

          <div>
            <h3 className="font-serif text-[26px] leading-tight text-foreground">
              {item.title}
            </h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-h-0 opacity-0 mt-0 group-hover:max-h-32 group-hover:opacity-100 group-hover:mt-3 overflow-hidden transition-all duration-700 ease-out">
              {item.body}
            </p>
          </div>
        </div>

        {/* Hover ring shadow */}
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            boxShadow:
              "0 30px 90px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(184, 58, 58,0.08)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function LifeTimeline() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal rail translation. Tuned so the last (15th) card lands fully
  // in view when the section ends.
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-72%"]);

  // Progress line for the bottom indicator
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Active item index — drives the active phase label
  const [activeIdx, setActiveIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.max(0, Math.min(ITEMS.length - 1, Math.floor(v * ITEMS.length)));
    if (next !== activeIdx) setActiveIdx(next);
  });

  const active = ITEMS[activeIdx];

  return (
    <>
      {/* ----- Desktop: cinematic horizontal rail ----- */}
      <section
        ref={containerRef}
        id="reis"
        className="relative hidden md:block h-[320vh] bg-background"
        aria-label="De reis achter de visie"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-stretch">
          {/* Decorative top-left brackets */}
          <span className="absolute top-8 left-8 w-6 h-6 border-t border-l border-border z-30 pointer-events-none" />
          <span className="absolute top-8 right-8 w-6 h-6 border-t border-r border-border z-30 pointer-events-none" />

          {/* Sticky intro */}
          <div className="relative z-20 h-screen w-[46%] xl:w-[42%] 2xl:w-[38%] flex flex-col justify-between py-24 lg:py-28 px-6 md:px-10 lg:px-14 pointer-events-none">
            <div className="pointer-events-auto">
              <div className="flex items-center gap-4 mb-10">
                <span className="h-px w-10 bg-foreground/20" />
                <span className="eyebrow">Life Timeline — 03</span>
              </div>
              <h2 className="font-serif text-foreground text-[40px] xl:text-[44px] leading-[1.06] tracking-[-0.01em] max-w-[440px]">
                De reis achter{" "}
                <span className="display-italic">de visie.</span>
              </h2>
              <p className="mt-8 text-muted-foreground max-w-md text-[15px] leading-relaxed">
                Van vroege lessen tot financiële expertise. Van persoonlijke
                groei tot het bouwen van platformen die mensen anders leren
                kijken naar geld, controle en vrijheid.
              </p>
            </div>

            {/* Progress indicator — active phase + scroll line */}
            <div className="pointer-events-auto space-y-4 max-w-md">
              <div className="flex items-baseline justify-between text-[10px] tracking-[0.32em] uppercase">
                <span className="text-subtle-foreground">Hoofdstuk</span>
                <span className="tabular-nums text-foreground">
                  {active.n} / 15
                </span>
              </div>

              <h4 className="font-serif text-[28px] leading-none text-foreground">
                {active.phase}
              </h4>

              <div className="relative h-px bg-border w-full mt-6">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ width: lineWidth }}
                />
                {/* tick marks */}
                <div className="absolute inset-0 flex justify-between">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "block w-px h-2 -translate-y-[3px] transition-colors duration-300",
                        i <= activeIdx ? "bg-accent/70" : "bg-border"
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-baseline justify-between text-[10px] tracking-[0.32em] uppercase text-subtle-foreground pt-2">
                <span>Het begin</span>
                <span>De missie</span>
              </div>

              <div className="pt-3 flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-subtle-foreground">
                <span className="block w-4 h-px bg-foreground/40" />
                <span>Scroll om te bewegen</span>
              </div>
            </div>
          </div>

          {/* Horizontal rail */}
          <div className="relative flex-1 min-w-0 h-screen flex items-center overflow-visible">
            <motion.div
              className="flex items-center gap-10 pl-12 pr-[28vw]"
              style={{ x }}
            >
              {ITEMS.map((item, i) => (
                <TimelineCard
                  key={item.n}
                  item={item}
                  index={i}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </motion.div>

            {/* Edge fades */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, #050505 0%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(270deg, #050505 0%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ----- Mobile / tablet: auto-scrolling marquee of timeline photos ----- */}
      <section
        id="reis-mobile"
        className="md:hidden relative py-24 overflow-hidden"
        aria-label="De reis achter de visie"
      >
        {/* Heading block */}
        <div className="px-6 mb-14">
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
          <Reveal delay={240}>
            <p className="mt-8 text-muted-foreground leading-relaxed">
              Van vroege lessen tot financiële expertise. Van persoonlijke groei
              tot het bouwen van platformen die mensen anders leren kijken naar
              geld, controle en vrijheid.
            </p>
          </Reveal>
        </div>

        {/* Auto-scrolling marquee */}
        <div className="relative marquee-paused">
          {/* Soft accent glow behind the strip */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 50%, rgba(184, 58, 58,0.08), transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative w-full overflow-hidden">
            <div className="flex items-stretch gap-4 marquee-track-left">
              {/* Duplicated for a seamless infinite loop */}
              {[...ITEMS, ...ITEMS].map((item, i) => (
                <MobileTimelineCard
                  key={`${item.n}-${i}`}
                  item={item}
                  index={i}
                />
              ))}
            </div>

            {/* Edge fades */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-16 z-20"
              style={{
                background:
                  "linear-gradient(90deg, rgb(5,5,5) 0%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-16 z-20"
              style={{
                background:
                  "linear-gradient(270deg, rgb(5,5,5) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* Caption strip below marquee */}
          <div className="mt-8 px-6 flex items-center justify-between text-[10px] tracking-[0.32em] uppercase text-subtle-foreground">
            <span>Hoofdstuk 01 — 15</span>
            <span>15 fragmenten</span>
          </div>
        </div>
      </section>

    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  MobileTimelineCard — fixed tile inside the marquee                         */
/* -------------------------------------------------------------------------- */

function MobileTimelineCard({
  item,
}: {
  item: TimelineItem;
  index: number;
}) {
  return (
    <article className="relative shrink-0 w-[240px] sm:w-[280px] aspect-[4/5] rounded-[18px] overflow-hidden border border-white/[0.07] bg-card">
      {/* Placeholder gradient */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #181818 0%, #0a0a0a 60%, #050505 100%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-serif text-[120px] leading-none text-foreground/[0.05]">
          {item.n}
        </span>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.65] contrast-[1.05]"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = "0";
        }}
      />

      {/* Bottom gradient for legibility */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Overlay text */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.32em] uppercase text-foreground/75">
            {item.phase}
          </span>
          <span className="text-[10px] tracking-[0.32em] uppercase text-subtle-foreground">
            {item.n}&nbsp;/&nbsp;15
          </span>
        </div>
        <div>
          <h3 className="font-serif text-[22px] leading-tight text-foreground">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Border */}
      <div className="absolute inset-0 rounded-[inherit] border border-white/[0.05] pointer-events-none" />
    </article>
  );
}
