"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowDown } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Press logos                                                                */
/* -------------------------------------------------------------------------- */

interface PressLogo {
  name: string;
  className: string;
}

const PRESS: PressLogo[] = [
  {
    name: "TikTok",
    className: "font-sans font-bold text-[17px] tracking-[-0.02em]",
  },
  {
    name: "AD",
    className: "font-serif font-bold text-[22px] tracking-tight",
  },
  {
    name: "FunX",
    className: "font-sans font-black italic text-[19px] tracking-tight",
  },
  {
    name: "NPO Radio 1",
    className: "font-sans font-bold text-[14px] tracking-[0.01em]",
  },
  {
    name: "NPO 1",
    className: "font-sans font-bold text-[15px] tracking-[0.01em]",
  },
  {
    name: "Lotgenoten Podcast",
    className: "font-serif italic text-[15px] tracking-tight",
  },
  {
    name: "WijsDom Podcast",
    className: "font-serif italic text-[15px] tracking-tight",
  },
  {
    name: "De Geld Specialist",
    className: "font-sans font-semibold text-[15px] tracking-[-0.005em]",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[95vh] flex flex-col overflow-hidden pt-28 lg:pt-28 pb-24"
    >
      {/* ====================== BACKGROUND LAYERS (smooth · clean · luxe) ====================== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* 1. Multi-orb radial gradient — three glow points for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(191,164,106,0.13), transparent 65%), radial-gradient(ellipse 55% 50% at 12% 80%, rgba(191,164,106,0.06), transparent 65%), radial-gradient(ellipse 50% 40% at 50% 115%, rgba(245,245,240,0.04), transparent 70%)",
          }}
        />

        {/* 2. Slowly breathing champagne orb — right side */}
        <motion.div
          aria-hidden
          className="absolute -right-[20%] top-[8%] w-[720px] h-[720px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(191,164,106,0.16), transparent 75%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        />

        {/* 3. Counter-orb — cool soft white, bottom-left */}
        <motion.div
          aria-hidden
          className="absolute -left-[10%] -bottom-[18%] w-[620px] h-[620px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(245,245,240,0.05), transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 17, ease: "easeInOut", repeat: Infinity }}
        />

        {/* 4. Diagonal hairline accent */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(108deg, transparent 0%, transparent 49.8%, rgba(245,245,240,0.06) 50%, transparent 50.2%, transparent 100%)",
          }}
        />

        {/* 5. Soft grid — masked to center so it never feels mechanical */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at center, black 25%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at center, black 25%, transparent 80%)",
          }}
        />

        {/* 6. Film-grain noise — premium magazine texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.96 0 0 0 0 0.93 0 0 0 0 0.85 0 0 0 0.045 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "220px 220px",
          }}
        />

        {/* 7. Corner vignette — pulls the eye to the center */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      {/* ====================== EDITORIAL META STRIP — live time only ====================== */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
        className="section-wrap mx-auto max-w-7xl w-full mb-12 md:mb-20"
      >
        <div className="flex items-center justify-end text-[10px] tracking-[0.32em] uppercase text-subtle-foreground">
          <AmsTime />
        </div>
      </motion.div>

      <div className="section-wrap mx-auto max-w-7xl w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-6 items-center w-full relative">
          {/* ============================ LEFT ============================ */}
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="flex items-center gap-4 mb-10"
            >
              <span className="h-px w-10 bg-foreground/20" />
              <span className="eyebrow">Rabi Adli — Personal Authority</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-serif text-foreground leading-[0.92] tracking-[-0.025em]">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                className="block italic text-foreground/70 mb-3"
                style={{ fontSize: "clamp(28px, 3.6vw, 56px)" }}
              >
                Ontdek
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05, delay: 0.38, ease: EASE }}
                className="block"
                style={{ fontSize: "clamp(64px, 11.5vw, 180px)" }}
              >
                Rabi Adli
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
              className="mt-10 font-serif italic text-[clamp(18px,1.7vw,22px)] text-foreground/90 max-w-xl leading-[1.4]"
            >
              De man achter geld, controle en{" "}
              <span className="text-accent">vrijheid.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
              className="mt-6 max-w-xl text-[15px] md:text-[16px] leading-[1.7] text-muted-foreground"
            >
              Van financiële kennis tot ondernemerschap. Van persoonlijke
              groei tot het bouwen van platformen die mensen anders leren
              kijken naar geld, vermogen en hun toekomst.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
              className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start"
            >
              <ShinyButton href="#over">Ontdek mijn verhaal</ShinyButton>
              <ShinyButton href="#bedrijven">Bekijk mijn wereld</ShinyButton>
            </motion.div>

            {/* Press strip — "Bekend van" */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
              className="mt-20 md:mt-24"
            >
              <span className="eyebrow-muted block mb-6">Bekend van:</span>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-5 text-foreground/80">
                {PRESS.map((p) => (
                  <span
                    key={p.name}
                    className={`${p.className} transition-colors duration-300 hover:text-foreground`}
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ============================ RIGHT — portrait ============================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none lg:-mr-12 xl:-mr-20">
              {/* Soft champagne glow */}
              <div
                aria-hidden
                className="absolute -inset-12 -z-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, rgba(191,164,106,0.18), transparent 70%)",
                  filter: "blur(60px)",
                }}
              />

              {/* Secondary offset dark shape behind portrait — editorial depth */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 translate-x-5 translate-y-5 pointer-events-none border border-white/[0.05] rounded-[22px]"
              />

              {/* Portrait frame — clean rounded rectangle */}
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/[0.08] bg-card rounded-[22px]">
                {/* Placeholder gradient + ghost monogram */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(155deg, #181818 0%, #0a0a0a 60%, #050505 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <span className="font-serif text-[220px] leading-none text-foreground/[0.05]">
                    RA
                  </span>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/rabi-portrait.jpg"
                  alt="Rabi Adli"
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.82] contrast-[1.05]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />

                {/* Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 50% 30%, transparent 50%, rgba(0,0,0,0.55) 100%)",
                  }}
                />

                {/* Subtle signature watermark */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logosignature.png"
                  alt=""
                  aria-hidden
                  className="absolute bottom-6 right-6 w-24 opacity-[0.16] pointer-events-none select-none"
                  draggable={false}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: EASE }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-3 text-subtle-foreground text-[10px] tracking-[0.32em] uppercase"
      >
        <ArrowDown className="h-3.5 w-3.5 animate-pulse" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  AmsTime — live Amsterdam time HH:MM:SS, hydration-safe                     */
/* -------------------------------------------------------------------------- */

function AmsTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("nl-NL", {
      timeZone: "Europe/Amsterdam",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning className="tabular-nums">
      {time ?? "--:--:--"} AMS
    </span>
  );
}

