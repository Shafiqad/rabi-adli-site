"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Bedrijven — Rabi Adli ecosystem hub                                        */
/*                                                                            */
/*  Dark visual showing Rabi Adli centrally with his 4 brands as satellite     */
/*  nodes connected by elegant oxblood lines. Lines stop cleanly at each       */
/*  card's edge. Clicking a card opens a modal with the full explanation.      */
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

/* -------------------------------------------------------------------------- */
/*  Layout constants — everything is authored in the SVG viewBox space        */
/*  (1200 × 620). The container uses the same aspect ratio so positions       */
/*  match exactly across the SVG and the DOM-positioned cards.                */
/* -------------------------------------------------------------------------- */

const VB_W = 1200;
const VB_H = 620;
const CENTER = { x: VB_W / 2, y: VB_H / 2 };

/* Card + portrait dimensions in *CSS pixels*. These get re-scaled into
 * viewBox units at render time based on the live container width, so the
 * lines always stop exactly at the card edge no matter how the container
 * is sized by Tailwind responsive constraints. */
const PHOTO_RADIUS_PX = 95; // half of the 190px portrait
const CARD_W_PX = 240;
const CARD_H_PX = 86;

const POSITIONS: Record<string, { x: number; y: number }> = {
  vosgoldberg: { x: 230, y: 170 }, // top-left
  "compound-quadrant": { x: 970, y: 170 }, // top-right
  geldinstituut: { x: 230, y: 450 }, // bottom-left
  moneyfesto: { x: 970, y: 450 }, // bottom-right
};

const ACCENT = "#B83A3A";
const ACCENT_LINE_SOFT = "rgba(184,58,58,0.42)";

const NOISE_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.96 0 0 0 0 0.94 0 0 0 0 0.88 0 0 0 0.04 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

/* Compute clean line endpoints in viewBox space.
 *
 * `scale` = VB_W / actualContainerWidthPx. Multiplying CSS-pixel dimensions
 * by this scale gives the same dimension expressed in viewBox units, so
 * the line endpoints land exactly on the card's visible border regardless
 * of how the container is sized.
 */
function lineEndpoints(
  nodeX: number,
  nodeY: number,
  scale: number
) {
  const dx = nodeX - CENTER.x;
  const dy = nodeY - CENTER.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;

  const photoR = (PHOTO_RADIUS_PX + 2) * scale;
  const halfW = (CARD_W_PX / 2) * scale;
  const halfH = (CARD_H_PX / 2) * scale;

  const startX = CENTER.x + ux * photoR;
  const startY = CENTER.y + uy * photoR;

  // Distance from card centre to the nearest card edge in the direction of
  // the centre photo = min(halfW / |ux|, halfH / |uy|).
  const tx = halfW / Math.max(Math.abs(ux), 0.001);
  const ty = halfH / Math.max(Math.abs(uy), 0.001);
  const cardReach = Math.min(tx, ty);

  const endX = nodeX - ux * cardReach;
  const endY = nodeY - uy * cardReach;

  return { startX, startY, endX, endY };
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function Bedrijven() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? BEDRIJVEN.find((b) => b.id === openId) ?? null : null;

  /* Close modal on Escape. */
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  /* Lock body scroll while modal is open. */
  useEffect(() => {
    if (!openId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openId]);

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
            onOpen={setOpenId}
          />
        </Reveal>

        {/* Tiny helper line under the visual */}
        <Reveal delay={80}>
          <div className="mt-10 text-center text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
            Klik een bedrijf voor meer info
          </div>
        </Reveal>
      </div>

      {/* ----- Modal — opens on card click ----- */}
      <AnimatePresence>
        {open && (
          <BedrijfModal bedrijf={open} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ecosystem visual                                                           */
/* -------------------------------------------------------------------------- */

function EcosystemVisual({
  hoveredId,
  setHoveredId,
  onOpen,
}: {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  onOpen: (id: string) => void;
}) {
  /* Measure the live container width so we can express the fixed-pixel card
   * + portrait sizes in viewBox units. This keeps the line endpoints
   * pinned to the card edge across any screen size. */
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      if (w > 0) setScale(VB_W / w);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* ===== Desktop / tablet ===== */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          className="relative w-full max-w-[1200px] mx-auto rounded-[32px] border border-white/[0.08] overflow-hidden"
          style={{
            aspectRatio: `${VB_W} / ${VB_H}`,
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(184,58,58,0.06), transparent 65%), #050505",
          }}
        >
          {/* Concentric guide circles */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
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
                stroke="rgba(255,255,255,0.030)"
                strokeWidth={1}
              />
            ))}
          </svg>

          {/* Subtle noise */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.18]"
            style={{
              backgroundImage: NOISE_URL,
              backgroundSize: "180px 180px",
            }}
          />

          {/* Connection lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            {BEDRIJVEN.map((b, i) => {
              const pos = POSITIONS[b.id];
              const ep = lineEndpoints(pos.x, pos.y, scale);
              const isActive = hoveredId === b.id;
              return (
                <motion.path
                  key={b.id}
                  d={`M ${ep.startX} ${ep.startY} L ${ep.endX} ${ep.endY}`}
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
              className="relative w-[190px] h-[190px] rounded-full overflow-hidden border bg-[#111111] transition-all duration-500"
              style={{
                borderColor: hoveredId
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

          {/* Brand nodes — click opens modal */}
          {BEDRIJVEN.map((b, i) => {
            const pos = POSITIONS[b.id];
            const isActive = hoveredId === b.id;
            return (
              <motion.button
                key={b.id}
                type="button"
                onMouseEnter={() => setHoveredId(b.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(b.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => onOpen(b.id)}
                aria-label={`Open ${b.name} details`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.55,
                  delay: 0.55 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "absolute z-30 text-left rounded-[18px] backdrop-blur-md px-6 py-5 border transition-all duration-500 cursor-pointer",
                  "hover:-translate-y-[2px]"
                )}
                style={{
                  width: CARD_W_PX, // exact match with line-stop calculation
                  left: `${(pos.x / VB_W) * 100}%`,
                  top: `${(pos.y / VB_H) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  borderColor: isActive
                    ? "rgba(184,58,58,0.55)"
                    : "rgba(255,255,255,0.10)",
                  backgroundColor: isActive
                    ? "rgba(17,17,17,0.95)"
                    : "rgba(17,17,17,0.82)",
                  boxShadow: isActive
                    ? "0 30px 80px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(184,58,58,0.18)"
                    : "none",
                }}
              >
                <div className="font-serif text-foreground text-[20px] leading-tight">
                  {b.name}
                </div>
                <div className="mt-1.5 text-[10px] tracking-[0.32em] uppercase font-medium text-accent">
                  {b.label}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ===== Mobile — vertical stack ===== */}
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

          {/* Tap-to-open node buttons */}
          <div className="space-y-3">
            {BEDRIJVEN.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => onOpen(b.id)}
                aria-label={`Open ${b.name} details`}
                className="block w-full text-left rounded-[16px] border border-white/[0.10] bg-[rgba(17,17,17,0.82)] px-5 py-4 transition-all duration-300 active:bg-[rgba(17,17,17,0.95)] active:border-[rgba(184,58,58,0.55)]"
              >
                <div className="font-serif text-foreground text-[18px] leading-tight">
                  {b.name}
                </div>
                <div className="mt-1.5 text-[10px] tracking-[0.32em] uppercase font-medium text-accent">
                  {b.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Modal — opens when a brand is clicked                                      */
/* -------------------------------------------------------------------------- */

function BedrijfModal({
  bedrijf,
  onClose,
}: {
  bedrijf: Bedrijf;
  onClose: () => void;
}) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bedrijf-modal-title"
      className="fixed inset-0 z-[200] flex items-center justify-center px-5 py-10"
    >
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Sluiten"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-background/72"
        style={{
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[520px] rounded-[24px] border border-white/[0.10] bg-[#0d0d0d] px-7 py-9 md:px-9 md:py-11 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
        style={{
          boxShadow:
            "0 40px 100px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(184,58,58,0.10)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Sluit"
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] text-foreground/70 hover:text-foreground hover:border-white/[0.20] transition-colors duration-300"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Eyebrow */}
        <div className="text-[10px] tracking-[0.32em] uppercase font-medium text-accent">
          {bedrijf.label}
        </div>

        {/* Title */}
        <h3
          id="bedrijf-modal-title"
          className="mt-4 font-serif text-foreground text-[28px] md:text-[34px] leading-[1.1] tracking-[-0.005em]"
        >
          {bedrijf.name}
        </h3>

        {/* Body */}
        <p className="mt-6 text-[15px] md:text-[16px] leading-[1.7] text-muted-foreground">
          {bedrijf.body}
        </p>

        {/* CTA */}
        <div className="mt-8 pt-7 border-t border-white/[0.06]">
          <a
            href={bedrijf.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[13px] tracking-[0.005em] text-foreground/90 hover:text-accent transition-colors duration-300"
          >
            {bedrijf.cta}
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-500" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
