import { DAYS, HERITAGE, RITUAL } from "./data";
import { display, eyebrow, panel } from "./ui";

export function NineDays() {
  return (
    <section className="space-y-4">
      <div><p className={eyebrow}>Nine days · తొమ్మిది రోజులు</p><h2 className={`${display} text-2xl sm:text-3xl`}>The journey of the festival</h2></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {DAYS.map((d, i) => (
          <article key={d.name} className={`${panel} p-4`}>
            <p className="text-xs text-amber-300">Day {i + 1}</p><h3 className="font-semibold">{d.name}</h3><p className="text-sm text-stone-400">{d.te}</p>
            <p className="mt-2 text-sm text-stone-300">{d.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Heritage() {
  return (
    <section className="space-y-4">
      <div><p className={eyebrow}>Heritage · వారసత్వం</p><h2 className={`${display} text-2xl sm:text-3xl`}>The land behind the festival</h2></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {HERITAGE.map((h) => <article key={h.t} className={`${panel} p-4`}><h3 className="font-semibold">{h.t}</h3><p className="text-sm text-stone-400">{h.te}</p><p className="mt-2 text-sm text-stone-300">{h.d}</p></article>)}
      </div>
    </section>
  );
}
export function Ritual() {
  return (
    <section className="space-y-4">
      <div><p className={eyebrow}>Meaning · ఆధ్యాత్మికత</p><h2 className={`${display} text-2xl sm:text-3xl`}>Each step has a purpose</h2></div>
      <ol className="grid gap-3">
        {RITUAL.map((r, i) => (
          <li key={r.t} className={`${panel} p-4 flex gap-4`}><span className={`${display} text-3xl text-amber-300/80`}>{i + 1}</span><div><h3 className="font-semibold">{r.t}</h3><p className="text-sm text-stone-300">{r.d}</p></div></li>
        ))}
      </ol>
    </section>
  );
}
