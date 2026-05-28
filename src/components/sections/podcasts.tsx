"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Reveal } from "@/components/reveal";

/* -------------------------------------------------------------------------- */
/*  Podcast data — drop matching covers in /public/images/ and they show up   */
/*  automatically. Filename convention: rabi-podcast-01.jpg … 05.jpg          */
/* -------------------------------------------------------------------------- */

interface Podcast {
  show: string;
  episode: string;
  date: string;
  cover: string;
  href: string;
}

const PODCASTS: Podcast[] = [
  {
    show: "Marcel Melis",
    episode: "Van €0 naar miljonair zonder eigen geld",
    date: "YouTube",
    cover: "/images/media/yt-marcel-melis.jpg",
    href: "https://www.youtube.com/watch?v=cqIKDuOGAI0",
  },
  {
    show: "Toine Manders",
    episode: "Het beste land om minder belasting te betalen",
    date: "YouTube",
    cover: "/images/media/yt-toine-manders.jpg",
    href: "https://www.youtube.com/watch?v=gUB19uyRlLM",
  },
  {
    show: "Salar Azimi",
    episode:
      "Anti-witwasanalist vs multimiljonair: zo wordt jouw geld tegen je gebruikt!",
    date: "YouTube",
    cover: "/images/media/yt-salar-azimi.jpg",
    href: "https://www.youtube.com/watch?v=X0qjyQdD_KE",
  },
  {
    show: "Wybren van Haga",
    episode: "Nederland is op weg naar de ondergang!",
    date: "YouTube",
    cover: "/images/media/yt-wybren-van-haga.jpg",
    href: "https://www.youtube.com/watch?v=sil7kY4x_pE",
  },
  {
    show: "Rob Heilbron",
    episode:
      "Hoe ik een lingerie-imperium bouwde met confrontatie-marketing",
    date: "YouTube",
    cover: "/images/media/yt-rob-heilbron.jpg",
    href: "https://www.youtube.com/watch?v=4Y2CwPZlf8k",
  },
  {
    show: "Hans Vijlbrief",
    episode: "Minister Hans Vijlbrief: 'EXIT TAX is geen goed idee.'",
    date: "YouTube",
    cover: "/images/media/yt-hans-vijlbrief.jpg",
    href: "https://www.youtube.com/watch?v=TeJnkTVsv5U",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function Podcasts() {
  const [active, setActive] = useState(0);
  const total = PODCASTS.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  return (
    <section
      id="media"
      className="relative py-24 md:py-32 bg-muted border-y border-border overflow-hidden"
    >
      <div className="section-wrap mx-auto max-w-7xl">
        <div className="text-center mb-14 md:mb-16">
          <Reveal>
            <span className="text-[11px] tracking-[0.32em] uppercase text-accent font-medium">
              The Rabi Adli Podcast
            </span>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-5 font-serif text-foreground leading-[1.05] tracking-[-0.018em] text-[clamp(34px,5.2vw,60px)] max-w-3xl mx-auto">
              Te gast bij.{" "}
              <span className="display-italic">Echte gesprekken.</span>
            </h2>
          </Reveal>
        </div>

        {/* --------- 3D carousel --------- */}
        <div className="relative">
          {/* Arrow controls */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Vorige aflevering"
            className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full border border-white/[0.10] bg-background/60 backdrop-blur-md text-foreground/80 hover:text-foreground hover:bg-background/80 hover:border-accent/40 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Volgende aflevering"
            className="hidden md:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full border border-white/[0.10] bg-background/60 backdrop-blur-md text-foreground/80 hover:text-foreground hover:bg-background/80 hover:border-accent/40 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* 3D stage */}
          <div
            className="relative mx-auto h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] flex items-center justify-center"
            style={{ perspective: "1600px" }}
          >
            {PODCASTS.map((p, i) => {
              const offset = getOffset(i, active, total);
              return (
                <CarouselCard
                  key={p.cover}
                  podcast={p}
                  offset={offset}
                  isActive={offset === 0}
                  index={i}
                  onClick={() => {
                    if (offset === 0) {
                      // Already centered — open the podcast.
                      window.open(p.href, "_blank", "noopener,noreferrer");
                    } else {
                      setActive(i);
                    }
                  }}
                />
              );
            })}
          </div>

          {/* Pagination dots */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {PODCASTS.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Naar aflevering ${i + 1}`}
                  className="group relative h-2 flex items-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-500 ease-out ${
                      isActive
                        ? "w-10 bg-accent"
                        : "w-1.5 bg-white/[0.18] group-hover:bg-white/35"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active episode meta (below carousel) */}
          <div className="mt-8 text-center min-h-[60px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span className="block text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
                  {PODCASTS[active].show} · {PODCASTS[active].date}
                </span>
                <a
                  href={PODCASTS[active].href}
                  target={PODCASTS[active].href.startsWith("http") ? "_blank" : undefined}
                  rel={PODCASTS[active].href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-2 inline-block font-serif text-[20px] md:text-[24px] text-foreground hover:text-accent transition-colors duration-300"
                >
                  {PODCASTS[active].episode}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Carousel card                                                              */
/* -------------------------------------------------------------------------- */

function CarouselCard({
  podcast,
  offset,
  isActive,
  index,
  onClick,
}: {
  podcast: Podcast;
  offset: number;
  isActive: boolean;
  index: number;
  onClick: () => void;
}) {
  // Visible window — cards beyond ±2 are hidden to avoid stage clutter.
  const visible = Math.abs(offset) <= 2;

  // Layout per slot — translate, depth, rotation, scale.
  const x = `${offset * 32}%`;
  const z = -Math.abs(offset) * 220;
  const rotY = offset * -28;
  const scale = 1 - Math.abs(offset) * 0.12;
  const opacity = !visible ? 0 : 1 - Math.abs(offset) * 0.35;
  const zIndex = 20 - Math.abs(offset);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Aflevering ${index + 1}: ${podcast.episode}`}
      aria-current={isActive ? "true" : undefined}
      initial={false}
      animate={{
        x,
        z,
        rotateY: rotY,
        scale,
        opacity,
      }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{
        zIndex,
        transformStyle: "preserve-3d",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[78vw] sm:w-[62vw] md:w-[56vw] lg:w-[760px] max-w-[840px] aspect-[16/9] rounded-[18px] md:rounded-[22px] overflow-hidden border border-white/[0.08] bg-card group cursor-pointer"
    >
      {/* Cover image */}
      <div className="absolute inset-0">
        {/* Placeholder gradient */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(140deg, #1a1a1a 0%, #0c0c0c 60%, #050505 100%)",
          }}
        />
        {/* Ghost numeral */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-serif text-[160px] leading-none text-foreground/[0.05]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={podcast.cover}
          alt={podcast.episode}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-[filter,transform] duration-[1.1s] ease-out ${
            isActive
              ? "brightness-95 saturate-100"
              : "grayscale brightness-[0.55]"
          }`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = "0";
          }}
        />

        {/* Dim overlay on non-active cards */}
        {!isActive && (
          <div className="absolute inset-0 bg-background/35" />
        )}
      </div>

      {/* Play button — only on active card */}
      {isActive && (
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="relative flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-full bg-accent text-background shadow-[0_20px_60px_-10px_rgba(184, 58, 58,0.55)]">
            <Play
              className="h-6 w-6 md:h-7 md:w-7 translate-x-[2px]"
              fill="currentColor"
              strokeWidth={0}
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border border-accent/40 animate-ping opacity-40"
            />
          </span>
        </motion.span>
      )}

      {/* Edge accent border on active */}
      <div
        aria-hidden
        className={`absolute inset-0 rounded-[inherit] pointer-events-none transition-colors duration-500 ${
          isActive ? "border border-accent/50" : "border border-white/[0.04]"
        }`}
      />
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Signed minimal offset between i and active given total length (wraps). */
function getOffset(i: number, active: number, total: number) {
  const raw = i - active;
  if (raw > total / 2) return raw - total;
  if (raw < -total / 2) return raw + total;
  return raw;
}
