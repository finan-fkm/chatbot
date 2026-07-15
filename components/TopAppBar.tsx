"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  targetId: string;
}

const navLinks: NavLink[] = [
  { label: "Home", targetId: "hero" },
  { label: "Features", targetId: "features-section" },
  { label: "Experience", targetId: "live-chat-simulator" },
  { label: "Journey", targetId: "journey-section" },
  { label: "FAQ", targetId: "faq-section" },
];

export default function TopAppBar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120; // offset for sticky header
      
      for (const link of navLinks) {
        const el = document.getElementById(link.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.targetId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full h-20 z-50 bg-[#0f1321]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-indigo-500/10 flex items-center">
        <div className="flex justify-between items-center px-[20px] md:px-[64px] max-w-[1440px] w-full mx-auto">
          {/* Logo */}
          <button
            onClick={() => handleScrollTo("hero")}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label="Neuralink Home"
          >
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              bubble_chart
            </span>
            <span className="font-display text-[24px] font-semibold tracking-tighter text-primary">
              NEURALINK
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.targetId}
                onClick={() => handleScrollTo(link.targetId)}
                className={`font-label text-[14px] font-medium transition-colors hover:text-primary cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1 ${
                  activeSection === link.targetId ? "text-primary border-b-2 border-primary" : "text-on-surface-variant"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleScrollTo("live-chat-simulator")}
              className="bg-primary-container text-on-primary-container px-5 py-2.5 rounded-full font-label text-[14px] font-medium active:scale-95 transition-all hover:brightness-110 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Launch Chat
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-white/5 cursor-pointer text-[#dfe1f6] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle navigation menu"
            aria-expanded={drawerOpen}
          >
            <span className="material-symbols-outlined text-3xl">
              {drawerOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] z-50 bg-[#0f1321] border-l border-white/10 p-6 flex flex-col gap-8 md:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="font-display text-[20px] font-semibold text-primary">MENU</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/5 cursor-pointer text-on-surface-variant focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.targetId}
                    onClick={() => handleScrollTo(link.targetId)}
                    className={`font-label text-[16px] font-medium text-left transition-colors hover:text-primary cursor-pointer py-2 px-3 rounded-xl hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      activeSection === link.targetId ? "text-primary bg-primary/10" : "text-[#dfe1f6]"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleScrollTo("live-chat-simulator")}
                className="mt-auto bg-primary text-on-primary py-4 rounded-2xl font-label text-[14px] font-medium text-center active:scale-95 transition-all hover:brightness-110 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Launch Chat
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
