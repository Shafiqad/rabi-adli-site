"use client";

import * as React from "react";
import { useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

/* -------------------------------------------------------------------------- */
/*  News data — edit this array to add / remove articles. Cards with a real    */
/*  href open in a new tab; "#" entries are placeholders for the user to fill. */
/* -------------------------------------------------------------------------- */

interface NewsArticle {
  outlet: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  image?: string;
  kind?: "Artikel" | "Interview" | "Radio" | "Podcast" | "Video" | "TV" | "Spreker" | "Social";
}

const ARTICLES: NewsArticle[] = [
  {
    outlet: "The Speakers",
    date: "Lopend",
    kind: "Spreker",
    title: "Consultant en educator die financiële risico's begrijpelijk maakt — 5/5 beoordeeld.",
    excerpt:
      "Rabi Adli staat op The Speakers als top-rated spreker en financieel educator, met een consistente 5/5 beoordeling van organisatoren en publiek in Nederland.",
    href: "https://www.thespeakers.nl/sprekers/rabi-adli/",
    image: "/images/media/speakers.png",
  },
  {
    outlet: "LinkedIn",
    date: "November 2024",
    kind: "Social",
    title: "Rabi Adli — financial insights & updates.",
    excerpt:
      "Featured LinkedIn-post die 200K+ volgers bereikte met inzichten over financiële planning en belastingstrategie voor ondernemers.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7261676706514571265/",
    image: "/images/media/linkedin.png",
  },
  {
    outlet: "De Gelderlander",
    date: "2024",
    kind: "Artikel",
    title: "\"Je geeft je pinpas met je code en dan krijg je €1000\" — Rabi waarschuwt voor geldezel-gevaren.",
    excerpt:
      "Gepubliceerd in één van Nederlands grootste regionale kranten. Rabi luidt de noodklok over de opkomst van geldezel-rekrutering onder jongeren.",
    href: "https://www.gelderlander.nl/binnenland/je-geeft-je-pinpas-met-je-code-en-dan-krijg-je-1000-euro-rabi-waarschuwt-voor-geldezel-gevaren~a5d879dc/239741362/",
    image: "/images/media/gelderlander.jpg",
  },
  {
    outlet: "Tubantia",
    date: "2024",
    kind: "Artikel",
    title: "\"Je geeft je pinpas met je code en dan krijg je €1000\" — Rabi waarschuwt voor geldezel-gevaren.",
    excerpt:
      "Dezelfde onderzoeksrapportage verscheen ook in Tubantia, waardoor Rabi's waarschuwing ook Oost-Nederland bereikte.",
    href: "https://www.tubantia.nl/binnenland/je-geeft-je-pinpas-met-je-code-en-dan-krijg-je-1000-euro-rabi-waarschuwt-voor-geldezel-gevaren~a5d879dc/239741362/",
    image: "/images/media/tubantia.jpg",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function NewsArticles() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollByOne = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 360;
    el.scrollBy({ left: dir * (cardWidth + 20), behavior: "smooth" });
  };

  return (
    <section className="relative py-28 md:py-40 border-t border-border bg-background overflow-hidden">
      {/* Soft accent wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(184, 58, 58,0.05), transparent 70%)",
        }}
      />

      <div className="section-wrap mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="h-px w-10 bg-foreground/20" />
                <span className="eyebrow">In de media — 04</span>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="display-lg">
                Artikelen, interviews en{" "}
                <span className="display-italic">media-features.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={300} className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted-foreground text-base leading-relaxed">
              Een doorlopende selectie publicaties waarin Rabi Adli zijn
              visie deelt over geld, ondernemerschap en financiële
              autoriteit.
            </p>
          </Reveal>
        </div>

        {/* Slider controls — arrows aligned right */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
            {ARTICLES.length.toString().padStart(2, "0")} publicaties · sleep om te bladeren
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByOne(-1)}
              aria-label="Vorige publicatie"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.10] bg-background/60 backdrop-blur-md text-foreground/80 hover:text-foreground hover:bg-background/80 hover:border-accent/40 transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByOne(1)}
              aria-label="Volgende publicatie"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.10] bg-background/60 backdrop-blur-md text-foreground/80 hover:text-foreground hover:bg-background/80 hover:border-accent/40 transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider — full-bleed scroll rail with snap */}
      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth"
          style={{
            scrollPaddingLeft: "max(24px, calc((100vw - 1280px) / 2 + 24px))",
            paddingLeft: "max(24px, calc((100vw - 1280px) / 2 + 24px))",
            paddingRight: "max(24px, calc((100vw - 1280px) / 2 + 24px))",
          }}
        >
          {ARTICLES.map((a, i) => (
            <Reveal
              key={`${a.outlet}-${i}`}
              delay={Math.min(i * 60, 480)}
              className="snap-start shrink-0 w-[300px] sm:w-[340px] md:w-[400px]"
            >
              <ArticleCard article={a} index={i} total={ARTICLES.length} />
            </Reveal>
          ))}
        </div>

        {/* Edge fade masks */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgb(5,5,5) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10"
          style={{
            background:
              "linear-gradient(270deg, rgb(5,5,5) 0%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  ArticleCard                                                                */
/* -------------------------------------------------------------------------- */

function ArticleCard({
  article,
  index,
  total,
}: {
  article: NewsArticle;
  index: number;
  total: number;
}) {
  const isExternal = article.href.startsWith("http");
  return (
    <a
      href={article.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex h-full min-h-[520px] flex-col rounded-[22px] card-premium overflow-hidden"
    >
      {/* Cover image */}
      {article.image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.05]">
          {/* Placeholder gradient */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(150deg, #1a1a1a 0%, #0c0c0c 60%, #050505 100%)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={article.outlet}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.85] contrast-[1.05] transition-[filter,transform] duration-[1.1s] ease-out group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-[1.04]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0";
            }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.85) 100%)",
            }}
          />
        </div>
      )}

      <div className="relative flex flex-1 flex-col p-7 md:p-8">
        {/* Top accent line — grows on hover */}
        <span
          aria-hidden
          className="absolute top-0 left-7 md:left-8 h-px w-8 bg-accent/40 group-hover:w-24 transition-[width] duration-700"
        />

        <div className="flex items-center justify-between text-[10px] tracking-[0.28em] uppercase">
          <span className="text-accent/85 group-hover:text-accent transition-colors duration-500 truncate max-w-[60%]">
            {article.outlet}
          </span>
          <span className="text-subtle-foreground whitespace-nowrap">
            {article.kind ? `${article.kind} · ` : ""}
            {article.date}
          </span>
        </div>

        <h3 className="mt-6 font-serif text-foreground text-[19px] md:text-[21px] leading-[1.25] tracking-[-0.005em]">
          {article.title}
        </h3>

        <p className="mt-4 text-[14px] leading-[1.6] text-muted-foreground line-clamp-3">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
          <span className="text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
            {String(index + 1).padStart(2, "0")}
            {" / "}
            {String(total).padStart(2, "0")}
          </span>
          <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.005em] text-foreground/80 group-hover:text-accent transition-colors duration-300">
            Lees artikel
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-500" />
          </span>
        </div>
      </div>
    </a>
  );
}
