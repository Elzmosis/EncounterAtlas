export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  imageUrl: string;
  bio: string;
  stats: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
}

export const initialCharacters: Character[] = [
  {
    id: "1",
    name: "Thorgar Ironbreaker",
    race: "Dwarf",
    class: "Paladin",
    level: 5,
    imageUrl: "https://images.unsplash.com/photo-1559429734-2297d730b86f?q=80&w=300&auto=format&fit=crop", 
    bio: "A stoic defender of the weak, Thorgar seeks to reclaim his lost clan heritage. He wields the hammer of his ancestors with divine fury.",
    stats: { str: 16, dex: 10, con: 14, int: 10, wis: 12, cha: 14 }
  },
  {
    id: "2",
    name: "Elara Moonwhisper",
    race: "Elf",
    class: "Wizard",
    level: 5,
    imageUrl: "https://images.unsplash.com/photo-1543560560-4d3f6d604824?q=80&w=300&auto=format&fit=crop",
    bio: "Obsessed with ancient arcane secrets, Elara travels the Sword Coast searching for the lost spellbook of Bowgentle.",
    stats: { str: 8, dex: 14, con: 12, int: 18, wis: 12, cha: 10 }
  },
  {
    id: "3",
    name: "Kaelen Shadowstep",
    race: "Human",
    class: "Rogue",
    level: 5,
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    bio: "A master of stealth and deception, Kaelen works for the highest bidder but has a secret heart of gold... mostly.",
    stats: { str: 10, dex: 18, con: 12, int: 14, wis: 10, cha: 14 }
  }
];
