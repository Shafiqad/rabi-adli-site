"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal } from "@/components/reveal";

/* -------------------------------------------------------------------------- */
/*  Bedrijven — Rabi Adli ecosystem hub                                        */
/*                                                                            */
/*  Stable hub-and-spoke map. Cards are plain divs at fixed positions; click   */
/*  expands the card in-place to reveal body + CTA. A per-card ResizeObserver  */
/*  feeds the live width/height back to the line calculator so the connector   */
/*  lines stay perfectly anchored to the dot as the card grows.               */
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
    cta: "Ontdek Moneyfesto",
  },
];

interface NodeSpec {
  id: string;
  xPct: number;
  yPct: number;
  /** Side of the card the connector dot lives on (closer to the hub). */
  side: "right" | "left";
}

const NODES: NodeSpec[] = [
  { id: "vosgoldberg", xPct: 18, yPct: 24, side: "right" },
  { id: "compound-quadrant", xPct: 82, yPct: 24, side: "left" },
  { id: "geldinstituut", xPct: 18, yPct: 70, side: "right" },
  { id: "moneyfesto", xPct: 82, yPct: 70, side: "left" },
];

const HUB_X_PCT = 50;
const HUB_Y_PCT = 45;
const HUB_DIAMETER = 210;
const HUB_RADIUS = HUB_DIAMETER / 2;

const CARD_W_COLLAPSED = 300;
const CARD_W_EXPANDED = 360;
const DOT_SIZE = 10;
const DOT_GAP = 8;

const LINE_SOFT = "rgba(190,55,55,0.45)";
const LINE_ACTIVE = "rgba(220,70,70,0.85)";
const ACTIVE_BORDER = "rgba(220,70,70,0.65)";

const NOISE_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.96 0 0 0 0 0.94 0 0 0 0 0.88 0 0 0 0.04 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function Bedrijven() {
  const [activeId, setActiveId] = useState<string | null>(null);

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

        {/* ----- Desktop map ----- */}
        <div className="hidden md:block">
          <DesktopMap activeId={activeId} setActiveId={setActiveId} />
        </div>

        {/* ----- Mobile stack ----- */}
        <div className="md:hidden">
          <MobileStack activeId={activeId} setActiveId={setActiveId} />
        </div>

        <div className="hidden md:block mt-10 text-center text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
          Klik een bedrijf om de uitleg te openen
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Desktop map                                                                */
/* -------------------------------------------------------------------------- */

interface CardSize {
  w: number;
  h: number;
}

function DesktopMap({
  activeId,
  setActiveId,
}: {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [cardSizes, setCardSizes] = useState<Record<string, CardSize>>({});

  // Track container size.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Track each card's live size so lines follow the expansion smoothly.
  useEffect(() => {
    const observers: ResizeObserver[] = [];
    BEDRIJVEN.forEach((b) => {
      const el = cardRefs.current[b.id];
      if (!el) return;
      const ro = new ResizeObserver(() => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        setCardSizes((prev) => {
          const cur = prev[b.id];
          if (cur && Math.abs(cur.w - w) < 0.5 && Math.abs(cur.h - h) < 0.5) {
            return prev;
          }
          return { ...prev, [b.id]: { w, h } };
        });
      });
      ro.observe(el);
      observers.push(ro);
    });
    return () => observers.forEach((r) => r.disconnect());
  }, []);

  const hubCx = (size.w * HUB_X_PCT) / 100;
  const hubCy = (size.h * HUB_Y_PCT) / 100;
  const circleScale = Math.min(size.w / 1280, size.h / 720) || 1;

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto rounded-[32px] border border-white/[0.08] overflow-hidden"
      style={{
        maxWidth: 1280,
        minHeight: 720,
        background:
          "radial-gradient(60% 60% at 50% 45%, rgba(184,58,58,0.06), transparent 65%), #050505",
      }}
    >
      {/* Concentric guide circles */}
      {size.w > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={size.w}
          height={size.h}
          aria-hidden
        >
          {[180, 290, 400].map((r) => (
            <circle
              key={r}
              cx={hubCx}
              cy={hubCy}
              r={r * circleScale}
              fill="none"
              stroke="rgba(255,255,255,0.035)"
              strokeWidth={1}
            />
          ))}
        </svg>
      )}

      {/* Noise overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.16]"
        style={{
          backgroundImage: NOISE_URL,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Connection lines — endpoint follows measured card width */}
      {size.w > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={size.w}
          height={size.h}
          aria-hidden
          style={{ zIndex: 2 }}
        >
          {NODES.map((node) => {
            const cardCx = (size.w * node.xPct) / 100;
            const cardCy = (size.h * node.yPct) / 100;
            const measured = cardSizes[node.id];
            const cardW = measured ? measured.w : CARD_W_COLLAPSED;
            const dotCx =
              node.side === "right"
                ? cardCx + cardW / 2 + DOT_GAP
                : cardCx - cardW / 2 - DOT_GAP;
            const dotCy = cardCy;

            const dx = dotCx - hubCx;
            const dy = dotCy - hubCy;
            const len = Math.hypot(dx, dy) || 1;
            const ux = dx / len;
            const uy = dy / len;

            const startX = hubCx + ux * (HUB_RADIUS + 2);
            const startY = hubCy + uy * (HUB_RADIUS + 2);

            const isActive = activeId === node.id;
            return (
              <line
                key={node.id}
                x1={startX}
                y1={startY}
                x2={dotCx}
                y2={dotCy}
                stroke={isActive ? LINE_ACTIVE : LINE_SOFT}
                strokeWidth={isActive ? 1.3 : 1}
                strokeLinecap="round"
                style={{
                  transition:
                    "stroke 300ms ease, stroke-width 300ms ease",
                }}
              />
            );
          })}
        </svg>
      )}

      {/* Centre hub — Rabi portrait */}
      <div
        className="absolute z-[3] flex flex-col items-center pointer-events-none"
        style={{
          left: `${HUB_X_PCT}%`,
          top: `${HUB_Y_PCT}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="relative rounded-full overflow-hidden border bg-[#111111]"
          style={{
            width: HUB_DIAMETER,
            height: HUB_DIAMETER,
            borderColor: activeId ? ACTIVE_BORDER : "rgba(184,58,58,0.45)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.85), 0 0 0 6px rgba(184,58,58,0.06)",
            transition: "border-color 300ms ease",
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
        </div>
        <div className="mt-6 text-center">
          <div className="font-serif text-foreground text-[22px] leading-none">
            Rabi Adli
          </div>
          <div className="mt-2 text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
            Founder · Ecosystem
          </div>
        </div>
      </div>

      {/* Brand cards — click expands in-place */}
      {NODES.map((node) => {
        const bedrijf = BEDRIJVEN.find((b) => b.id === node.id)!;
        const isActive = activeId === node.id;
        return (
          <div
            key={node.id}
            ref={(el) => {
              cardRefs.current[node.id] = el;
            }}
            className="absolute rounded-[24px] border outline-none cursor-pointer"
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={`Selecteer ${bedrijf.name}`}
            onClick={() =>
              setActiveId(isActive ? null : node.id)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveId(isActive ? null : node.id);
              }
            }}
            style={{
              width: isActive ? CARD_W_EXPANDED : CARD_W_COLLAPSED,
              left: `${node.xPct}%`,
              top: `${node.yPct}%`,
              transform: "translate(-50%, -50%)",
              backgroundColor: isActive
                ? "rgba(11,11,11,0.97)"
                : "rgba(14,14,14,0.92)",
              borderColor: isActive
                ? ACTIVE_BORDER
                : "rgba(255,255,255,0.10)",
              boxShadow: isActive
                ? "0 0 40px rgba(220,70,70,0.10), 0 40px 80px -25px rgba(0,0,0,0.9)"
                : "0 20px 40px -25px rgba(0,0,0,0.7)",
              zIndex: isActive ? 50 : 4,
              transition:
                "width 380ms cubic-bezier(0.22,1,0.36,1), background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
            }}
          >
            {/* Connector dot */}
            <span
              aria-hidden
              className="absolute rounded-full border"
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                top: "50%",
                [node.side === "right" ? "right" : "left"]: -(
                  DOT_GAP +
                  DOT_SIZE / 2
                ),
                transform: "translateY(-50%)",
                backgroundColor: isActive
                  ? "rgb(220,70,70)"
                  : "rgba(20,20,20,1)",
                borderColor: isActive
                  ? "rgba(220,70,70,0.95)"
                  : LINE_SOFT,
                transition:
                  "background-color 300ms ease, border-color 300ms ease",
              }}
            />

            {/* Header */}
            <div className="px-[30px] pt-[26px] pb-[24px] flex items-start justify-between gap-3">
              <div>
                <div
                  className="font-serif leading-tight"
                  style={{ color: "#F5F5F0", fontSize: 28 }}
                >
                  {bedrijf.name}
                </div>
                <div
                  className="mt-2 text-[12px] tracking-[0.28em] uppercase font-medium"
                  style={{
                    color: isActive
                      ? "rgba(220,70,70,0.95)"
                      : "rgba(220,70,70,0.75)",
                    transition: "color 300ms ease",
                  }}
                >
                  {bedrijf.label}
                </div>
              </div>
              {isActive && (
                <span
                  aria-hidden
                  className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.10] text-foreground/60"
                >
                  <X className="h-3.5 w-3.5" />
                </span>
              )}
            </div>

            {/* Expandable body + CTA */}
            <div
              aria-hidden={!isActive}
              className="overflow-hidden"
              style={{
                maxHeight: isActive ? 500 : 0,
                opacity: isActive ? 1 : 0,
                transition:
                  "max-height 420ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease",
              }}
            >
              <div className="px-[30px] pb-[28px]">
                <div className="h-px w-full bg-white/[0.06] mb-5" />
                <p className="text-[14px] leading-[1.7] text-muted-foreground">
                  {bedrijf.body}
                </p>
                <a
                  href={bedrijf.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group mt-6 inline-flex items-center gap-2 text-[12.5px] tracking-[0.005em] text-foreground/90 hover:text-accent transition-colors duration-300"
                >
                  {bedrijf.cta}
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-500" />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mobile stack                                                               */
/* -------------------------------------------------------------------------- */

function MobileStack({
  activeId,
  setActiveId,
}: {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}) {
  return (
    <div
      className="relative w-full rounded-[24px] border border-white/[0.08] overflow-hidden px-6 py-12"
      style={{
        background:
          "radial-gradient(60% 50% at 50% 22%, rgba(184,58,58,0.08), transparent 65%), #050505",
      }}
    >
      <div className="flex flex-col items-center">
        <div
          className="relative w-[150px] h-[150px] rounded-full overflow-hidden border bg-[#111111] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)]"
          style={{ borderColor: "rgba(184,58,58,0.45)" }}
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

      <div
        aria-hidden
        className="mx-auto mt-8 mb-3 w-px h-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(190,55,55,0.45), transparent)",
        }}
      />

      <div className="space-y-3">
        {BEDRIJVEN.map((b) => {
          const isActive = activeId === b.id;
          return (
            <div
              key={b.id}
              className="rounded-[18px] border overflow-hidden"
              style={{
                borderColor: isActive
                  ? ACTIVE_BORDER
                  : "rgba(255,255,255,0.10)",
                backgroundColor: isActive
                  ? "rgba(13,13,13,0.97)"
                  : "rgba(17,17,17,0.82)",
                transition:
                  "border-color 250ms ease, background-color 250ms ease",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveId(isActive ? null : b.id)}
                aria-expanded={isActive}
                className="block w-full text-left px-5 py-4 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-serif text-foreground text-[19px] leading-tight">
                      {b.name}
                    </div>
                    <div
                      className="mt-1.5 text-[10px] tracking-[0.32em] uppercase font-medium"
                      style={{
                        color: isActive
                          ? "rgba(220,70,70,0.95)"
                          : "rgba(220,70,70,0.75)",
                        transition: "color 300ms ease",
                      }}
                    >
                      {b.label}
                    </div>
                  </div>
                  {isActive && (
                    <span
                      aria-hidden
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.10] text-foreground/60"
                    >
                      <X className="h-3 w-3" />
                    </span>
                  )}
                </div>
              </button>

              <div
                aria-hidden={!isActive}
                className="overflow-hidden"
                style={{
                  maxHeight: isActive ? 500 : 0,
                  opacity: isActive ? 1 : 0,
                  transition:
                    "max-height 400ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease",
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
  );
}
