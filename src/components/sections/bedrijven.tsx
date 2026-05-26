"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Bedrijven — Rabi Adli ecosystem hub                                        */
/*                                                                            */
/*  Premium dark visual showing Rabi Adli centrally with his 4 brands as       */
/*  satellite nodes connected by elegant champagne lines. Below the visual:   */
/*  a 4-card grid that explains what each brand stands for.                  */
/* -------------------------------------------------------------------------- */

interface Bedrijf {
  id: string;
  name: string;
  label: string;
  body: string;
  href: string;
  cta: string;
}

const BEDRIJVEN: Bedrijf[] = [
  {
    id: "vosgoldberg",
    name: "Vos & Goldberg",
    label: "Accountancy",
    body:
      "Vos & Goldberg richt zich op accountancy, administratie en financiële structuur. Het bedrijf helpt ondernemers grip krijgen op hun cijfers, verplichtingen en financiële basis.",
    href: "https://www.vosgoldberg.nl/",
    cta: "Meer over Vos & Goldberg",
  },
  {
    id: "compound-quadrant",
    name: "Compound Quadrant",
    label: "Business coaching",
    body:
      "Compound Quadrant helpt ondernemers met strategie, groei en het bouwen van een sterker bedrijf. De focus ligt op ondernemerschap, structuur en betere zakelijke keuzes.",
    href: "https://compoundquadrant.nl/",
    cta: "Ontdek Compound Quadrant",
  },
  {
    id: "geldinstituut",
    name: "Geldinstituut",
    label: "Educatie",
    body:
      "Geldinstituut is gebouwd rondom financiële educatie. Het helpt ondernemers en particulieren beter begrijpen hoe geld, belasting, vermogen en financiële controle werken.",
    href: "https://geldinstituut.nl/",
    cta: "Bekijk Geldinstituut",
  },
  {
    id: "moneyfesto",
    name: "Moneyfesto",
    label: "Business community",
    body:
      "Moneyfesto is een business community voor mensen die anders willen leren kijken naar geld, groei, vrijheid en het systeem. Een omgeving voor visie, netwerk en ontwikkeling.",
    href: "https://moneyfesto.nl/",
    cta: "Ontdek Moneyfesto",
  },
];

/* Node positions in the visual's coordinate space (viewBox 1200 × 620).
 * Each node sits at one of the four corners around the centred portrait. */
const POSITIONS: Record<string, { x: number; y: number }> = {
  vosgoldberg: { x: 230, y: 170 }, // top-left
  "compound-quadrant": { x: 970, y: 170 }, // top-right
  geldinstituut: { x: 230, y: 450 }, // bottom-left
  moneyfesto: { x: 970, y: 450 }, // bottom-right
};

const CENTER = { x: 600, y: 310 };

const CHAMPAGNE = "#BFA46A";
const CHAMPAGNE_SOFT = "rgba(191,164,106,0.45)";

const NOISE_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.96 0 0 0 0 0.94 0 0 0 0 0.88 0 0 0 0.04 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function Bedrijven() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="bedrijven"
      className="relative py-28 md:py-40 border-t border-border overflow-hidden"
    >
      <div className="section-wrap mx-auto max-w-7xl">
        {/* ----- Header ----- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="h-px w-10 bg-foreground/20" />
                <span
                  className="text-[11px] tracking-[0.32em] uppercase font-medium"
                  style={{ color: CHAMPAGNE }}
                >
                  Het ecosysteem — 05
                </span>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="display-lg">
                De bedrijven rondom{" "}
                <span className="display-italic">Rabi Adli.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={300} className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted-foreground text-base leading-relaxed">
              Vier bedrijven. Eén visie. Een ecosysteem gebouwd rondom geld,
              ondernemerschap, educatie en groei.
            </p>
          </Reveal>
        </div>

        {/* ----- Ecosystem visual ----- */}
        <Reveal delay={120}>
          <EcosystemVisual
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        </Reveal>

        {/* ----- Explanation cards ----- */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <h3 className="font-serif text-foreground text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.01em] mb-12 md:mb-16">
              Waar elk bedrijf voor staat.
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {BEDRIJVEN.map((b, i) => (
              <Reveal key={b.id} delay={Math.min(i * 90, 360)}>
                <BedrijfCard bedrijf={b} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ecosystem visual — desktop hub-and-spoke; mobile vertical stack            */
/* -------------------------------------------------------------------------- */

function EcosystemVisual({
  hoveredId,
  setHoveredId,
}: {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  return (
    <>
      {/* ===== Desktop / tablet hub-and-spoke ===== */}
      <div className="hidden md:block">
        <div
          className="relative w-full max-w-[1200px] mx-auto rounded-[32px] border border-white/[0.08] overflow-hidden"
          style={{
            minHeight: 620,
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(191,164,106,0.07), transparent 65%), #050505",
          }}
        >
          {/* Concentric guide circles */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 620"
            preserveAspectRatio="none"
            aria-hidden
          >
            {[200, 320, 440].map((r) => (
              <circle
                key={r}
                cx={CENTER.x}
                cy={CENTER.y}
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.035)"
                strokeWidth={1}
              />
            ))}
          </svg>

          {/* Subtle noise overlay */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.18]"
            style={{
              backgroundImage: NOISE_URL,
              backgroundSize: "180px 180px",
            }}
          />

          {/* Connection lines — draw in once on scroll into view */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 620"
            preserveAspectRatio="none"
            aria-hidden
          >
            {BEDRIJVEN.map((b, i) => {
              const pos = POSITIONS[b.id];
              const isActive = hoveredId === b.id;
              return (
                <motion.path
                  key={b.id}
                  d={`M ${pos.x} ${pos.y} L ${CENTER.x} ${CENTER.y}`}
                  fill="none"
                  stroke={isActive ? CHAMPAGNE : CHAMPAGNE_SOFT}
                  strokeWidth={isActive ? 1.6 : 1}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.95,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.35 + i * 0.08,
                    opacity: { duration: 0.3, delay: 0.35 + i * 0.08 },
                  }}
                  style={{
                    transition: "stroke 350ms ease, stroke-width 350ms ease",
                  }}
                />
              );
            })}
          </svg>

          {/* Centre portrait */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative w-[190px] h-[190px] rounded-full overflow-hidden border bg-[#111111] transition-all duration-500"
              )}
              style={{
                borderColor: hoveredId
                  ? "rgba(191,164,106,0.55)"
                  : "rgba(191,164,106,0.35)",
                boxShadow: hoveredId
                  ? "0 30px 80px -20px rgba(0,0,0,0.85), 0 0 0 6px rgba(191,164,106,0.08)"
                  : "0 30px 80px -20px rgba(0,0,0,0.85)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/rabi-center.jpg"
                alt="Rabi Adli"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.95]"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = "1";
                    img.src = "/images/rabi-portrait.jpg";
                  }
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-center"
            >
              <div className="font-serif text-foreground text-[22px] leading-none">
                Rabi Adli
              </div>
              <div
                className="mt-2 text-[10px] tracking-[0.32em] uppercase"
                style={{ color: "#A8A8A8" }}
              >
                Founder · Ecosystem
              </div>
            </motion.div>
          </div>

          {/* Brand nodes */}
          {BEDRIJVEN.map((b, i) => {
            const pos = POSITIONS[b.id];
            const isActive = hoveredId === b.id;
            return (
              <motion.a
                key={b.id}
                href={`#card-${b.id}`}
                onMouseEnter={() => setHoveredId(b.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(b.id)}
                onBlur={() => setHoveredId(null)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.55,
                  delay: 0.55 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "absolute z-30 min-w-[230px] rounded-[18px] backdrop-blur-md px-6 py-5 border transition-all duration-500",
                  "hover:-translate-y-[2px] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]"
                )}
                style={{
                  left: `${(pos.x / 1200) * 100}%`,
                  top: `${(pos.y / 620) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  borderColor: isActive
                    ? "rgba(191,164,106,0.55)"
                    : "rgba(255,255,255,0.10)",
                  backgroundColor: isActive
                    ? "rgba(17,17,17,0.95)"
                    : "rgba(17,17,17,0.82)",
                }}
              >
                <div className="font-serif text-foreground text-[20px] leading-tight">
                  {b.name}
                </div>
                <div
                  className="mt-1.5 text-[10px] tracking-[0.32em] uppercase font-medium"
                  style={{ color: CHAMPAGNE }}
                >
                  {b.label}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* ===== Mobile vertical hub ===== */}
      <div className="md:hidden">
        <div
          className="relative w-full rounded-[24px] border border-white/[0.08] overflow-hidden px-6 py-12"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 22%, rgba(191,164,106,0.08), transparent 65%), #050505",
          }}
        >
          {/* Centre photo */}
          <div className="flex flex-col items-center">
            <div
              className="relative w-[140px] h-[140px] rounded-full overflow-hidden border bg-[#111111] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)]"
              style={{ borderColor: "rgba(191,164,106,0.35)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/rabi-center.jpg"
                alt="Rabi Adli"
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.95]"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = "1";
                    img.src = "/images/rabi-portrait.jpg";
                  }
                }}
              />
            </div>
            <div className="mt-5 text-center">
              <div className="font-serif text-foreground text-[20px] leading-none">
                Rabi Adli
              </div>
              <div
                className="mt-2 text-[10px] tracking-[0.32em] uppercase"
                style={{ color: "#A8A8A8" }}
              >
                Founder · Ecosystem
              </div>
            </div>
          </div>

          {/* Connector line */}
          <div
            aria-hidden
            className="mx-auto mt-8 mb-2 w-px h-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(191,164,106,0.35), transparent)",
            }}
          />

          {/* Stacked nodes */}
          <div className="space-y-3">
            {BEDRIJVEN.map((b) => (
              <a
                key={b.id}
                href={`#card-${b.id}`}
                className="block rounded-[16px] border border-white/[0.10] bg-[rgba(17,17,17,0.82)] px-5 py-4 transition-colors duration-300"
                style={{ borderColor: "rgba(255,255,255,0.10)" }}
              >
                <div className="font-serif text-foreground text-[18px] leading-tight">
                  {b.name}
                </div>
                <div
                  className="mt-1.5 text-[10px] tracking-[0.32em] uppercase font-medium"
                  style={{ color: CHAMPAGNE }}
                >
                  {b.label}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Explanation card                                                           */
/* -------------------------------------------------------------------------- */

function BedrijfCard({ bedrijf }: { bedrijf: Bedrijf }) {
  return (
    <a
      id={`card-${bedrijf.id}`}
      href={bedrijf.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col rounded-[20px] border border-white/[0.08] bg-[#0d0d0d] p-7 md:p-8 transition-all duration-500 hover:bg-[#111111] hover:-translate-y-1"
      style={{ scrollMarginTop: "100px" }}
    >
      <div
        className="text-[10px] tracking-[0.32em] uppercase font-medium"
        style={{ color: CHAMPAGNE }}
      >
        {bedrijf.label}
      </div>

      <h4 className="mt-5 font-serif text-foreground text-[22px] md:text-[24px] leading-tight tracking-[-0.005em]">
        {bedrijf.name}
      </h4>

      <p className="mt-5 text-[14px] leading-[1.65] text-muted-foreground">
        {bedrijf.body}
      </p>

      <div className="mt-auto pt-7 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <span
          className="text-[12px] tracking-[0.005em] text-foreground/80 group-hover:text-[#BFA46A] transition-colors duration-300"
        >
          {bedrijf.cta}
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-foreground/70 group-hover:text-[#BFA46A] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500" />
      </div>

      {/* Hover-only champagne border highlight */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: "0 0 0 1px rgba(191,164,106,0.45)",
        }}
      />
    </a>
  );
}
