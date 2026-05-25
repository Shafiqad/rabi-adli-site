"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { SignatureLogo } from "@/components/ui/signature-logo";
import { ShinyButton } from "@/components/ui/shiny-button";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Over", href: "#over", id: "over" },
  { label: "Reis", href: "#reis", id: "reis" },
  { label: "Media", href: "#media", id: "media" },
  { label: "Bedrijven", href: "#bedrijven", id: "bedrijven" },
];

export const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  /* ----- Scroll state ----- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ----- Active section observer ----- */
  useEffect(() => {
    const sections = NAV_ITEMS
      .map((it) => document.getElementById(it.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* ----- Body scroll lock for mobile menu ----- */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((v) => !v);

  return (
    <>
      <div className="fixed top-4 md:top-5 left-0 right-0 z-50 flex justify-center w-full px-4 pointer-events-none">
        <motion.nav
          aria-label="Hoofdmenu"
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          /* Mobile = iPhone Dynamic Island: auto-width compact black pill.
             Desktop (md+) = wider translucent floating pill with menu items + CTA. */
          className={cn(
            "pointer-events-auto flex items-center justify-between rounded-full border transition-all duration-500 ease-out",
            "w-auto gap-3 pl-5 pr-[7px] py-[7px]",
            "md:w-full md:max-w-[740px] md:gap-3 md:pl-4 md:pr-[7px] md:py-[7px]",
            scrolled
              ? "bg-black/92 md:bg-[rgba(10,10,10,0.78)] backdrop-blur-xl border-white/[0.08] md:border-white/[0.10] shadow-[0_14px_40px_-14px_rgba(0,0,0,0.65)] md:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)]"
              : "bg-black/90 md:bg-[rgba(10,10,10,0.55)] backdrop-blur-xl md:backdrop-blur-md border-white/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.55)] md:shadow-none"
          )}
        >
          {/* Mobile-only invisible spacer — balances the menu button on the right
              so the wordmark sits visually centered inside the dynamic-island pill. */}
          <span aria-hidden className="md:hidden block w-10 h-10 shrink-0" />

          {/* Wordmark logo with subtle accent dot */}
          <a
            href="#top"
            aria-label="Rabi Adli — home"
            className="flex items-center gap-2.5 text-foreground transition-opacity duration-300 hover:opacity-[0.78]"
          >
            <span
              aria-hidden
              className="hidden md:block h-1 w-1 rounded-full bg-accent/65 shadow-[0_0_6px_rgba(184, 58, 58,0.5)]"
            />
            <SignatureLogo
              width={220}
              height={58}
              className="text-foreground text-[20px] md:text-[26px] h-[42px] md:h-[44px] w-auto"
            />
          </a>

          {/* Divider — logo → nav */}
          <span
            aria-hidden
            className="hidden md:block h-4 w-px bg-white/[0.10]"
          />

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeId === item.id;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05 * i + 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center gap-2 px-[12px] py-[7px] rounded-full text-[12.5px] font-medium tracking-[0.005em] transition-colors duration-250 hover:bg-[rgba(255,255,255,0.06)]",
                      isActive
                        ? "text-foreground"
                        : "text-[rgba(245,245,240,0.72)] hover:text-foreground"
                    )}
                  >
                    <span>{item.label}</span>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-dot"
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.4 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="w-[5px] h-[5px] rounded-full bg-accent shadow-[0_0_10px_rgba(184, 58, 58,0.55)]"
                        />
                      )}
                    </AnimatePresence>
                  </a>
                </motion.li>
              );
            })}
          </ul>

          {/* Divider — nav → CTA */}
          <span
            aria-hidden
            className="hidden md:block h-4 w-px bg-white/[0.10]"
          />

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:inline-flex"
          >
            <ShinyButton size="sm" href="#over">
              Mijn verhaal
            </ShinyButton>
          </motion.div>

          {/* Mobile menu toggle */}
          <motion.button
            onClick={toggleMenu}
            whileTap={{ scale: 0.92 }}
            aria-label={isOpen ? "Sluit menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-foreground bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.10] transition-colors duration-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobiel menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: "rgba(5,5,5,0.94)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="h-full flex flex-col px-6 pt-28 pb-10">
              <div className="flex-1 flex flex-col justify-center">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeId === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={toggleMenu}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group border-b border-white/[0.07] py-6 flex items-baseline justify-between"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-serif text-[40px] leading-none text-foreground">
                          {item.label}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(184, 58, 58,0.55)]" />
                        )}
                      </span>
                      <span className="text-[10px] tracking-[0.32em] uppercase text-subtle-foreground">
                        0{i + 1}
                      </span>
                    </motion.a>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={toggleMenu}
                className="mt-8 flex justify-center"
              >
                <ShinyButton href="#over">Mijn verhaal</ShinyButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
