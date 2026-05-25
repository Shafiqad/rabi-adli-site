import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Algemene voorwaarden — Rabi Adli",
  description:
    "Algemene voorwaarden van toepassing op de website rabiadli.nl en alle diensten en samenwerkingen onder de naam Rabi Adli.",
};

const UPDATED = "26 mei 2026";

export default function VoorwaardenPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 md:px-8 pt-28 pb-28 md:pt-36 md:pb-36">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Terug naar home
        </Link>

        {/* Header */}
        <div className="mt-14 mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-accent font-medium">
              Juridisch
            </span>
          </div>
          <h1 className="font-serif text-foreground leading-[1.04] tracking-[-0.018em] text-[clamp(36px,5.4vw,60px)]">
            Algemene <span className="display-italic">voorwaarden.</span>
          </h1>
          <p className="mt-6 text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
            Laatst bijgewerkt — {UPDATED}
          </p>
        </div>

        {/* Body */}
        <article className="prose-legal space-y-12 text-foreground/85">
          <Section title="1. Definities">
            <List
              items={[
                "Rabi Adli: de natuurlijke persoon en aanbieder van content, diensten en samenwerkingen onder die naam.",
                "Bezoeker: iedere natuurlijke persoon die de website rabiadli.nl bezoekt.",
                "Opdrachtgever: iedere natuurlijke of rechtspersoon die met Rabi Adli een overeenkomst aangaat.",
                "Diensten: alle vormen van consultancy, content, sprekersopdrachten en samenwerkingen die door Rabi Adli worden aangeboden.",
              ]}
            />
          </Section>

          <Section title="2. Toepasselijkheid">
            <p>
              Deze voorwaarden zijn van toepassing op het gebruik van de
              website rabiadli.nl en op elke aanbieding, offerte en
              overeenkomst tussen Rabi Adli en de Opdrachtgever, tenzij
              schriftelijk anders overeengekomen.
            </p>
          </Section>

          <Section title="3. Aanbiedingen en overeenkomsten">
            <p>
              Alle aanbiedingen zijn vrijblijvend en geldig gedurende de op de
              aanbieding vermelde termijn. Een overeenkomst komt tot stand
              wanneer de Opdrachtgever schriftelijk akkoord gaat met de
              aanbieding of wanneer met de uitvoering een aanvang wordt
              genomen.
            </p>
          </Section>

          <Section title="4. Uitvoering van diensten">
            <p>
              Rabi Adli zal de diensten uitvoeren naar beste inzicht en
              vermogen, op basis van een inspanningsverplichting. Er wordt
              geen garantie gegeven op specifieke resultaten — diensten van
              educatieve, strategische of inhoudelijke aard zijn afhankelijk
              van inzet en context van de Opdrachtgever.
            </p>
          </Section>

          <Section title="5. Betaling">
            <p>
              Tenzij anders overeengekomen, dienen facturen binnen veertien
              (14) dagen na factuurdatum te worden voldaan. Bij overschrijding
              van de betalingstermijn is de Opdrachtgever van rechtswege in
              verzuim en zijn de wettelijke handelsrente en redelijke
              incassokosten verschuldigd.
            </p>
          </Section>

          <Section title="6. Intellectueel eigendom">
            <p>
              Alle teksten, beelden, designs, methoden, frameworks en content
              op de website en in eventueel geleverde materialen zijn
              eigendom van Rabi Adli of zijn licentiegevers. Niets uit deze
              uitingen mag worden verveelvoudigd, openbaar gemaakt of
              commercieel hergebruikt zonder voorafgaande schriftelijke
              toestemming.
            </p>
          </Section>

          <Section title="7. Aansprakelijkheid">
            <p>
              Content op deze website is uitsluitend bedoeld voor algemene
              informatie en niet als persoonlijk financieel, fiscaal of
              juridisch advies. Hoewel content met zorg wordt samengesteld,
              kunnen aan de inhoud geen rechten worden ontleend.
            </p>
            <p>
              Aansprakelijkheid voor directe of indirecte schade voortvloeiend
              uit het gebruik van de website of de diensten is uitgesloten,
              voor zover wettelijk toegestaan. Eventuele aansprakelijkheid is
              in alle gevallen beperkt tot het bedrag dat in het betreffende
              geval daadwerkelijk is gefactureerd en betaald.
            </p>
          </Section>

          <Section title="8. Privacy">
            <p>
              Op alle verwerking van persoonsgegevens is het{" "}
              <Link
                href="/privacy"
                className="text-foreground underline-offset-4 hover:underline hover:text-accent transition-colors"
              >
                privacybeleid
              </Link>{" "}
              van toepassing.
            </p>
          </Section>

          <Section title="9. Overmacht">
            <p>
              Rabi Adli is niet gehouden tot het nakomen van enige verplichting
              indien hij daartoe gehinderd wordt door overmacht. Hieronder
              wordt verstaan elke van buiten komende oorzaak waardoor nakoming
              redelijkerwijs niet kan worden verlangd.
            </p>
          </Section>

          <Section title="10. Beëindiging">
            <p>
              Beide partijen kunnen een overeenkomst beëindigen met
              inachtneming van een redelijke opzegtermijn en in
              overeenstemming met de gemaakte afspraken. Reeds geleverde
              diensten blijven verschuldigd.
            </p>
          </Section>

          <Section title="11. Toepasselijk recht en geschillen">
            <p>
              Op deze voorwaarden en alle overeenkomsten is uitsluitend
              Nederlands recht van toepassing. Eventuele geschillen worden
              voorgelegd aan de bevoegde rechter in Amsterdam, tenzij
              dwingendrechtelijk een andere rechter is voorgeschreven.
            </p>
          </Section>

          <Section title="12. Wijzigingen">
            <p>
              Deze voorwaarden kunnen periodiek worden aangepast. De meest
              actuele versie is altijd raadpleegbaar via deze pagina.
              Wijzigingen werken na publicatie door op nieuwe overeenkomsten
              en, na redelijke aankondiging, op lopende overeenkomsten.
            </p>
          </Section>

          <Section title="13. Contact">
            <p>
              Vragen over deze voorwaarden kunnen worden gericht aan{" "}
              <a
                href="mailto:contact@rabiadli.nl"
                className="text-foreground underline-offset-4 hover:underline hover:text-accent transition-colors"
              >
                contact@rabiadli.nl
              </a>
              .
            </p>
          </Section>
        </article>

        {/* Bottom rule */}
        <div className="mt-20 pt-10 border-t border-border flex items-center justify-between text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
          <span>Rabi Adli · Amsterdam · NL</span>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            ← Privacybeleid
          </Link>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-foreground text-[22px] md:text-[26px] leading-tight tracking-[-0.005em] mb-5">
        {title}
      </h2>
      <div className="text-[15px] md:text-[16px] leading-[1.75] text-muted-foreground space-y-4">
        {children}
      </div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-accent/70"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
