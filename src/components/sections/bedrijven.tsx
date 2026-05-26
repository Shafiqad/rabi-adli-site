"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Bedrijven — Rabi Adli ecosystem hub                                        */
/*                                                                            */
/*  Lines are computed in raw CSS pixels using each card's real DOM position   */
/*  (via getBoundingClientRect) so the endpoints always land exactly on the    */
/*  card edge regardless of viewport size or expansion state.                  */
/*                                                                            */
/*  Clicking a card expands it in-place (no modal) to reveal body + CTA.       */
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
    cta: "Bekijk Vos & Goldberg",
  },
  {
    id: "compound-quadrant",
    name: "Compound Quadrant",
    label: "Business coaching",
    body:
      "Compound Quadrant helpt ondernemers met strategie, groei en het bouwen van een sterker bedrijf. De focus ligt op ondernemerschap, structuur en betere zakelijke keuzes.",
    href: "https://compoundquadrant.nl/",
    cta: "Bekijk Compound Quadrant",
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
    cta: "Bekijk Moneyfesto",
  },
];

/* -------------------------------------------------------------------------- */
/*  Card placement                                                              */
/* -------------------------------------------------------------------------- */

/* Position of each card's centre as a percentage of the container.
 * The visual is built on a 1200×620 aspect grid; these percentages put each
 * card in one of the four corners around the central portrait. */
const CARD_POSITION_PCT: Record<string, { x: number; y: number }> = {
  vosgoldberg: { x: 230 / 1200, y: 170 / 620 }, // top-left
  "compound-quadrant": { x: 970 / 1200, y: 170 / 620 }, // top-right
  geldinstituut: { x: 230 / 1200, y: 450 / 620 }, // bottom-left
  moneyfesto: { x: 970 / 1200, y: 450 / 620 }, // bottom-right
};

const PHOTO_RADIUS_PX = 95; // Half the portrait's diameter (190px)
const CARD_W_COLLAPSED = 240;
const CARD_W_EXPANDED = 360;

const ACCENT = "#B83A3A";
const ACCENT_LINE_SOFT = "rgba(184,58,58,0.42)";

const NOISE_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.96 0 0 0 0 0.94 0 0 0 0 0.88 0 0 0 0.04 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function Bedrijven() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
                <span className="text-[11px] tracking-[0.32em] uppercase text-accent font-medium">
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
            expandedId={expandedId}
            setExpandedId={setExpandedId}
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 text-center text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
            Klik een bedrijf voor meer info
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ecosystem visual                                                           */
/* -------------------------------------------------------------------------- */

interface CardRect {
  cx: number;
  cy: number;
  w: number;
  h: number;
}

function EcosystemVisual({
  hoveredId,
  setHoveredId,
  expandedId,
  setExpandedId,
}: {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [cardRects, setCardRects] = useState<Record<string, CardRect>>({});

  /* Measure container + each card in raw CSS pixels (relative to container).
   * Re-runs on resize and whenever a card's size changes (open / close). */
  useEffect(() => {
    const measure = () => {
      const cont = containerRef.current;
      if (!cont) return;
      const cRect = cont.getBoundingClientRect();
      setContainerSize({ w: cRect.width, h: cRect.height });

      setCardRects((prev) => {
        let changed = false;
        const next: Record<string, CardRect> = { ...prev };
        BEDRIJVEN.forEach((b) => {
          const el = cardRefs.current[b.id];
          if (!el) return;
          const r = el.getBoundingClientRect();
          const fresh: CardRect = {
            cx: r.left + r.width / 2 - cRect.left,
            cy: r.top + r.height / 2 - cRect.top,
            w: r.width,
            h: r.height,
          };
          const cur = prev[b.id];
          if (
            !cur ||
            Math.abs(cur.cx - fresh.cx) > 0.5 ||
            Math.abs(cur.cy - fresh.cy) > 0.5 ||
            Math.abs(cur.w - fresh.w) > 0.5 ||
            Math.abs(cur.h - fresh.h) > 0.5
          ) {
            next[b.id] = fresh;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    BEDRIJVEN.forEach((b) => {
      const el = cardRefs.current[b.id];
      if (el) ro.observe(el);
    });

    return () => ro.disconnect();
  }, []);

  /* Photo lives at the geometric centre of the container. */
  const photoCx = containerSize.w / 2;
  const photoCy = containerSize.h / 2;

  return (
    <>
      {/* ===== Desktop / tablet ===== */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          className="relative w-full max-w-[1200px] mx-auto rounded-[32px] border border-white/[0.08] overflow-hidden"
          style={{
            aspectRatio: `1200 / 620`,
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(184,58,58,0.06), transparent 65%), #050505",
          }}
        >
          {/* Concentric guide circles (pixel-space) */}
          {containerSize.w > 0 && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              width={containerSize.w}
              height={containerSize.h}
              aria-hidden
            >
              {[200, 320, 440].map((r) => (
                <circle
                  key={r}
                  cx={photoCx}
                  cy={photoCy}
                  r={r * (containerSize.w / 1200)}
                  fill="none"
                  stroke="rgba(255,255,255,0.030)"
                  strokeWidth={1}
                />
              ))}
            </svg>
          )}

          {/* Noise overlay */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.18]"
            style={{
              backgroundImage: NOISE_URL,
              backgroundSize: "180px 180px",
            }}
          />

          {/* Connection lines — pixel-space, computed from live card rects */}
          {containerSize.w > 0 && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              width={containerSize.w}
              height={containerSize.h}
              aria-hidden
            >
              {BEDRIJVEN.map((b, i) => {
                const card = cardRects[b.id];
                if (!card) return null;
                const dx = card.cx - photoCx;
                const dy = card.cy - photoCy;
                const len = Math.hypot(dx, dy) || 1;
                const ux = dx / len;
                const uy = dy / len;

                const startX = photoCx + ux * (PHOTO_RADIUS_PX + 2);
                const startY = photoCy + uy * (PHOTO_RADIUS_PX + 2);

                const halfW = card.w / 2;
                const halfH = card.h / 2;
                const tx = halfW / Math.max(Math.abs(ux), 0.001);
                const ty = halfH / Math.max(Math.abs(uy), 0.001);
                const reach = Math.min(tx, ty);

                const endX = card.cx - ux * reach;
                const endY = card.cy - uy * reach;

                const isActive =
                  hoveredId === b.id || expandedId === b.id;
                return (
                  <motion.path
                    key={b.id}
                    d={`M ${startX} ${startY} L ${endX} ${endY}`}
                    fill="none"
                    stroke={isActive ? ACCENT : ACCENT_LINE_SOFT}
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
                      transition:
                        "stroke 350ms ease, stroke-width 350ms ease",
                    }}
                  />
                );
              })}
            </svg>
          )}

          {/* Centre portrait */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[190px] h-[190px] rounded-full overflow-hidden border bg-[#111111] transition-all duration-500"
              style={{
                borderColor:
                  hoveredId || expandedId
                    ? "rgba(184,58,58,0.60)"
                    : "rgba(184,58,58,0.38)",
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.85), 0 0 0 6px rgba(184,58,58,0.06)",
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
              <div className="mt-2 text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
                Founder · Ecosystem
              </div>
            </motion.div>
          </div>

          {/* Brand cards — click expands in place */}
          {BEDRIJVEN.map((b, i) => {
            const pos = CARD_POSITION_PCT[b.id];
            const isActive = hoveredId === b.id || expandedId === b.id;
            const isExpanded = expandedId === b.id;
            return (
              <motion.div
                key={b.id}
                ref={(node) => {
                  cardRefs.current[b.id] = node;
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.55,
                  delay: 0.55 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "absolute rounded-[18px] backdrop-blur-md border overflow-hidden",
                  "transition-[width,border-color,background-color,box-shadow] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                )}
                style={{
                  width: isExpanded ? CARD_W_EXPANDED : CARD_W_COLLAPSED,
                  left: `${pos.x * 100}%`,
                  top: `${pos.y * 100}%`,
                  transform: "translate(-50%, -50%)",
                  borderColor: isActive
                    ? "rgba(184,58,58,0.55)"
                    : "rgba(255,255,255,0.10)",
                  backgroundColor: isExpanded
                    ? "rgba(13,13,13,0.97)"
                    : isActive
                    ? "rgba(17,17,17,0.95)"
                    : "rgba(17,17,17,0.82)",
                  boxShadow: isExpanded
                    ? "0 40px 100px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(184,58,58,0.18)"
                    : isActive
                    ? "0 30px 80px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(184,58,58,0.18)"
                    : "none",
                  zIndex: isExpanded ? 50 : 30,
                }}
                onMouseEnter={() => setHoveredId(b.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : b.id)}
                  className="block w-full text-left px-6 py-5 cursor-pointer outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-0"
                  aria-expanded={isExpanded}
                  aria-controls={`bedrijf-panel-${b.id}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-serif text-foreground text-[20px] leading-tight">
                        {b.name}
                      </div>
                      <div className="mt-1.5 text-[10px] tracking-[0.32em] uppercase font-medium text-accent">
                        {b.label}
                      </div>
                    </div>
                    {isExpanded && (
                      <span
                        aria-hidden
                        className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.10] text-foreground/70"
                      >
                        <X className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </button>

                {/* Expandable body + CTA */}
                <div
                  id={`bedrijf-panel-${b.id}`}
                  aria-hidden={!isExpanded}
                  className="overflow-hidden transition-[max-height,opacity] duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    maxHeight: isExpanded ? 600 : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-[14px] leading-[1.65] text-muted-foreground">
                      {b.body}
                    </p>
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="group mt-6 inline-flex items-center gap-2 text-[12.5px] tracking-[0.005em] text-foreground/90 hover:text-accent transition-colors duration-300"
                    >
                      {b.cta}
                      <ArrowUpRight className="h-3.5 w-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-500" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== Mobile — vertical stack with same expand-in-place behavior ===== */}
      <div className="md:hidden">
        <div
          className="relative w-full rounded-[24px] border border-white/[0.08] overflow-hidden px-6 py-12"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 22%, rgba(184,58,58,0.08), transparent 65%), #050505",
          }}
        >
          {/* Centre photo */}
          <div className="flex flex-col items-center">
            <div
              className="relative w-[140px] h-[140px] rounded-full overflow-hidden border bg-[#111111] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)]"
              style={{ borderColor: "rgba(184,58,58,0.38)" }}
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
              <div className="mt-2 text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
                Founder · Ecosystem
              </div>
            </div>
          </div>

          {/* Connector */}
          <div
            aria-hidden
            className="mx-auto mt-8 mb-2 w-px h-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(184,58,58,0.40), transparent)",
            }}
          />

          {/* Tap-to-expand cards */}
          <div className="space-y-3">
            {BEDRIJVEN.map((b) => {
              const isExpanded = expandedId === b.id;
              return (
                <div
                  key={b.id}
                  className="rounded-[16px] border overflow-hidden transition-[border-color,background-color] duration-300"
                  style={{
                    borderColor: isExpanded
                      ? "rgba(184,58,58,0.55)"
                      : "rgba(255,255,255,0.10)",
                    backgroundColor: isExpanded
                      ? "rgba(13,13,13,0.97)"
                      : "rgba(17,17,17,0.82)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : b.id)
                    }
                    aria-expanded={isExpanded}
                    className="block w-full text-left px-5 py-4 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-serif text-foreground text-[18px] leading-tight">
                          {b.name}
                        </div>
                        <div className="mt-1.5 text-[10px] tracking-[0.32em] uppercase font-medium text-accent">
                          {b.label}
                        </div>
                      </div>
                      {isExpanded && (
                        <span
                          aria-hidden
                          className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.10] text-foreground/70"
                        >
                          <X className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </button>
                  <div
                    aria-hidden={!isExpanded}
                    className="overflow-hidden transition-[max-height,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      maxHeight: isExpanded ? 600 : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-5 pt-1">
                      <p className="text-[14px] leading-[1.65] text-muted-foreground">
                        {b.body}
                      </p>
                      <a
                        href={b.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group mt-5 inline-flex items-center gap-2 text-[12.5px] tracking-[0.005em] text-foreground/90 hover:text-accent transition-colors duration-300"
                      >
                        {b.cta}
                        <ArrowUpRight className="h-3.5 w-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-500" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
