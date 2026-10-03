import type { ReactNode } from "react";
export const panel = "rounded-2xl bg-white/[.06] ring-1 ring-white/10 backdrop-blur-md";
const b = "rounded-full px-6 py-3 text-sm transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed";
export const btnPrimary = `${b} bg-gradient-to-b from-amber-300 to-amber-500 text-stone-900 font-semibold shadow-lg shadow-amber-500/20 hover:brightness-110`;
export const btnGhost = `${b} ring-1 ring-white/25 text-stone-100 hover:bg-white/10`;
export const chip = (on: boolean) => `rounded-full px-3.5 py-1.5 text-sm ring-1 transition ${on ? "bg-amber-300 text-stone-900 ring-amber-300 font-semibold" : "ring-white/20 text-stone-200 hover:bg-white/10"}`;
export const eyebrow = "text-[11px] font-semibold uppercase tracking-[.18em] text-amber-300/90";
export const display = "font-display font-bold tracking-tight";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col text-stone-100 bg-[radial-gradient(ellipse_at_top,#4a1d4f_0%,#1b0b2b_45%,#0d0617_100%)]">
      <div className="ikat" />
      <header className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-4">
        <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden><path d="M15 2 L28 26 H2Z" fill="#E8B04A" /><path d="M15 9 L23 24 H7Z" fill="#C2185B" /><path d="M15 15 L19 23 H11Z" fill="#2E7D32" /></svg>
        <div className="leading-tight"><p className={`${display} text-lg`}>Bathukamma Studio</p><p className="text-xs text-stone-400">బతుకమ్మ · a living festival of Telangana</p></div>
      </header>
      {children}
      <footer className="mt-10 px-4 pb-4 text-center text-xs text-stone-500">Traditions vary by village and family. This studio celebrates the common thread.</footer>
      <div className="ikat" />
    </div>
  );
}
