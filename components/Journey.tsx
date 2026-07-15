"use client";

import { motion } from "framer-motion";

interface StepItem {
  icon: string;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    icon: "database",
    title: "Connect Data",
    description: "Plug in your existing databases and knowledge bases.",
  },
  {
    icon: "model_training",
    title: "Train Model",
    description: "Our engine learns your tone, logic, and context.",
  },
  {
    icon: "rocket_launch",
    title: "Deploy Anywhere",
    description: "Launch your custom AI to web, app, or API.",
  },
];

export default function Journey() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="journey-section" className="py-20 px-[20px] md:px-[64px] bg-[#050816]">
      <h2 className="font-display text-[32px] font-semibold text-center text-[#dfe1f6] tracking-[-0.01em] mb-16">
        The Journey
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[280px] sm:max-w-md mx-auto space-y-0 relative"
      >
        {/* Connection Track line */}
        <div className="absolute top-10 left-[24px] bottom-10 w-px bg-gradient-to-b from-primary to-transparent z-0" />

        <div className="space-y-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative flex gap-6 items-start pb-12 last:pb-0"
            >
              {/* Node Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 shrink-0 rounded-full glass-card flex items-center justify-center border-primary/50 relative z-10 glow-indigo transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary">
                  {step.icon}
                </span>
              </motion.div>

              {/* Text Description Box */}
              <div className="pt-2">
                <h4 className="font-display text-[20px] font-semibold text-[#dfe1f6] tracking-[-0.01em]">
                  {step.title}
                </h4>
                <p className="text-on-surface-variant font-body text-[14px] mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
