"use client";

import * as React from "react";
import { Reveal } from "@/components/reveal";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Mail, MessageSquare, Calendar } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-44">
      <div className="section-wrap mx-auto max-w-6xl">
        <div className="relative border border-border bg-card p-8 md:p-16 lg:p-20 overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 80% 20%, rgba(184, 58, 58,0.08), transparent 70%)",
            }}
          />
          {/* Corner brackets */}
          <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-accent" />
          <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-accent" />
          <span className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-accent" />
          <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-accent" />

          <div className="relative">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="h-px w-10 bg-foreground/20" />
                <span className="eyebrow">Contact — 08</span>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="display-xl">
                Werk met <span className="display-italic">Rabi.</span>
              </h2>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                Voor samenwerkingen, media, partnerships of strategische
                trajecten kun je contact opnemen. Niet elke aanvraag is
                passend. De focus ligt op mensen en bedrijven die serieus
                bouwen aan groei, controle en lange termijn vrijheid.
              </p>
            </Reveal>

            <Reveal delay={450}>
              <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <ShinyButton href="mailto:contact@rabiadli.nl">
                  Neem contact op
                </ShinyButton>
                <span className="text-subtle-foreground text-[11px] tracking-[0.32em] uppercase">
                  Antwoord binnen 48u
                </span>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <div className="mt-20 pt-10 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  {
                    icon: Mail,
                    label: "E-mail",
                    value: "contact@rabiadli.nl",
                  },
                  {
                    icon: Calendar,
                    label: "Op afspraak",
                    value: "Privé kantoor · Amsterdam",
                  },
                  {
                    icon: MessageSquare,
                    label: "Pers / media",
                    value: "press@rabiadli.nl",
                  },
                ].map((c) => (
                  <div key={c.label} className="flex flex-col gap-2">
                    <c.icon className="h-4 w-4 text-accent" />
                    <div className="eyebrow-muted">{c.label}</div>
                    <div className="text-foreground text-sm">{c.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
