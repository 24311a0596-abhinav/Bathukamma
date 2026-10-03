import type { Avatar, Design } from "./types";
import { PALETTES, SKINS } from "./data";

const angles = (n: number) => Array.from({ length: n }, (_, i) => (i * 360) / n);

function Flower({ t, c, s, x, y, r }: { t: string; c: string; s: number; x: number; y: number; r: number }) {
  let body;
  if (t === "tangedi") body = angles(5).map((a) => <ellipse key={a} cx={s * 0.3} rx={s * 0.3} ry={s * 0.17} transform={`rotate(${a})`} fill={c} />);
  else if (t === "gunugu") body = angles(6).map((a) => <circle key={a} cx={s * 0.26} r={s * 0.2} transform={`rotate(${a})`} fill={c} opacity={0.92} />);
  else if (t === "banthi") body = [
    ...angles(8).map((a) => <ellipse key={a} cx={s * 0.3} rx={s * 0.28} ry={s * 0.15} transform={`rotate(${a})`} fill={c} />),
    ...angles(8).map((a) => <ellipse key={"i" + a} cx={s * 0.17} rx={s * 0.18} ry={s * 0.1} transform={`rotate(${a + 22.5})`} fill={c} stroke="#0003" strokeWidth={0.4} />),
  ];
  else body = angles(14).map((a) => <ellipse key={a} cx={s * 0.3} rx={s * 0.3} ry={s * 0.06} transform={`rotate(${a})`} fill={c} />);
  return <g transform={`translate(${x} ${y}) rotate(${r})`}>{body}<circle r={s * 0.13} fill={t === "gunugu" ? "#fff" : "#8a4b08"} /></g>;
}

/** Side view: tiers stacked bottom (wide) to top (narrow) forming a triangle. rings[0] is the bottom tier. */
export function BathukammaArt({ design, className = "", plain = false }: { design: Design; className?: string; plain?: boolean }) {
  const n = design.rings.length, tierH = 250 / n, s = Math.min(26, tierH * 0.8), rows = tierH > 34 ? 2 : 1;
  const hw = (y: number) => (135 * (y - 10)) / 290;
  return (
    <svg viewBox="0 0 300 340" width="300" height="340" className={`h-auto ${className}`} role="img" aria-label="Bathukamma" {...(plain ? {} : { "data-bk": "1" })}>
      <ellipse cx="150" cy="314" rx="150" ry="16" fill="#8a5a12" /><ellipse cx="150" cy="310" rx="146" ry="14" fill="#D9A431" /><ellipse cx="150" cy="308" rx="120" ry="9" fill="#F0C75E" />
      {[...design.rings].map((_, k) => n - 1 - k).map((i) => {
        const ring = design.rings[i], yb = 300 - i * tierH, yt = yb - tierH;
        return (
          <g key={i}>
            <polygon points={`${150 - hw(yb) - 5},${yb + 5} ${150 + hw(yb) + 5},${yb + 5} ${150 + hw(yt) + 2},${yt} ${150 - hw(yt) - 2},${yt}`} fill="#2f7d3b" />
            {Array.from({ length: rows }, (_, r) => {
              const y = yb - (tierH * (r + 0.5)) / rows, w = hw(y) - s * 0.2, count = Math.max(2, Math.round((2 * w) / (s * 0.82)));
              return Array.from({ length: count }, (_, k) => {
                const x = -w + ((k + 0.5 + (r % 2) * 0.5) * 2 * w) / count;
                if (Math.abs(x) > w + s * 0.2) return null;
                return <Flower key={`${r}-${k}`} t={ring.flower} c={ring.alt && (k + r) % 2 ? "#FFF6D6" : ring.color} s={s} x={150 + x} y={y} r={(k * 41 + r * 17) % 360} />;
              });
            })}
          </g>
        );
      })}
      {design.apex === "gauramma" && <><path d="M150 14 L166 54 L134 54Z" fill="#FFC107" /><path d="M150 14 L166 54 L150 54Z" fill="#F29D00" /><circle cx="150" cy="38" r="3" fill="#C2185B" /><Flower t="tangedi" c="#FFEB3B" s={16} x={150} y={12} r={0} /></>}
      {design.apex === "lotus" && <g transform="translate(150 38)">{[-50, -25, 0, 25, 50].map((a) => <ellipse key={a} cy="-14" rx="6" ry="14" transform={`rotate(${a})`} fill="#F48FB1" stroke="#fff" strokeWidth=".8" />)}</g>}
      {design.apex === "diya" && <><ellipse cx="150" cy="48" rx="16" ry="7" fill="#C2762E" /><path d="M150 14 C142 26 144 36 150 40 C156 36 158 26 150 14Z" fill="#FFB300" /><path d="M150 24 C147 30 148 35 150 36 C152 35 153 30 150 24Z" fill="#FFF59D" /></>}
    </svg>
  );
}

export function AvatarArt({ a, className = "" }: { a: Avatar; className?: string }) {
  const skin = SKINS[a.skin] ?? SKINS[1], p = PALETTES[a.palette] ?? PALETTES[0], o = a.outfit, hair = a.hair ?? "braid";
  const has = (k: string) => a.acc.includes(k), H = "#2b1a12", HL = "#5b3a2c", G = "#F7D774";
  const skirt = o === "langa" || o === "pavadai" || o === "lehenga";
  const hx = o === "langa" ? 24 : 18, slope = (40 - hx) / 52, xl = (y: number) => 40 - (y - 112) * slope;
  const by = o === "pavadai" ? 146 : o === "lehenga" ? 152 : 156;
  const braid = (pts: number[][]) => <g>{pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={6 - i * 0.4} fill={H} stroke={HL} strokeWidth=".8" />)}<ellipse cx={pts[3][0]} cy={pts[3][1] + 7} rx="3.5" ry="2.6" fill="#D81B60" /></g>;
  return (
    <svg viewBox="0 0 120 180" className={className} role="img" aria-label="Avatar">
      {hair === "open" && <path d="M27 54 Q27 12 60 12 Q93 12 93 54 L99 118 Q60 134 21 118Z" fill={H} />}
      {hair === "bun" && <circle cx="60" cy="15" r="13" fill={H} stroke={HL} strokeWidth="1.5" />}
      {hair === "short" && <path d="M28 54 Q28 14 60 14 Q92 14 92 54 L94 82 Q76 76 60 76 Q44 76 26 82Z" fill={H} />}
      {skirt && <><path d={`M40 112 L80 112 L${120 - hx} 164 L${hx} 164Z`} fill={p.main} />
        <path d={`M${xl(by)} ${by} L${120 - xl(by)} ${by} L${120 - hx} 164 L${hx} 164Z`} fill={p.trim} />
        <path d={`M${xl(by + 4)} ${by + 4} L${120 - xl(by + 4)} ${by + 4}`} stroke={G} strokeWidth="1.6" />
        {o !== "langa" && [[50, 126], [70, 132], [58, 142], [78, 144], [42, 140]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="1.6" fill={G} />)}</>}
      {o === "saree" && <><path d="M42 112 L78 112 L84 164 L36 164Z" fill={p.main} /><path d="M36 154 L84 154 L84 164 L36 164Z" fill={p.trim} />
        {[50, 58, 66].map((x) => <path key={x} d={`M${x} 118 L${x - 2} 164`} stroke={G} strokeWidth=".8" opacity=".7" />)}</>}
      {o === "churidar" && <><rect x="45" y="136" width="13" height="30" rx="6" fill="#FFF3E0" /><rect x="62" y="136" width="13" height="30" rx="6" fill="#FFF3E0" /><rect x="45" y="158" width="13" height="3" fill={G} /><rect x="62" y="158" width="13" height="3" fill={G} />
        <path d="M40 90 L80 90 L86 142 L34 142Z" fill={p.main} /><path d="M34 134 L86 134 L86 142 L34 142Z" fill={p.trim} /></>}
      {o === "kurta" && <><rect x="46" y="130" width="12" height="36" rx="5" fill={p.trim} /><rect x="62" y="130" width="12" height="36" rx="5" fill={p.trim} />
        <path d="M40 90 L80 90 L84 140 L36 140Z" fill={p.main} /><path d="M60 90 L60 140" stroke={G} strokeWidth="1.4" /></>}
      <ellipse cx="50" cy="169" rx="7.5" ry="4" fill="#7a1f1f" /><ellipse cx="70" cy="169" rx="7.5" ry="4" fill="#7a1f1f" />
      <rect x="55" y="80" width="10" height="12" fill={skin} />
      {(skirt || o === "saree") && <><path d="M41 92 Q60 84 79 92 L81 116 L39 116Z" fill={p.blouse} /><path d="M50 89 Q60 100 70 89" stroke={G} strokeWidth="1.6" fill="none" /></>}
      {o === "langa" && <path d="M42 88 L54 88 L84 120 L88 158 L74 158 L72 126Z" fill={p.accent} stroke={G} strokeWidth="1.2" opacity=".95" />}
      {o === "saree" && <path d="M42 88 L54 88 L84 120 L90 150 L76 152 L72 126Z" fill={p.accent} stroke={G} strokeWidth="1.2" />}
      {o === "lehenga" && <path d="M42 90 Q60 114 78 90 L82 98 Q60 128 38 98Z" fill={p.accent} opacity=".85" />}
      {o === "churidar" && <path d="M42 90 Q60 118 80 92 L82 100 Q60 130 40 98Z" fill={p.accent} stroke={G} strokeWidth="1" />}
      <path d="M43 95 L33 123 M77 95 L87 123" stroke={skin} strokeWidth="7" strokeLinecap="round" />
      <circle cx="42" cy="95" r="6.5" fill={o === "kurta" || o === "churidar" ? p.main : p.blouse} /><circle cx="78" cy="95" r="6.5" fill={o === "kurta" || o === "churidar" ? p.main : p.blouse} />
      <circle cx="32" cy="125" r="4.6" fill={skin} /><circle cx="88" cy="125" r="4.6" fill={skin} />
      {has("bangles") && <g fill="none" stroke={G} strokeWidth="1.8"><circle cx="33" cy="119" r="4.4" /><circle cx="87" cy="119" r="4.4" /></g>}
      {has("haaram") && <g><path d="M47 89 Q60 112 73 89" stroke={G} strokeWidth="1.6" fill="none" /><circle cx="60" cy="104" r="3" fill="#C2185B" stroke={G} /></g>}
      <circle cx="31" cy="60" r="5" fill={skin} /><circle cx="89" cy="60" r="5" fill={skin} /><circle cx="60" cy="54" r="29" fill={skin} />
      <ellipse cx="49" cy="58" rx="5.2" ry="6.8" fill="#2b1a12" /><ellipse cx="71" cy="58" rx="5.2" ry="6.8" fill="#2b1a12" />
      <circle cx="51" cy="55" r="2.2" fill="#fff" /><circle cx="73" cy="55" r="2.2" fill="#fff" /><circle cx="47.5" cy="61" r="1.1" fill="#fff" /><circle cx="69.5" cy="61" r="1.1" fill="#fff" />
      <path d="M43 50 Q49 46 55 49 M65 49 Q71 46 77 50" stroke={H} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="40" cy="68" rx="5.5" ry="3.2" fill="#FF7B93" opacity=".5" /><ellipse cx="80" cy="68" rx="5.5" ry="3.2" fill="#FF7B93" opacity=".5" />
      <path d="M55 69 Q60 75 65 69Z" fill="#D9534F" /><path d="M58.5 65 Q60 66.5 61.5 65" stroke="#b07a5a" strokeWidth="1.2" fill="none" />
      <path d="M30 56 Q27 18 60 18 Q93 18 90 56 Q84 36 60 34 Q36 36 30 56Z" fill={H} /><path d="M60 18 L60 34" stroke={HL} strokeWidth="1.4" />
      {hair === "braid" && braid([[86, 84], [89, 96], [90, 108], [90, 120]])}
      {hair === "twin" && <>{braid([[32, 84], [29, 96], [28, 108], [28, 120]])}{braid([[88, 84], [91, 96], [92, 108], [92, 120]])}</>}
      {has("gajra") && <g fill="#fff" stroke="#d8d8d8" strokeWidth=".6">{[[36, 36], [42, 29], [50, 24], [60, 22], [70, 24], [78, 29], [84, 36]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2.8" />)}</g>}
      {has("tikka") && <g><path d="M60 22 L60 38" stroke={G} strokeWidth="1.2" /><circle cx="60" cy="40" r="2.4" fill="#C2185B" stroke={G} strokeWidth=".8" /></g>}
      {has("bindi") && <circle cx="60" cy="46" r="2" fill="#D81B60" />}
      {has("mukkera") && <circle cx="56.5" cy="67" r="1.7" fill="none" stroke={G} strokeWidth="1" />}
      {has("jhumka") && <g fill={G}><circle cx="30" cy="68" r="2.4" /><path d="M27.5 70 h5 l-2.5 8z" /><circle cx="90" cy="68" r="2.4" /><path d="M87.5 70 h5 l-2.5 8z" /></g>}
    </svg>
  );
}
