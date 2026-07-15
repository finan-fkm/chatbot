"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How secure is my data?",
    answer: "We use AES-256 encryption at rest and TLS 1.3 in transit. Your data is isolated in private cloud partitions and never used to train our base models.",
  },
  {
    question: "What is the pricing model?",
    answer: "We offer volume-based pricing. Start with our Pro tier for $49/mo which includes 50,000 tokens, or contact us for Enterprise scale.",
  },
  {
    question: "Can I integrate with Slack?",
    answer: "Yes! We have native integrations for Slack, Discord, Zendesk, and a robust REST API for custom implementations.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(idx);
    }
  };

  return (
    <section id="faq-section" className="py-20 px-[20px] md:px-[64px] bg-[#171b2a]">
      <div className="max-w-md md:max-w-2xl mx-auto space-y-12">
        <h2 className="font-display text-[32px] font-semibold text-center text-[#dfe1f6] tracking-[-0.01em]">
          Questions?
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden border border-white/5"
              >
                {/* Header (Trigger) */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleToggle(idx)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  aria-expanded={isOpen}
                  className="flex justify-between items-center p-6 cursor-pointer select-none hover:bg-white/[0.02] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                >
                  <span className="font-label text-[14px] font-medium text-[#dfe1f6]">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="material-symbols-outlined text-[#c7c4d8] select-none"
                  >
                    expand_more
                  </motion.span>
                </div>

                {/* Animated Disclosure Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-on-surface-variant font-body text-[14px] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
