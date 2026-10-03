export type Avatar = {
  skin: number; hair: "braid" | "bun" | "twin" | "open" | "short";
  outfit: "langa" | "pavadai" | "lehenga" | "saree" | "churidar" | "kurta"; palette: number; acc: string[];
};
export type Ring = { flower: string; color: string; alt: boolean };
export type Design = { rings: Ring[]; apex: "gauramma" | "lotus" | "diya" };
export type Me = { id: string; name: string; avatar: Avatar };
export type Player = { name: string; avatar: Avatar; design: Design; ready: boolean };
export type Phase = "lobby" | "build" | "celebrate" | "immerse";
export type Room = { phase: Phase; host: string; players: Record<string, Player> };
