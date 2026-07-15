"use client";

import { motion } from "framer-motion";
import WebGLShader from "./WebGLShader";

export default function Hero() {
  const handleScrollToFeatures = () => {
    const element = document.getElementById("features-section");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleScrollToSimulator = () => {
    const element = document.getElementById("live-chat-simulator");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-[20px] md:px-[64px] pt-24 overflow-hidden bg-[#050816]">
      {/* Background WebGL animation */}
      <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
        <WebGLShader />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center space-y-6 max-w-lg flex flex-col items-center"
      >
        {/* Active Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary/20 text-primary animate-pulse"
        >
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="font-mono-sm text-[13px] uppercase tracking-widest">Neural v4.0 Active</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-[40px] md:text-[64px] font-bold text-gradient leading-tight tracking-[-0.02em]"
        >
          Intelligence That Feels Human.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-body text-[16px] md:text-[18px] text-on-surface-variant px-4"
        >
          The next generation of AI-native chat interfaces, engineered for precision and seamless integration.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 px-6 pt-4 sm:flex-row sm:justify-center w-full"
        >
          <button
            onClick={handleScrollToSimulator}
            className="bg-primary text-on-primary py-4 px-8 rounded-2xl font-label text-[14px] font-medium shadow-lg shadow-primary/20 hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Get Started
          </button>
          <button
            onClick={handleScrollToSimulator}
            className="glass-card py-4 px-8 rounded-2xl font-label text-[14px] font-medium hover:bg-white/5 active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Watch Demo
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Stats Cards */}
      {/* Accuracy Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute top-[20%] right-[5%] md:right-[15%] animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </div>
          <div>
            <div className="font-display text-[24px] font-bold">99%</div>
            <div className="text-xs text-on-surface-variant font-mono-sm">Accuracy</div>
          </div>
        </div>
      </motion.div>

      {/* Instant Response Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-[25%] left-[5%] md:left-[15%] animate-float"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-indigo-400">bolt</span>
          </div>
          <div>
            <div className="font-display text-[24px] font-bold">Instant</div>
            <div className="text-xs text-on-surface-variant font-mono-sm">Response</div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div
        onClick={handleScrollToFeatures}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className="text-xs font-mono-sm tracking-widest uppercase">Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"></div>
      </div>
    </section>
  );
}
