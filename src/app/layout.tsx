import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { GlobalCursor } from "@/components/ui/global-cursor";
// Preloader is currently disabled — re-enable once signature-draw is debugged.
// import { Preloader } from "@/components/ui/preloader";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Rabi Adli — Finance, ondernemerschap & vermogensopbouw",
  description:
    "Rabi Adli neemt je mee in zijn visie op geld, ondernemerschap, fiscaliteit, control en vermogensopbouw. Vanuit ervaring, persoonlijke groei en de bedrijven die hij bouwt rondom financiële vrijheid.",
  openGraph: {
    title: "Rabi Adli — Begrijp geld. Doorzie het systeem. Bouw vrijheid.",
    description:
      "Personal authority website voor finance, ondernemerschap en vermogensopbouw.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-background">
        {children}
        <GlobalCursor />
      </body>
    </html>
  );
}
