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
  kind?: "Artikel" | "Interview" | "Radio" | "Podcast" | "Video" | "TV";
}

const ARTICLES: NewsArticle[] = [
  {
    outlet: "FunX",
    date: "2024",
    kind: "Interview",
    title: "“Geld volgt als je je échte dromen waarmaakt.”",
    excerpt:
      "Interview met financieel expert Rabi over geld, dromen en financiële weerbaarheid voor de nieuwe generatie.",
    href: "https://www.funx.nl/news/funx/dc91d412-84b5-4adb-8e10-1312a9dd2895/financieel-expert-rabi-geld-volgt-als-je-je-echte-dromen-waarmaakt",
  },
  {
    outlet: "WijsDom Podcast",
    date: "2024",
    kind: "Podcast",
    title: "“Niet genoeg geld is een overtuiging — geen feit.”",
    excerpt:
      "Een gesprek over geldovertuigingen, ondernemerschap en hoe scherper denken meer oplevert dan harder werken.",
    href: "https://www.youtube.com/watch?v=D-7RNiqhZdg",
  },
  {
    outlet: "De Geld Specialist",
    date: "2024",
    kind: "Video",
    title: "Het verhaal achter Rabi Adli.",
    excerpt:
      "Van financiële wereld naar eigen ecosysteem — de levensloop, keuzes en motieven achter de bedrijven.",
    href: "https://www.youtube.com/watch?v=qrgyk4fd9lQ",
  },
  {
    outlet: "NPO Radio 1",
    date: "2025",
    kind: "Radio",
    title: "Over geld, vrijheid en het financiële systeem.",
    excerpt:
      "Gesprek over hoe ondernemers en jonge generaties scherper naar geld leren kijken — bij NPO Radio 1.",
    href: "#",
  },
  {
    outlet: "Geldinstituut",
    date: "2025",
    kind: "Artikel",
    title: "Schijnzelfstandigheid — wat verandert er en wat betekent het voor jou?",
    excerpt:
      "Een toelichting op de strengere handhaving rondom schijnzelfstandigheid en wat ondernemers nu kunnen doen.",
    href: "https://www.geldinstituut.nl/",
  },
  {
    outlet: "Lotgenoten Podcast",
    date: "2024",
    kind: "Podcast",
    title: "Bouwen aan financiële autoriteit — visie, missie en methode.",
    excerpt:
      "Een uitgebreid gesprek over het opbouwen van platformen, persoonlijk merk en lange-termijn waarde.",
    href: "#",
  },
  {
    outlet: "AD",
    date: "2025",
    kind: "Artikel",
    title: "De nieuwe generatie financiële denkers in Nederland.",
    excerpt:
      "Hoe een jonge ondernemer met een ABN- en Deloitte-achtergrond financieel onderwijs toegankelijk maakt.",
    href: "#",
  },
  {
    outlet: "NPO 1",
    date: "2025",
    kind: "TV",
    title: "TV-optreden over geld, ondernemerschap en vrijheid.",
    excerpt:
      "Te gast op NPO 1 om te praten over financiële educatie en de visie achter Geldinstituut & Moneyfesto.",
    href: "#",
  },
  {
    outlet: "Het Financieele Dagblad",
    date: "2025",
    kind: "Artikel",
    title: "Ondernemers en hun cijfers — waarom grip belangrijker is dan groei.",
    excerpt:
      "Een opiniestuk over financiële structuur als fundament voor duurzame ondernemerssuccessen.",
    href: "#",
  },
  {
    outlet: "TikTok",
    date: "Lopend",
    kind: "Video",
    title: "Financiële inzichten in korte video's — wekelijks nieuw.",
    excerpt:
      "Bondige uitleg over geld, belasting en ondernemerschap voor een groeiend publiek van 100K+ volgers.",
    href: "https://www.tiktok.com/@rabiadli",
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
              <ArticleCard article={a} index={i} />
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
}: {
  article: NewsArticle;
  index: number;
}) {
  const isExternal = article.href.startsWith("http");
  return (
    <a
      href={article.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex h-full min-h-[380px] flex-col justify-between rounded-[22px] p-7 md:p-8 card-premium overflow-hidden"
    >
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

      <h3 className="mt-8 font-serif text-foreground text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.005em]">
        {article.title}
      </h3>

      <p className="mt-5 text-[14px] leading-[1.6] text-muted-foreground line-clamp-3">
        {article.excerpt}
      </p>

      <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
        <span className="text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
          {String(index + 1).padStart(2, "0")}
          {" / "}
          {String(10).padStart(2, "0")}
        </span>
        <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.005em] text-foreground/80 group-hover:text-accent transition-colors duration-300">
          Lees artikel
          <ArrowUpRight className="h-3.5 w-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-500" />
        </span>
      </div>
    </a>
  );
}
