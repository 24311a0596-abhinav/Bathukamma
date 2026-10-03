import { useState } from "react";
import { Home, RoomView, Welcome } from "./screens";
import { useRoom } from "./room";
import { Shell, btnGhost, panel } from "./ui";
import type { Me } from "./types";

function Room({ code, me, onLeave }: { code: string; me: Me; onLeave: () => void }) {
  const { room, error } = useRoom(code);
  if (error) return <main className="flex-1 grid place-items-center p-4"><div className={`${panel} p-6 text-center space-y-3 max-w-md`}><p role="alert">{error}</p><button onClick={onLeave} className={btnGhost}>Back</button></div></main>;
  if (!room) return <main className="flex-1 grid place-items-center"><div className="text-center space-y-3"><p className="text-stone-300">Lighting the diyas…</p><button onClick={onLeave} className={btnGhost}>Back</button></div></main>;
  return <RoomView room={room} code={code} me={me} onLeave={onLeave} />;
}

export default function App() {
  const [me, setMe] = useState<Me | null>(() => { try { return JSON.parse(localStorage.getItem("bk-me2") ?? "null"); } catch { return null; } });
  const [code, setCode] = useState<string | null>(() => localStorage.getItem("bk-room"));
  const [editing, setEditing] = useState(false);
  const enter = (c: string | null) => { setCode(c); if (c) localStorage.setItem("bk-room", c); else localStorage.removeItem("bk-room"); };
  return (
    <Shell>
      {!me || editing ? <Welcome initial={me} onDone={(m) => { localStorage.setItem("bk-me2", JSON.stringify(m)); setMe(m); setEditing(false); }} />
        : !code ? <Home me={me} onEnter={enter} onEdit={() => setEditing(true)} />
        : <Room code={code} me={me} onLeave={() => enter(null)} />}
    </Shell>
  );
}
