import { useEffect, useState } from "react";
import { AvatarArt, BathukammaArt } from "./art";
import { ACCS, APEX, COLORS, DAYS, FACTS, FLOWERS, HAIR, OUTFITS, PALETTES, SKINS, defaultAvatar, defaultDesign } from "./data";
import { Heritage, NineDays, Ritual } from "./culture";
import { checkConnection, createRoom, explain, joinRoom, setDesign, setPhase, setReady } from "./room";
import type { Avatar, Design, Me, Phase, Ring, Room } from "./types";
import { btnGhost, btnPrimary, chip, display, eyebrow, panel } from "./ui";

const rid = () => Math.random().toString(36).slice(2, 10);
const rnd = (i: number) => { const x = Math.sin(i * 127.1) * 43758.5453; return x - Math.floor(x); };
const sw = (on: boolean) => `h-9 w-9 rounded-full ring-2 transition ${on ? "ring-amber-300 scale-110" : "ring-white/30"}`;

function Options({ items, cur, set }: { items: readonly { id: string; label: string }[]; cur: string; set: (v: string) => void }) {
  return <div className="flex flex-wrap gap-2">{items.map((o) => <button key={o.id} onClick={() => set(o.id)} className={chip(cur === o.id)}>{o.label}</button>)}</div>;
}

export function Welcome({ initial, onDone }: { initial: Me | null; onDone: (m: Me) => void }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [av, setAv] = useState<Avatar>({ ...defaultAvatar, ...initial?.avatar });
  const [tab, setTab] = useState(0);
  const up = (p: Partial<Avatar>) => setAv({ ...av, ...p });
  const tabs = ["Hair", "Outfit", "Colour", "Jewellery"];
  return (
    <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-6 grid md:grid-cols-[1fr_1.1fr] gap-6 items-center">
      <div className={`${panel} p-6 text-center`}>
        <div className="mx-auto w-52 sm:w-64 rounded-full bg-[radial-gradient(circle,rgba(232,176,74,.35),transparent_70%)] p-4 sway"><AvatarArt a={av} /></div>
        <p className={`${display} mt-2 text-2xl`}>{name || "Your name"}</p>
      </div>
      <div className={`${panel} p-6 space-y-5`}>
        <div><p className={eyebrow}>Step 1 · Your character</p><h2 className={`${display} text-2xl`}>Dress for the festival</h2></div>
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={14} placeholder="Your name" aria-label="Your name" className="w-full rounded-full bg-black/30 px-5 py-3 ring-1 ring-white/20 outline-none focus:ring-amber-300" />
        <div className="flex items-center gap-2"><span className="text-sm text-stone-400 mr-1">Skin</span>{SKINS.map((s, i) => <button key={s} aria-label={`Skin tone ${i + 1}`} onClick={() => up({ skin: i })} style={{ background: s }} className={sw(av.skin === i)} />)}</div>
        <div className="flex gap-1 border-b border-white/10">{tabs.map((t, i) => <button key={t} onClick={() => setTab(i)} className={`px-3 py-2 text-sm ${tab === i ? "border-b-2 border-amber-300 text-amber-300" : "text-stone-400"}`}>{t}</button>)}</div>
        {tab === 0 && <Options items={HAIR} cur={av.hair} set={(v) => up({ hair: v as Avatar["hair"] })} />}
        {tab === 1 && <Options items={OUTFITS} cur={av.outfit} set={(v) => up({ outfit: v as Avatar["outfit"] })} />}
        {tab === 2 && <div className="flex flex-wrap gap-3">{PALETTES.map((p, i) => <button key={p.name} title={p.name} aria-label={p.name} onClick={() => up({ palette: i })} style={{ background: `linear-gradient(135deg,${p.main} 50%,${p.blouse} 50%)` }} className={sw(av.palette === i)} />)}</div>}
        {tab === 3 && <div className="flex flex-wrap gap-2">{ACCS.map((a) => <button key={a.id} onClick={() => up({ acc: av.acc.includes(a.id) ? av.acc.filter((x) => x !== a.id) : [...av.acc, a.id] })} className={chip(av.acc.includes(a.id))}>{a.label}</button>)}</div>}
        <button disabled={!name.trim()} onClick={() => onDone({ id: initial?.id ?? rid(), name: name.trim(), avatar: av })} className={`${btnPrimary} w-full`}>Continue</button>
      </div>
    </main>
  );
}

export function Home({ me, onEnter, onEdit }: { me: Me; onEnter: (c: string) => void; onEdit: () => void }) {
  const [code, setCode] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const [conn, setConn] = useState<string | null | undefined>(undefined);
  useEffect(() => { checkConnection().then(setConn); }, []);
  const run = async (f: () => Promise<string>) => {
    setBusy(true); setErr("");
    try { onEnter(await f()); } catch (e) { setErr(explain(e)); } finally { setBusy(false); }
  };
  return (
    <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6 space-y-14">
      <section className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
        <div className="space-y-4">
          <p className={eyebrow}>Telangana state festival</p>
          <h1 className={`${display} text-5xl sm:text-7xl leading-[1.02]`}>బతుకమ్మ<span className="block text-2xl sm:text-3xl font-medium text-amber-200 mt-2">Mother Goddess, come alive.</span></h1>
          <p className="max-w-xl text-stone-300">Build a tiered Bathukamma with friends, circle it in song, and float it on a moonlit lake. Every step carries the meaning it has held in Telangana for generations.</p>
          <p className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1 ${conn === null ? "ring-emerald-400/50 text-emerald-300" : conn === undefined ? "ring-white/20 text-stone-400" : "ring-rose-400/60 text-rose-300"}`}>
            <span className={`h-2 w-2 rounded-full ${conn === null ? "bg-emerald-400" : conn === undefined ? "bg-stone-500" : "bg-rose-400"}`} />
            {conn === undefined ? "Checking live sync…" : conn === null ? "Live sync connected" : conn}
          </p>
        </div>
        <div className={`${panel} p-5 space-y-4`}>
          <div className="flex items-center gap-3"><div className="w-16"><AvatarArt a={me.avatar} /></div><div className="flex-1"><p className="text-xs text-stone-400">Namaste</p><p className={`${display} text-xl`}>{me.name}</p></div><button onClick={onEdit} className={`${btnGhost} !px-4 !py-2`}>Edit look</button></div>
          <button disabled={busy} onClick={() => run(() => createRoom(me))} className={`${btnPrimary} w-full`}>Create a room</button>
          <div className="flex gap-2">
            <input value={code} inputMode="numeric" maxLength={4} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} placeholder="4-digit code" aria-label="Room code" className="min-w-0 flex-1 rounded-full bg-black/30 px-5 py-3 text-center tracking-[.3em] ring-1 ring-white/20 outline-none focus:ring-amber-300" />
            <button disabled={busy || code.length !== 4} onClick={() => run(() => joinRoom(code, me))} className={btnGhost}>Join</button>
          </div>
          {err && <p role="alert" className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-200">{err}</p>}
        </div>
      </section>
      <NineDays /><Heritage />
    </main>
  );
}

function Lobby({ room, code, isHost }: { room: Room; code: string; isHost: boolean }) {
  const list = Object.entries(room.players);
  return (
    <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-4 space-y-10">
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-5">
        <div className={`${panel} p-6 text-center`}>
          <p className={eyebrow}>Room code</p><p className={`${display} text-6xl tracking-[.2em] text-amber-300`}>{code}</p>
          <button onClick={() => navigator.clipboard?.writeText(code)} className={`${btnGhost} mt-3 !py-2`}>Copy code</button>
          <div className="mt-5">{isHost ? <button onClick={() => setPhase(code, "build")} className={`${btnPrimary} w-full`}>Start building</button> : <p className="text-sm text-stone-400">Waiting for the host to begin…</p>}</div>
        </div>
        <div className={`${panel} p-6`}>
          <h2 className={`${display} text-xl mb-3`}>In the circle ({list.length})</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {list.map(([id, p], i) => <div key={id} className="text-center"><div className="mx-auto w-20 sway" style={{ animationDelay: `${i * 0.3}s` }}><AvatarArt a={p.avatar} /></div><p className="text-sm font-semibold">{p.name}{id === room.host ? " · host" : ""}</p></div>)}
          </div>
        </div>
      </div>
      <Ritual />
    </main>
  );
}

function Builder({ room, me, code, isHost }: { room: Room; me: Me; code: string; isHost: boolean }) {
  const mine = room.players[me.id];
  const [d, setD] = useState<Design>(mine?.design ?? defaultDesign);
  const [sel, setSel] = useState(0);
  const push = (nd: Design) => { setD(nd); setDesign(code, me.id, nd).catch(() => {}); };
  const i = Math.min(sel, d.rings.length - 1), ring = d.rings[i], day = DAYS[i], fl = FLOWERS.find((f) => f.id === ring.flower)!;
  const setRing = (p: Partial<Ring>) => push({ ...d, rings: d.rings.map((r, k) => (k === i ? { ...r, ...p } : r)) });
  const others = Object.entries(room.players).filter(([id]) => id !== me.id);
  const allReady = Object.values(room.players).every((p) => p.ready);
  return (
    <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-4 grid lg:grid-cols-[250px_1fr_340px] gap-4">
      <aside className={`${panel} p-4 h-fit order-2 lg:order-1`}>
        <p className={eyebrow}>Your stack</p>
        <ul className="mt-3 space-y-1.5">
          {[...d.rings].map((r, k) => k).reverse().map((k) => (
            <li key={k}><button onClick={() => setSel(k)} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm ring-1 ${k === i ? "bg-amber-300/15 ring-amber-300" : "ring-white/10 hover:bg-white/5"}`}>
              <span className="h-3 w-3 rounded-full" style={{ background: d.rings[k].color }} /><span className="flex-1 truncate">Tier {k + 1} · {FLOWERS.find((f) => f.id === d.rings[k].flower)?.label}</span></button></li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2">
          <button disabled={d.rings.length >= 9} onClick={() => { push({ ...d, rings: [...d.rings, { flower: "tangedi", color: "#FFC107", alt: false }] }); setSel(d.rings.length); }} className={`${btnGhost} flex-1 !px-3 !py-2`}>Add tier</button>
          <button disabled={d.rings.length <= 3} onClick={() => { push({ ...d, rings: d.rings.slice(0, -1) }); setSel(0); }} className={`${btnGhost} flex-1 !px-3 !py-2`}>Remove top</button>
        </div>
        <p className="mt-3 text-xs text-stone-400">Up to nine tiers, one for each day of the festival.</p>
      </aside>
      <section className="space-y-4 order-1 lg:order-2">
        <div className={`${panel} p-4 text-center bg-[radial-gradient(ellipse_at_50%_40%,rgba(232,176,74,.18),transparent_70%)]`}>
          <BathukammaArt design={d} className="mx-auto w-full max-w-sm drop-shadow-[0_10px_30px_rgba(0,0,0,.5)]" />
          <p className="text-sm text-stone-400">{d.rings.length} tiers · friends see your stack update live</p>
        </div>
        {others.length > 0 && <div className={`${panel} p-4`}><p className={eyebrow}>Friends</p><div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">{others.map(([id, p]) => <div key={id} className="text-center"><BathukammaArt design={p.design} plain className="w-full" /><p className="text-xs">{p.name} · {p.ready ? "ready" : "building"}</p></div>)}</div></div>}
      </section>
      <aside className={`${panel} p-4 space-y-4 h-fit order-3`}>
        <div><p className={eyebrow}>Day {i + 1}</p><h3 className="font-semibold">{day.name}</h3><p className="text-sm text-stone-400">{day.te}</p><p className="mt-1 text-sm text-stone-300">{day.note}</p></div>
        <div><p className="mb-2 text-sm font-semibold">Flower</p><div className="grid grid-cols-2 gap-2">{FLOWERS.map((f) => <button key={f.id} onClick={() => setRing({ flower: f.id })} className={chip(ring.flower === f.id)}>{f.label} · {f.te}</button>)}</div><p className="mt-2 text-xs text-stone-400">{fl.meaning}</p></div>
        <div><p className="mb-2 text-sm font-semibold">Colour</p><div className="flex flex-wrap gap-2">{COLORS.map((c) => <button key={c} aria-label={c} onClick={() => setRing({ color: c })} style={{ background: c }} className={sw(ring.color === c)} />)}</div></div>
        <div className="flex gap-2"><button onClick={() => setRing({ alt: false })} className={chip(!ring.alt)}>Plain</button><button onClick={() => setRing({ alt: true })} className={chip(ring.alt)}>Alternating</button></div>
        <div><p className="mb-2 text-sm font-semibold">Crown</p><div className="flex flex-wrap gap-2">{APEX.map((a) => <button key={a.id} onClick={() => push({ ...d, apex: a.id })} className={chip(d.apex === a.id)}>{a.label}</button>)}</div><p className="mt-2 text-xs text-stone-400">{APEX.find((a) => a.id === d.apex)?.meaning}</p></div>
        <button onClick={() => setReady(code, me.id, !mine?.ready)} className={`${mine?.ready ? btnGhost : btnPrimary} w-full`}>{mine?.ready ? "Ready (tap to edit)" : "I'm ready"}</button>
        {isHost ? <button disabled={!allReady} onClick={() => setPhase(code, "celebrate")} className={`${btnPrimary} w-full`}>{allReady ? "Begin the celebration" : "Waiting for everyone…"}</button> : <p className="text-center text-xs text-stone-400">The host begins once everyone is ready.</p>}
      </aside>
    </main>
  );
}

function Celebrate({ room, code }: { room: Room; code: string }) {
  const list = Object.entries(room.players), n = list.length;
  const [f, setF] = useState(0);
  useEffect(() => { const t = setInterval(() => setF((x) => (x + 1) % FACTS.length), 6000); return () => clearInterval(t); }, []);
  return (
    <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-4 space-y-4 text-center">
      <div><p className={eyebrow}>Kolatam · కోలాటం</p><h2 className={`${display} text-3xl`}>ఉయ్యాలో ఉయ్యాలో</h2></div>
      <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-amber-300/30 bg-[radial-gradient(ellipse_at_50%_75%,#7a2a55,#2a0f33_70%)]">
        <div className="absolute inset-x-[6%] top-[40%] bottom-[6%] rounded-[50%] border border-amber-300/50 bg-[repeating-radial-gradient(ellipse,transparent_0_14px,rgba(232,176,74,.18)_14px_16px)]" />
        {list.map(([id, p], k) => (
          <div key={"b" + id} className="absolute w-[24%] -translate-x-1/2 -translate-y-full" style={{ left: `${50 + (k - (n - 1) / 2) * 17}%`, top: "64%", zIndex: 6 }}><BathukammaArt design={p.design} plain className="w-full drop-shadow-xl" /></div>
        ))}
        {list.map(([id, p], k) => {
          const a = (k / n) * 2 * Math.PI + Math.PI / 2, y = 66 + 24 * Math.sin(a);
          return (
            <div key={id} className="absolute w-[15%] -translate-x-1/2 -translate-y-full sway" style={{ left: `${50 + 40 * Math.cos(a)}%`, top: `${y}%`, zIndex: y > 66 ? 9 : 3, animationDelay: `${k * 0.35}s` }}>
              <AvatarArt a={p.avatar} /><span className="block truncate text-[10px] sm:text-xs font-semibold">{p.name}</span>
            </div>
          );
        })}
      </div>
      <p className={`${panel} mx-auto max-w-2xl px-5 py-3 text-sm text-stone-200`}>{FACTS[f]}</p>
      <button onClick={() => setPhase(code, "immerse")} className={btnPrimary}>Float them on the lake</button>
    </main>
  );
}

async function saveStory(names: string) {
  const W = 1080, H = 1920, c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d")!, bg = g.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#0b1030"); bg.addColorStop(0.55, "#2a1550"); bg.addColorStop(1, "#081433"); g.fillStyle = bg; g.fillRect(0, 0, W, H);
  g.fillStyle = "#FFF8DC"; g.shadowColor = "#fff8c8"; g.shadowBlur = 90; g.beginPath(); g.arc(830, 330, 90, 0, 7); g.fill(); g.shadowBlur = 0;
  g.fillStyle = "rgba(20,50,110,.75)"; g.fillRect(0, 1000, W, 920);
  const svgs = [...document.querySelectorAll<SVGSVGElement>("svg[data-bk]")], cols = Math.min(Math.max(svgs.length, 1), 3), w = Math.min(440, (W - 100) / cols);
  for (let i = 0; i < svgs.length; i++) {
    const img = new Image(); img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svgs[i])); await img.decode();
    g.drawImage(img, W / 2 - (cols * w) / 2 + (i % cols) * w, 1060 + Math.floor(i / cols) * 480, w, (w * 340) / 300);
  }
  g.fillStyle = "#fff"; g.textAlign = "center"; g.shadowColor = "#ffb300"; g.shadowBlur = 24;
  g.font = "700 120px 'Noto Serif Telugu', serif"; g.fillText("బతుకమ్మ", W / 2, 520);
  g.shadowBlur = 0; g.font = "500 44px Inter, sans-serif"; g.fillText("Go safely, Bathukamma. Come again.", W / 2, 600);
  g.fillStyle = "rgba(255,255,255,.75)"; g.font = "400 36px Inter, sans-serif"; g.fillText(names, W / 2, 1880);
  const a = document.createElement("a"); a.href = c.toDataURL("image/png"); a.download = "bathukamma-story.png"; a.click();
}

function Immerse({ room, code, isHost }: { room: Room; code: string; isHost: boolean }) {
  const list = Object.entries(room.players), n = list.length, names = list.map(([, p]) => p.name).join(" · ");
  const [go, setGo] = useState(false); const [msg, setMsg] = useState(false);
  useEffect(() => { const a = setTimeout(() => setGo(true), 150), b = setTimeout(() => setMsg(true), 5000); return () => { clearTimeout(a); clearTimeout(b); }; }, []);
  return (
    <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-4 space-y-4">
      <div className="relative min-h-[78vh] overflow-hidden rounded-3xl ring-1 ring-amber-300/30 bg-gradient-to-b from-[#0b1030] via-[#1c2a64] to-[#0a1a3a]">
        {Array.from({ length: 36 }, (_, k) => <span key={k} className="twinkle absolute rounded-full bg-white" style={{ left: `${rnd(k) * 100}%`, top: `${rnd(k + 50) * 38}%`, width: 1 + rnd(k + 9) * 2, height: 1 + rnd(k + 9) * 2, animationDelay: `${rnd(k + 3) * 3}s` }} />)}
        <div className="absolute right-[10%] top-[6%] h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-[#FFF8DC] shadow-[0_0_60px_20px_rgba(255,248,200,.5)]" />
        <svg className="absolute bottom-[46%] left-[3%] w-36 sm:w-52 h-auto" viewBox="0 0 120 90" aria-label="Charminar silhouette"><g fill="#070b22"><rect x="30" y="38" width="60" height="52" /><path d="M42 90 V62 a18 18 0 0 1 36 0 V90Z" fill="#1c2a64" /><rect x="22" y="14" width="9" height="76" /><rect x="89" y="14" width="9" height="76" /><rect x="35" y="28" width="6" height="12" /><rect x="79" y="28" width="6" height="12" /><path d="M22 14 q4.5 -12 9 0Z M89 14 q4.5 -12 9 0Z M35 28 q3 -9 6 0Z M79 28 q3 -9 6 0Z" /><path d="M52 38 q8 -16 16 0Z" /></g></svg>
        <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-b from-[#1a3a7a] to-[#081433]"><div className="absolute right-[10%] top-0 h-full w-12 sm:w-16 bg-gradient-to-b from-[#FFF8DC]/50 to-transparent blur-md" /></div>
        {Array.from({ length: 10 }, (_, k) => <span key={k} className="drift absolute text-xl drop-shadow-[0_0_8px_#ffb300]" style={{ left: `${4 + rnd(k + 100) * 90}%`, top: `${54 + rnd(k + 200) * 40}%`, animationDelay: `${rnd(k) * 4}s` }}>🪔</span>)}
        {list.map(([id, p], k) => {
          const left = 14 + (72 / n) * (k + 0.5), top = 80 + (k % 2) * 6;
          return (
            <div key={id} className="absolute w-[30%] sm:w-[19%] -translate-x-1/2 -translate-y-full transition-all duration-[5000ms] ease-out" style={{ left: `${left}%`, top: go ? `${top}%` : "125%", opacity: go ? 1 : 0.2 }}>
              <div className="bob" style={{ animationDelay: `${k * 0.6}s` }}><BathukammaArt design={p.design} className="w-full drop-shadow-[0_0_16px_rgba(255,200,80,.55)]" />
                <div className="pointer-events-none -mt-3 opacity-25 blur-[2px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" style={{ transform: "scaleY(-1)" }}><BathukammaArt design={p.design} plain className="w-full" /></div></div>
              <span className="ripple absolute inset-x-0 bottom-[2%] mx-auto h-6 w-full rounded-full border border-white/50" style={{ animationDelay: `${k * 0.5}s` }} />
              <p className="absolute -bottom-5 w-full text-center text-xs font-semibold text-white/85">{p.name}</p>
            </div>
          );
        })}
        <div className={`pointer-events-none absolute inset-x-0 top-[14%] px-4 text-center transition-opacity duration-[2500ms] ${msg ? "opacity-100" : "opacity-0"}`}>
          <p className="font-display text-3xl sm:text-5xl font-bold drop-shadow-[0_0_18px_#ffb300]">పోయి రావమ్మ, మళ్ళీ రావమ్మ</p>
          <p className="mt-2 text-sm sm:text-lg">Go safely, Bathukamma, and come again next year.</p>
          <p className="mt-1 text-xs text-white/70">With love from {names}</p>
        </div>
      </div>
      <div className={`${panel} p-4 text-sm text-stone-300`}><span className={eyebrow}>Why we immerse</span><p className="mt-1">{FACTS[4]} The farewell song sends the Goddess home, and the community shares the day's offerings before parting.</p></div>
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => saveStory(names)} className={btnPrimary}>Save story image</button>
        {isHost && <button onClick={() => setPhase(code, "build", list.map(([id]) => id))} className={btnGhost}>Build another round</button>}
      </div>
    </main>
  );
}

const STEPS: { p: Phase; l: string }[] = [{ p: "lobby", l: "Gather" }, { p: "build", l: "Build" }, { p: "celebrate", l: "Dance" }, { p: "immerse", l: "Immerse" }];

export function RoomView({ room, code, me, onLeave }: { room: Room; code: string; me: Me; onLeave: () => void }) {
  const isHost = room.host === me.id, at = STEPS.findIndex((s) => s.p === room.phase);
  useEffect(() => { if (!room.players[me.id]) joinRoom(code, me).catch(() => {}); }, [room, code, me]);
  return (
    <>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 text-sm">
        <ol className="flex flex-wrap items-center gap-2">{STEPS.map((s, i) => <li key={s.p} className={`rounded-full px-3 py-1 text-xs ring-1 ${i === at ? "bg-amber-300 text-stone-900 ring-amber-300 font-semibold" : i < at ? "ring-amber-300/50 text-amber-200" : "ring-white/15 text-stone-500"}`}>{i + 1} · {s.l}</li>)}</ol>
        <div className="flex items-center gap-3"><span className="rounded-full px-3 py-1 text-xs ring-1 ring-white/20">Room {code}</span><button onClick={onLeave} className="text-xs underline underline-offset-4 text-stone-400">Leave</button></div>
      </div>
      {room.phase === "lobby" && <Lobby room={room} code={code} isHost={isHost} />}
      {room.phase === "build" && <Builder room={room} me={me} code={code} isHost={isHost} />}
      {room.phase === "celebrate" && <Celebrate room={room} code={code} />}
      {room.phase === "immerse" && <Immerse room={room} code={code} isHost={isHost} />}
    </>
  );
}
