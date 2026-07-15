"use client";

export default function Footer() {
  return (
    <footer className="bg-[#0f1321] py-20 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[64px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">bubble_chart</span>
            <span className="font-display text-[24px] font-semibold text-primary">NEURALINK</span>
          </div>
          <p className="font-label text-[14px] text-tertiary">
            © 2024 Neuralink AI. Engineered for precision.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:justify-items-end">
          <div className="flex flex-col gap-4">
            <a className="font-label text-[14px] text-on-surface-variant hover:text-primary transition-colors" href="#">
              Architecture
            </a>
            <a className="font-label text-[14px] text-on-surface-variant hover:text-primary transition-colors" href="#">
              Security
            </a>
            <a className="font-label text-[14px] text-on-surface-variant hover:text-primary transition-colors" href="#">
              Intelligence
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <a className="font-label text-[14px] text-on-surface-variant hover:text-primary transition-colors" href="#">
              API
            </a>
            <a className="font-label text-[14px] text-on-surface-variant hover:text-primary transition-colors" href="#">
              Privacy
            </a>
            <a className="font-label text-[14px] text-on-surface-variant hover:text-primary transition-colors" href="#">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
