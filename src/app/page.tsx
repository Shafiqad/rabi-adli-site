import { Navbar1 } from "@/components/ui/navbar-1";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Intro } from "@/components/sections/intro";
import { LifeTimeline } from "@/components/sections/life-timeline";
import { NewsArticles } from "@/components/sections/news-articles";
import { Bedrijven } from "@/components/sections/bedrijven";
import { Podcasts } from "@/components/sections/podcasts";
import { CtaSection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar1 />
      <Hero />
      <StatsStrip />
      <Intro />
      <LifeTimeline />
      <NewsArticles />
      <Bedrijven />
      <Podcasts />
      <CtaSection />
      <Footer />
    </main>
  );
}
