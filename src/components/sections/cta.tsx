"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";
import { ShinyButton } from "@/components/ui/shiny-button";

export function CtaSection() {
  return (
    <section className="relative px-4 md:px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div
          className="relative overflow-hidden rounded-[28px] md:rounded-[40px] border border-white/[0.08] px-6 md:px-16 py-20 md:py-28 text-center"
          style={{
            background:
              "radial-gradient(80% 80% at 50% 0%, rgba(184, 58, 58,0.12), transparent 60%), linear-gradient(180deg, #0d0d0d 0%, #050505 100%)",
          }}
        >
          {/* Subtle grid texture */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 85%)",
            }}
          />

          {/* Signature watermark in background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logosignature.png"
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(680px,90%)] opacity-[0.04]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          {/* Top hairline highlight */}
          <div
            aria-hidden
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-1/3 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,245,240,0.5), transparent)",
              filter: "blur(2px)",
            }}
          />

          <div className="relative z-10">
            <Reveal>
              <span className="text-[11px] tracking-[0.32em] uppercase text-accent font-medium">
                De wereld achter Rabi
              </span>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="mt-6 font-serif text-foreground leading-[1.05] tracking-[-0.018em] text-[clamp(34px,5.2vw,64px)] max-w-3xl mx-auto">
                Benieuwd naar de business{" "}
                <span className="display-italic">achter Rabi Adli?</span>
              </h2>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-8 text-[15px] md:text-[17px] leading-[1.7] text-muted-foreground max-w-2xl mx-auto">
                Ontdek de platformen, samenwerkingen en ideeën die gebouwd
                zijn rondom geld, controle, ondernemerschap en vrijheid.
                Niet alleen een verhaal — een ecosysteem in beweging.
              </p>
            </Reveal>

            <Reveal delay={460}>
              <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center">
                <ShinyButton href="#bedrijven">Bekijk zijn wereld</ShinyButton>
                <ShinyButton href="mailto:contact@rabiadli.nl">
                  Neem contact op
                </ShinyButton>
              </div>
            </Reveal>

            <Reveal delay={620}>
              <div className="mt-12 flex items-center justify-center gap-3 text-[10px] tracking-[0.32em] uppercase text-subtle-foreground">
                <span className="block h-px w-8 bg-foreground/20" />
                <span>Rabi Adli · Amsterdam · NL</span>
                <span className="block h-px w-8 bg-foreground/20" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
