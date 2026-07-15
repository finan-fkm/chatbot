"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export default function ChatSimulator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "user",
      text: "Can you analyze our recent market data trends?",
    },
    {
      id: "2",
      sender: "ai",
      text: "Analyzing your datasets now. I've identified a 14% uptick in engagement across the EMEA region...",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const canvasEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsgId = Date.now().toString();
    const updatedMessages = [...messages, { id: userMsgId, sender: "user" as const, text }];
    setMessages(updatedMessages);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "ai", text: data.message },
      ]);
    } catch (err: any) {
      console.error("Failed to fetch response:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: `Neural link disrupted: ${err.message || "Failed to communicate with Groq AI."}`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    canvasEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  return (
    <section id="live-chat-simulator" className="py-20 px-[20px] md:px-[64px] bg-[#1b1f2e]">
      <div className="max-w-md md:max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display text-[32px] font-semibold text-[#dfe1f6] tracking-[-0.01em]">
            Live Experience
          </h2>
          <p className="text-on-surface-variant font-body text-[16px]">
            See the logic in action.
          </p>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border-white/5 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-0.5">
                <div className="w-full h-full rounded-full bg-[#050816] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    auto_fix_high
                  </span>
                </div>
              </div>
              <span className="font-label text-[14px] font-medium text-[#dfe1f6]">Neuralink AI</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
          </div>

          {/* Chat Message Canvas */}
          <div className="p-4 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "user" ? (
                    <div className="bg-primary-container text-white p-4 rounded-2xl rounded-tr-none max-w-[80%] font-body text-[14px] leading-relaxed shadow-md select-text">
                      {msg.text}
                    </div>
                  ) : (
                    <div className="glass-card bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[85%] space-y-2 text-[#dfe1f6] font-body text-[14px] leading-relaxed select-text">
                      {msg.text}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="glass-card bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[85%] flex items-center gap-1.5 py-3">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </motion.div>
            )}
            <div ref={canvasEndRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 pb-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleSendMessage("Generate Report")}
              disabled={isTyping}
              className={`px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-sm text-[#dfe1f6] cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isTyping ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"
              }`}
            >
              Generate Report
            </button>
            <button
              onClick={() => handleSendMessage("Export CSV")}
              disabled={isTyping}
              className={`px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-sm text-[#dfe1f6] cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isTyping ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"
              }`}
            >
              Export CSV
            </button>
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-4 border-t border-white/10 bg-white/5"
          >
            <div className="flex items-center gap-3 bg-[#050816] rounded-2xl border border-white/10 px-4 py-2 focus-within:ring-2 focus-within:ring-primary transition-all">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                placeholder={isTyping ? "AI is processing..." : "Message AI..."}
                rows={1}
                className="bg-transparent border-none outline-none text-[#dfe1f6] text-[14px] flex-1 placeholder-[#c7c4d8]/50 resize-none font-body leading-relaxed max-h-24 overflow-y-auto scrollbar-none py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Message text area input"
              />
              <button
                type="submit"
                disabled={isTyping || !inputText.trim()}
                className={`ml-auto w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isTyping || !inputText.trim()
                    ? "bg-white/5 text-[#c7c4d8]/30 cursor-not-allowed"
                    : "bg-primary text-on-primary hover:brightness-110 active:scale-95 cursor-pointer"
                }`}
                aria-label="Send message"
              >
                <span className="material-symbols-outlined text-[16px] font-bold">
                  arrow_upward
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
