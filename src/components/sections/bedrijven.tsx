"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ShinyButton } from "@/components/ui/shiny-button";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Bedrijven data — voeg/wijzig hier om de selector te updaten                */
/* -------------------------------------------------------------------------- */

interface Bedrijf {
  /** Slug used internally. */
  id: string;
  /** Display name. */
  name: string;
  /** Short label shown above the title in the active panel. */
  label: string;
  /** Tagline shown directly under the title. */
  tagline: string;
  /** Long-form body copy. */
  body: string;
  /** Bullet points / focus tags. */
  focus: string[];
  /** External destination. */
  href: string;
  /** Optional logo (white-on-transparent). Drop in /public/images/. */
  logo: string;
  /** RGB triplet for subtle brand-tinted gradient. */
  accentRgb: string;
  /** CTA label for this brand. */
  cta: string;
}

const BEDRIJVEN: Bedrijf[] = [
  {
    id: "compound-quadrant",
    name: "Compound Quadrant",
    label: "Method & Strategy",
    tagline: "Vermogensopbouw met systeem.",
    body: "Een framework voor lange-termijn vermogensopbouw. Geen quick wins of hype — wel een heldere methode om kapitaal te laten werken, gebaseerd op structuur, geduld en samengestelde groei.",
    focus: ["Vermogen", "Strategie", "Lange termijn"],
    href: "#",
    logo: "/images/compound-quadrant-logo.svg",
    accentRgb: "200,70,70",
    cta: "Ontdek Compound Quadrant",
  },
  {
    id: "geldinstituut",
    name: "Geldinstituut",
    label: "Finance & Control",
    tagline: "Grip op cijfers voor ondernemers.",
    body: "Voor ondernemers die grip willen krijgen op cijfers, belasting, boekhouding en financiële strategie. Geldinstituut helpt ondernemers niet alleen meer omzet draaien, maar vooral scherper sturen en meer overhouden.",
    focus: ["Boekhouding", "Fiscaliteit", "Control"],
    href: "#",
    logo: "/images/geldinstituut-logo.svg",
    accentRgb: "184,58,58",
    cta: "Bekijk Geldinstituut",
  },
  {
    id: "vosgoldberg",
    name: "Vosgoldberg",
    label: "Private Wealth",
    tagline: "Vermogen, structuur en nalatenschap.",
    body: "Een private partner voor ondernemers en families die hun vermogen serieus willen structureren. Van holding-structuren tot estate planning — gericht op behoud, controle en de generaties die volgen.",
    focus: ["Holding", "Estate", "Private"],
    href: "#",
    logo: "/images/vosgoldberg-logo.svg",
    accentRgb: "170,50,60",
    cta: "Bekijk Vosgoldberg",
  },
  {
    id: "moneyfesto",
    name: "Moneyfesto",
    label: "Community & Vision",
    tagline: "Denken in vrijheid.",
    body: "Een exclusieve omgeving voor mensen die anders willen leren kijken naar geld, kapitaal, vrijheid en het systeem. Moneyfesto draait om visie, omgeving en financiële bewustwording.",
    focus: ["Members", "Visie", "Systeem"],
    href: "#",
    logo: "/images/moneyfesto-logo.svg",
    accentRgb: "212,88,88",
    cta: "Ontdek Moneyfesto",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function Bedrijven() {
  const [activeId, setActiveId] = useState<string>(BEDRIJVEN[0].id);
  const active = BEDRIJVEN.find((b) => b.id === activeId) ?? BEDRIJVEN[0];

  return (
    <section
      id="bedrijven"
      className="relative py-28 md:py-40 border-t border-border overflow-hidden"
    >
      <div className="section-wrap mx-auto max-w-7xl">
        {/* ----- Heading ----- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="h-px w-10 bg-foreground/20" />
                <span className="eyebrow">Mijn wereld — 05</span>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="display-lg">
                De wereld van{" "}
                <span className="display-italic">Rabi Adli.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={300} className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted-foreground text-base leading-relaxed">
              Platformen, content en ecosystemen gebouwd rondom geld,
              controle, ondernemerschap en vrijheid.
            </p>
          </Reveal>
        </div>

        {/* ----- Tabs ----- */}
        <Reveal delay={200}>
          <div
            role="tablist"
            aria-label="Bedrijven"
            className="flex gap-2 md:gap-3 overflow-x-auto hide-scrollbar pb-2 mb-10 md:mb-12"
          >
            {BEDRIJVEN.map((b) => {
              const isActive = b.id === activeId;
              return (
                <button
                  key={b.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(b.id)}
                  className={cn(
                    "shrink-0 px-4 md:px-5 py-2.5 rounded-full border text-[12.5px] tracking-[0.005em] font-medium transition-all duration-400 ease-out",
                    isActive
                      ? "border-accent/55 bg-accent/10 text-foreground"
                      : "border-white/[0.10] bg-white/[0.02] text-foreground/65 hover:text-foreground hover:border-white/[0.20] hover:bg-white/[0.05]"
                  )}
                >
                  {b.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ----- Active panel ----- */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch"
            >
              {/* Visual / logo card */}
              <div className="lg:col-span-5">
                <div
                  className="relative h-[300px] md:h-[400px] lg:h-full min-h-[320px] rounded-[22px] overflow-hidden border border-white/[0.08]"
                  style={{
                    background: `radial-gradient(120% 80% at 50% 0%, rgba(${active.accentRgb},0.20), transparent 70%), linear-gradient(160deg, #181818 0%, #0a0a0a 60%, #050505 100%)`,
                  }}
                >
                  {/* Top label */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[10px] tracking-[0.32em] uppercase">
                    <span style={{ color: `rgba(${active.accentRgb},0.85)` }}>
                      {active.label}
                    </span>
                    <span className="text-subtle-foreground">
                      {String(
                        BEDRIJVEN.findIndex((b) => b.id === active.id) + 1
                      ).padStart(2, "0")}
                      {" "}
                      / 0{BEDRIJVEN.length}
                    </span>
                  </div>

                  {/* Brand mark — wordmark + optional logo */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center gap-5">
                    <BrandLogo logo={active.logo} name={active.name} />
                    <span
                      className="font-serif leading-none"
                      style={{
                        fontSize: "clamp(32px, 4vw, 48px)",
                        color: `rgba(${active.accentRgb},0.85)`,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {active.name}
                    </span>
                  </div>

                  <ArrowUpRight className="absolute bottom-5 right-5 h-5 w-5 text-foreground/60" />
                </div>
              </div>

              {/* Copy panel */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <span
                    className="text-[11px] tracking-[0.32em] uppercase font-medium"
                    style={{ color: `rgba(${active.accentRgb},0.95)` }}
                  >
                    {active.label}
                  </span>
                  <h3 className="mt-4 font-serif text-foreground leading-[1.05] text-[clamp(34px,4.4vw,52px)] tracking-[-0.015em]">
                    {active.name}
                  </h3>
                  <p className="mt-5 text-[15.5px] md:text-[17px] text-foreground/85 italic font-serif">
                    {active.tagline}
                  </p>
                  <p className="mt-7 text-[15px] md:text-[16px] leading-[1.7] text-muted-foreground max-w-2xl">
                    {active.body}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {active.focus.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground border border-border px-3 py-1.5 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-border flex items-center justify-between gap-6 flex-wrap">
                  <ShinyButton
                    href={active.href}
                    target={active.href.startsWith("http") ? "_blank" : undefined}
                    rel={active.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {active.cta}
                  </ShinyButton>
                  <span className="text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
                    {String(
                      BEDRIJVEN.findIndex((b) => b.id === active.id) + 1
                    ).padStart(2, "0")}
                    {" / 0"}
                    {BEDRIJVEN.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  BrandLogo — image with graceful fallback                                   */
/* -------------------------------------------------------------------------- */

function BrandLogo({ logo, name }: { logo: string; name: string }) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [logo]);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo}
      alt={`${name} logo`}
      onError={() => setFailed(true)}
      className="h-12 md:h-14 w-auto object-contain opacity-90 select-none"
      draggable={false}
    />
  );
}
