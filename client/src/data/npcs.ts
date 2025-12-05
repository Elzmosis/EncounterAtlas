import { Character } from "@/data/characters";

export const initialNpcs: Character[] = [
  {
    id: "npc-1",
    name: "Sildar Hallwinter",
    race: "Human",
    class: "Fighter",
    level: 3,
    imageUrl: "https://images.unsplash.com/photo-1535581652167-3d6b98c09a5d?q=80&w=300&auto=format&fit=crop",
    bio: "A member of the Lords' Alliance, Sildar is a man of honor and duty. He seeks to restore order to Phandalin.",
    stats: { str: 16, dex: 10, con: 14, int: 10, wis: 12, cha: 14 }
  },
  {
    id: "npc-2",
    name: "Reidoth",
    race: "Human",
    class: "Druid",
    level: 4,
    imageUrl: "https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?q=80&w=300&auto=format&fit=crop",
    bio: "An old druid who watches over the ruins of Thundertree. He knows the secrets of the forest and the dragon's lair.",
    stats: { str: 10, dex: 12, con: 14, int: 14, wis: 18, cha: 10 }
  },
  {
    id: "npc-3",
    name: "Halia Thornton",
    race: "Human",
    class: "Commoner",
    level: 1,
    imageUrl: "https://images.unsplash.com/photo-1618488032598-558b9c899263?q=80&w=300&auto=format&fit=crop",
    bio: "The ambitious guildmaster of the Phandalin Miner's Exchange. She has her own agenda and a keen mind for business.",
    stats: { str: 10, dex: 14, con: 10, int: 14, wis: 12, cha: 16 }
  }
];
