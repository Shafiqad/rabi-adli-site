"use client";

import * as React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Instagram, Linkedin, Youtube, ArrowUp } from "lucide-react";
import { SignatureLogo } from "@/components/ui/signature-logo";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    label: "Site",
    links: [
      { title: "Verhaal", href: "#over" },
      { title: "Visie", href: "#reis" },
      { title: "Werk", href: "#bedrijven" },
      { title: "Media", href: "#media" },
      { title: "Contact", href: "mailto:contact@rabiadli.nl" },
    ],
  },
  {
    label: "Bedrijven",
    links: [
      { title: "Compound Quadrant", href: "#bedrijven" },
      { title: "Geldinstituut", href: "#bedrijven" },
      { title: "Vosgoldberg", href: "#bedrijven" },
      { title: "Moneyfesto", href: "#bedrijven" },
      { title: "Brandaura", href: "#bedrijven" },
    ],
  },
  {
    label: "Volg",
    links: [
      { title: "Instagram", href: "#", icon: Instagram },
      { title: "LinkedIn", href: "#", icon: Linkedin },
      { title: "YouTube", href: "#", icon: Youtube },
    ],
  },
  {
    label: "Juridisch",
    links: [
      { title: "Privacy", href: "/privacy" },
      { title: "Algemene voorwaarden", href: "/voorwaarden" },
      { title: "Imprint", href: "/imprint" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

export function Footer() {
  return (
    <footer
      className={cn(
        "relative w-full max-w-6xl mx-auto mt-20 md:mt-32",
        "flex flex-col items-center justify-center",
        "rounded-t-[32px] md:rounded-t-[48px]",
        "border-t border-border",
        "px-6 md:px-10 py-14 lg:py-20"
      )}
      style={{
        backgroundImage:
          "radial-gradient(45% 140px at 50% 0%, rgba(245,245,240,0.08), transparent)",
      }}
    >
      {/* Top blur highlight */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-1/3 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245,245,240,0.45), transparent)",
          filter: "blur(2px)",
        }}
      />

      <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-10">
        {/* Brand block */}
        <AnimatedContainer className="flex flex-col gap-5">
          <SignatureLogo
            width={140}
            height={42}
            className="text-foreground"
          />
          <p className="font-serif text-2xl md:text-[26px] leading-snug text-foreground max-w-sm">
            Geld. <span className="italic text-accent">Controle.</span>{" "}
            Vrijheid.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
            Personal authority website van Rabi Adli — finance,
            ondernemerschap en vermogensopbouw. Amsterdam · NL.
          </p>

          <a
            href="#top"
            className="mt-2 inline-flex items-center gap-2 self-start text-[11px] tracking-[0.32em] uppercase text-muted-foreground hover:text-accent transition-colors duration-300"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Terug naar boven
          </a>
        </AnimatedContainer>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2">
          {FOOTER_SECTIONS.map((section, i) => (
            <AnimatedContainer key={section.label} delay={0.12 + i * 0.08}>
              <h3 className="text-[10px] tracking-[0.32em] uppercase text-subtle-foreground">
                {section.label}
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 hover:text-foreground transition-colors duration-300"
                    >
                      {link.icon && (
                        <link.icon className="h-3.5 w-3.5 text-subtle-foreground group-hover:text-accent transition-colors duration-300" />
                      )}
                      <span className="relative">
                        {link.title}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground/40 transition-all duration-400 group-hover:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-14 md:mt-20 w-full pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] tracking-[0.28em] uppercase text-subtle-foreground">
        <span>
          © {new Date().getFullYear()} Rabi Adli · All rights reserved
        </span>
        <span className="hidden md:inline">Amsterdam · NL</span>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  AnimatedContainer — blur + slide-in on view                                */
/* -------------------------------------------------------------------------- */

interface ViewAnimationProps {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
}

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className as string}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
