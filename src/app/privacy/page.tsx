import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacybeleid — Rabi Adli",
  description:
    "Privacybeleid van Rabi Adli — hoe persoonsgegevens worden verzameld, gebruikt en beschermd op rabiadli.nl.",
};

const UPDATED = "26 mei 2026";

export default function PrivacyPage() {
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
            Privacy<span className="display-italic">beleid.</span>
          </h1>
          <p className="mt-6 text-[11px] tracking-[0.32em] uppercase text-subtle-foreground">
            Laatst bijgewerkt — {UPDATED}
          </p>
        </div>

        {/* Body */}
        <article className="prose-legal space-y-12 text-foreground/85">
          <Section title="1. Inleiding">
            <p>
              Dit privacybeleid is van toepassing op de website{" "}
              <span className="text-foreground">rabiadli.nl</span> en alle
              communicatie die daarmee samenhangt. Rabi Adli hecht waarde aan
              zorgvuldig gebruik van jouw gegevens en houdt zich aan de
              Algemene Verordening Gegevensbescherming (AVG).
            </p>
          </Section>

          <Section title="2. Welke gegevens worden verzameld">
            <p>
              Bij gebruik van de site of bij contact opnemen, kunnen de
              volgende gegevens worden verwerkt:
            </p>
            <List
              items={[
                "Contactgegevens (naam, e-mailadres) die je vrijwillig deelt via e-mail of formulieren.",
                "Technische gegevens zoals IP-adres, browsertype, apparaat en bezochte pagina's — voor beveiliging en analyse.",
                "Eventuele berichten of bijlagen die je stuurt naar contact@rabiadli.nl.",
              ]}
            />
          </Section>

          <Section title="3. Doel van de verwerking">
            <p>Gegevens worden uitsluitend gebruikt om:</p>
            <List
              items={[
                "Op je bericht of vraag te reageren.",
                "De website veilig en functioneel te houden.",
                "Geanonimiseerd inzicht te krijgen in hoe bezoekers de site gebruiken.",
                "Te voldoen aan wettelijke verplichtingen.",
              ]}
            />
          </Section>

          <Section title="4. Cookies & analytics">
            <p>
              Deze site kan functionele cookies plaatsen om de werking te
              waarborgen en optionele analytische cookies om geaggregeerd
              bezoekersgedrag te begrijpen. Er worden geen trackingcookies van
              derden ingezet zonder jouw expliciete toestemming.
            </p>
          </Section>

          <Section title="5. Delen met derden">
            <p>
              Persoonsgegevens worden niet verkocht of verhuurd aan derden.
              Alleen verwerkers die nodig zijn voor het functioneren van de
              site (zoals hosting via Netlify) krijgen toegang tot relevante
              gegevens, onder strikte verwerkersovereenkomsten.
            </p>
          </Section>

          <Section title="6. Bewaartermijnen">
            <p>
              Gegevens worden niet langer bewaard dan strikt noodzakelijk voor
              de doelen waarvoor ze zijn verzameld. E-mailcorrespondentie wordt
              standaard maximaal twaalf maanden bewaard, tenzij wettelijk
              langere bewaring vereist is.
            </p>
          </Section>

          <Section title="7. Beveiliging">
            <p>
              Er worden passende technische en organisatorische maatregelen
              getroffen om gegevens te beschermen tegen verlies of
              ongeautoriseerde toegang. Verbindingen verlopen via HTTPS en
              toegang tot gevoelige gegevens is beperkt.
            </p>
          </Section>

          <Section title="8. Jouw rechten">
            <p>Onder de AVG heb je het recht om:</p>
            <List
              items={[
                "Inzage te krijgen in welke gegevens worden verwerkt.",
                "Onjuiste gegevens te laten corrigeren of verwijderen.",
                "Toestemming voor verwerking in te trekken.",
                "Bezwaar te maken tegen verwerking.",
                "Een klacht in te dienen bij de Autoriteit Persoonsgegevens.",
              ]}
            />
            <p>
              Een verzoek hiertoe kan worden gericht aan{" "}
              <a
                href="mailto:contact@rabiadli.nl"
                className="text-foreground underline-offset-4 hover:underline hover:text-accent transition-colors"
              >
                contact@rabiadli.nl
              </a>
              .
            </p>
          </Section>

          <Section title="9. Wijzigingen">
            <p>
              Dit privacybeleid kan worden aangepast wanneer wet- of regelgeving
              dat vereist of wanneer de werking van de site verandert.
              Wijzigingen worden gepubliceerd op deze pagina met een nieuwe
              datum.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              Vragen of opmerkingen over dit beleid kunnen worden gericht aan{" "}
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
            href="/voorwaarden"
            className="hover:text-foreground transition-colors"
          >
            Algemene voorwaarden →
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
