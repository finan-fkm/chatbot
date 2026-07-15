"use client";

import { motion } from "framer-motion";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: "memory",
    title: "Contextual Memory",
    description: "Retain infinite conversational depth with our proprietary neural state persistence.",
  },
  {
    icon: "account_tree",
    title: "Multi-Modal Logic",
    description: "Process text, code, and visuals simultaneously through unified processing layers.",
  },
  {
    icon: "shield_person",
    title: "Enterprise Security",
    description: "Military-grade encryption and isolated data tenants for complete peace of mind.",
  },
  {
    icon: "api",
    title: "Seamless API",
    description: "Integrate with your existing stack in minutes using our developer-first documentation.",
  },
  {
    icon: "auto_awesome",
    title: "Neural Synthesis",
    description: "Dynamic content creation that adapts to your brand's unique tone and voice profile.",
  },
  {
    icon: "update",
    title: "Real-time Adaptation",
    description: "Live learning models that evolve based on user feedback and changing market data.",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="features-section" className="py-20 px-[20px] md:px-[64px] space-y-8 bg-[#0a0d1c]">
      <div className="text-center space-y-2 mb-12 max-w-xl mx-auto">
        <h2 className="font-display text-[32px] font-semibold text-[#dfe1f6] tracking-[-0.01em]">
          Engineered Excellence
        </h2>
        <p className="text-on-surface-variant font-body text-[16px]">
          Unrivaled power in every interaction.
        </p>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1440px] mx-auto"
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            tabIndex={0}
            className="glass-card p-6 rounded-2xl glow-border group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent select-none"
            aria-label={`${feature.title} feature description`}
          >
            <span className="material-symbols-outlined text-primary text-3xl mb-4 block group-hover:scale-110 group-focus:scale-110 transition-transform">
              {feature.icon}
            </span>
            <h3 className="font-display text-[24px] font-semibold text-[#dfe1f6] mb-2 tracking-[-0.01em]">
              {feature.title}
            </h3>
            <p className="text-on-surface-variant font-body text-[16px] leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
