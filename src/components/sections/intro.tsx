"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ShinyButton } from "@/components/ui/shiny-button";

/* -------------------------------------------------------------------------- */
/*  Photo data — drop matching files in /public/images/ and they show up      */
/*  automatically. Filename convention: rabi-about-01.jpg … 04.jpg            */
/* -------------------------------------------------------------------------- */

const PHOTOS = [
  { src: "/images/rabi-about-01.jpg", alt: "Rabi Adli — portret 01" },
  { src: "/images/rabi-about-02.jpg", alt: "Rabi Adli — portret 02" },
  { src: "/images/rabi-about-03.jpg", alt: "Rabi Adli — portret 03" },
  { src: "/images/rabi-about-04.jpg", alt: "Rabi Adli — portret 04" },
];

const BULLETS = [
  "Financiële kennis vertaald naar praktische inzichten",
  "Ervaring binnen finance, consultancy en ondernemerschap",
  "Platformen gebouwd rondom controle, vermogen en vrijheid",
  "Een persoonlijke missie om mensen scherper naar geld te laten kijken",
];

export function Intro() {
  return (
    <section
      id="over"
      className="relative py-28 md:py-40 overflow-hidden"
    >
      {/* ====================== TEXT BLOCK ====================== */}
      <div className="section-wrap mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-accent font-medium">
              Over Rabi
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — headline */}
          <Reveal delay={120} className="lg:col-span-7">
            <h2 className="font-serif text-foreground leading-[1.04] tracking-[-0.018em] text-[clamp(34px,5vw,58px)]">
              Een leven gebouwd op visie, discipline en{" "}
              <span className="display-italic">financiële scherpte.</span>
            </h2>
          </Reveal>

          {/* Right — body + bullets + CTA */}
          <div className="lg:col-span-5">
            <Reveal delay={260}>
              <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-muted-foreground">
                Rabi Adli is ondernemer, financieel denker en bouwer van
                platformen rondom geld, fiscaliteit, control en
                vermogensopbouw. Zijn verhaal draait om de manier waarop je
                leert kijken naar systemen, keuzes en vrijheid.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-4">
              {BULLETS.map((b, i) => (
                <Reveal key={b} delay={360 + i * 90}>
                  <li className="flex items-start gap-4">
                    <span className="mt-[3px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 border border-accent/40">
                      <Check
                        className="h-3.5 w-3.5 text-accent"
                        strokeWidth={2.4}
                      />
                    </span>
                    <span className="text-[15px] leading-[1.55] text-foreground/85">
                      {b}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={780}>
              <div className="mt-10">
                <ShinyButton href="#reis">Lees mijn verhaal</ShinyButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ====================== FULL-BLEED HORIZONTAL MARQUEE (mobile + desktop) ====================== */}
      <div className="relative mt-20 md:mt-28 marquee-paused">
        {/* Soft accent glow behind the strip */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(40% 70% at 50% 50%, rgba(184, 58, 58,0.08), transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative w-full overflow-hidden">
          <div className="flex items-stretch gap-4 md:gap-5 marquee-track-left">
            {/* Duplicated for a seamless infinite loop. */}
            {[...PHOTOS, ...PHOTOS, ...PHOTOS, ...PHOTOS].map((p, i) => (
              <CarouselPhoto key={`${p.src}-${i}`} src={p.src} alt={p.alt} index={i} />
            ))}
          </div>

          {/* Edge fade masks — left + right */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 z-20"
            style={{
              background:
                "linear-gradient(90deg, rgb(5,5,5) 0%, transparent 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 z-20"
            style={{
              background:
                "linear-gradient(270deg, rgb(5,5,5) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}


/* -------------------------------------------------------------------------- */
/*  CarouselPhoto — fixed-height tile with gradient fallback                   */
/* -------------------------------------------------------------------------- */

function CarouselPhoto({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  return (
    <div className="group relative h-[280px] sm:h-[360px] md:h-[440px] aspect-[4/5] shrink-0 rounded-[18px] overflow-hidden border border-white/[0.07] bg-card">
      {/* Placeholder gradient */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(150deg, #1a1a1a 0%, #0c0c0c 60%, #050505 100%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-serif text-[90px] leading-none text-foreground/[0.045]">
          {String((index % 4) + 1).padStart(2, "0")}
        </span>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.82] contrast-[1.04] transition-[filter,transform] duration-[1.1s] ease-out group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-[1.04]"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = "0";
        }}
      />

      {/* Subtle bottom gradient for editorial depth */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div className="absolute inset-0 rounded-[inherit] border border-transparent group-hover:border-accent/30 transition-colors duration-500 pointer-events-none" />
    </div>
  );
}
