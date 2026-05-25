"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { AnimatedNumber } from "@/components/ui/animated-number";

interface Stat {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  {
    prefix: "€",
    value: 100,
    suffix: "M+",
    label: "Geanalyseerd vermogen",
  },
  { value: 100, suffix: "K+", label: "Volgers op social media" },
  { value: 1000, suffix: "+", label: "Mensen geholpen" },
  { value: 10, suffix: "+", label: "Jaar ervaring" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Bright top, gentle dim at the very bottom — legible glyphs throughout. */
const NUMBER_GRADIENT =
  "linear-gradient(180deg, #FFFFFF 0%, #F5F5F0 55%, rgba(245,245,240,0.82) 100%)";

const NUMBER_FILTER =
  "drop-shadow(0 14px 28px rgba(0,0,0,0.45)) drop-shadow(0 3px 6px rgba(0,0,0,0.28))";

const NUMBER_STYLE: React.CSSProperties = {
  backgroundImage: NUMBER_GRADIENT,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

export function StatsStrip() {
  return (
    <section className="relative py-28 md:py-44 bg-background border-y border-border overflow-hidden">
      {/* Soft champagne wash behind */}
      <div
        aria-hidden
        className="absolute inset-0 -z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 50%, rgba(191,164,106,0.05), transparent 70%)",
        }}
      />

      <div className="section-wrap mx-auto max-w-7xl relative">
        {/* Eyebrow — centered, double hairline */}
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-24 md:mb-32">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="eyebrow">In cijfers — 02</span>
            <span className="h-px w-10 bg-foreground/20" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-24 gap-x-10 md:gap-x-20 lg:gap-x-28">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{
                duration: 0.95,
                delay: i * 0.16,
                ease: EASE,
              }}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Number — serif, single gradient span (prefix lives inside) */}
              <div
                className="font-serif font-normal leading-[0.95] tabular-nums whitespace-nowrap"
                style={{
                  fontSize: "clamp(54px, 7vw, 92px)",
                  letterSpacing: "-0.025em",
                  filter: NUMBER_FILTER,
                }}
              >
                <AnimatedNumber
                  prefix={stat.prefix}
                  to={stat.value}
                  suffix={stat.suffix}
                  duration={2400}
                  delay={i * 160}
                  className="inline-block transition-[filter] duration-700 group-hover:[filter:brightness(1.08)]"
                  style={NUMBER_STYLE}
                />
              </div>

              {/* Hairline accent */}
              <span
                aria-hidden
                className="mt-10 block h-px w-8 bg-foreground/20 group-hover:bg-accent/70 group-hover:w-14 transition-[width,background-color] duration-700"
              />

              {/* Label — uppercase, tracked, muted */}
              <span className="mt-6 text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-[rgba(245,245,240,0.5)] group-hover:text-[rgba(245,245,240,0.85)] transition-colors duration-700 max-w-[200px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
