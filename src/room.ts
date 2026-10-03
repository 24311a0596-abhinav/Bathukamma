import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { defaultDesign } from "./data";
import type { Design, Me, Phase, Player, Room } from "./types";

const ref = (code: string) => doc(db, "rooms", code);
const fresh = (me: Me): Player => ({ name: me.name, avatar: me.avatar, design: defaultDesign, ready: false });

export async function createRoom(me: Me): Promise<string> {
  for (let i = 0; i < 8; i++) {
    const code = String(1000 + Math.floor(Math.random() * 9000));
    if (!(await getDoc(ref(code))).exists()) {
      await setDoc(ref(code), { phase: "lobby", host: me.id, created: Date.now(), players: { [me.id]: fresh(me) } });
      return code;
    }
  }
  throw new Error("Could not create a room, please try again");
}
export async function joinRoom(code: string, me: Me): Promise<string> {
  const snap = await getDoc(ref(code));
  if (!snap.exists()) throw new Error("No room with that code");
  const old = (snap.data().players ?? {})[me.id] as Player | undefined;
  await updateDoc(ref(code), { [`players.${me.id}`]: old ? { ...old, name: me.name, avatar: me.avatar } : fresh(me) });
  return code;
}
export const setPhase = (code: string, phase: Phase, resetIds: string[] = []) => {
  const u: Record<string, unknown> = { phase };
  resetIds.forEach((id) => (u[`players.${id}.ready`] = false));
  return updateDoc(ref(code), u);
};
export const setDesign = (code: string, id: string, d: Design) => updateDoc(ref(code), { [`players.${id}.design`]: d });
export const setReady = (code: string, id: string, v: boolean) => updateDoc(ref(code), { [`players.${id}.ready`]: v });

export function useRoom(code: string) {
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setError("Cannot reach Firestore. Create the database in Firebase console, publish the rules from the README, and check the API key."), 8000);
    const off = onSnapshot(ref(code),
      (s) => { clearTimeout(t); if (s.exists()) setRoom({ phase: s.data().phase, host: s.data().host, players: s.data().players ?? {} }); else setError("This room no longer exists"); },
      (e) => { clearTimeout(t); setError(explain(e)); });
    return () => { clearTimeout(t); off(); };
  }, [code]);
  return { room, error };
}

export function explain(e: unknown): string {
  const m = e instanceof Error ? e.message : String(e), c = (e as { code?: string }).code ?? "";
  if (c.includes("permission")) return "Firestore rules are blocking access. Publish the rules from the README.";
  if (c.includes("not-found") && /database/i.test(m)) return "The Firestore database does not exist yet. Create it in Firebase console > Build > Firestore Database.";
  if (m === "timeout" || c.includes("unavailable")) return "Cannot reach Firestore. Create the database in the Firebase console and check your connection.";
  if (/api.?key/i.test(m)) return "Firebase rejected the API key. Copy it again from Project settings.";
  return m;
}
export async function checkConnection(): Promise<string | null> {
  try {
    await Promise.race([getDoc(doc(db, "rooms", "ping")), new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 7000))]);
    return null;
  } catch (e) { return explain(e); }
}
