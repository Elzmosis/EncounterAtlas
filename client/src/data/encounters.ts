export interface Encounter {
  id: string;
  title: string;
  location: { x: number; y: number };
  type: "combat" | "social" | "exploration" | "boss";
  summary: string;
  description: string;
  date: string;
  loot?: string[];
}

export const encounters: Encounter[] = [
  {
    id: "1",
    title: "Ambush at High Road",
    location: { x: 45, y: 30 }, // Percentage coordinates
    type: "combat",
    summary: "Goblin ambush while traveling north to Neverwinter.",
    description: `
      The party was traveling along the High Road when they were beset by a band of goblins led by a hobgoblin captain. 
      Arrows rained from the trees as the cart was overturned. 
      
      Thorgar took the brunt of the initial assault, shielding the wizard Elara. 
      After a tense skirmish, the party routed the goblins, discovering a map leading to Cragmaw Hideout.
    `,
    date: "1492 DR, 5th of Mirtul",
    loot: ["Shortsword +1", "15 Gold Pieces", "Cragmaw Map"],
  },
  {
    id: "2",
    title: "The Banshee's Bargain",
    location: { x: 55, y: 25 },
    type: "social",
    summary: "Negotiated with Agatha the Banshee for information.",
    description: `
      Seeking the location of the lost spellbook of Bowgentle, the party ventured into the deep woods of Neverwinter.
      Instead of violence, the bard managed to flatter the vanity of the spirit Agatha.
      
      In exchange for a jeweled silver comb, she revealed the location of the tome, allowing the party to leave with their lives intact.
    `,
    date: "1492 DR, 8th of Mirtul",
  },
  {
    id: "3",
    title: "Ruins of Thundertree",
    location: { x: 48, y: 35 },
    type: "boss",
    summary: "Confrontation with the Young Green Dragon, Venomfang.",
    description: `
      The overgrown ruins of Thundertree hid a deadly secret. A young green dragon named Venomfang had made the old tower its lair.
      
      The party attempted to drive it off, but the beast was cunning. It nearly killed the rogue with its poison breath before the cleric's divine intervention turned the tide.
      The dragon fled, vowing revenge, leaving behind a hoard of emeralds and ancient coins.
    `,
    date: "1492 DR, 12th of Mirtul",
    loot: ["Emerald Necklace", "Potion of Poison Resistance", "Dragon Scale"],
  },
  {
    id: "4",
    title: "Waterdeep Negotiations",
    location: { x: 42, y: 45 },
    type: "social",
    summary: "Audience with the Open Lord of Waterdeep.",
    description: `
      Upon arriving in the City of Splendors, the party was summoned to the Palace.
      Laeral Silverhand requested their aid in investigating the Cult of the Dragon activities in the south.
      
      Political intrigue ensued as rival factions attempted to bribe the party.
    `,
    date: "1492 DR, 20th of Mirtul",
  },
  {
    id: "5",
    title: "Trollbark Forest Mystery",
    location: { x: 38, y: 55 },
    type: "exploration",
    summary: "Discovered ancient elven ruins hidden by illusion magic.",
    description: `
      While tracking a band of orcs, the ranger noticed inconsistencies in the forest path.
      Dispelling the illusion revealed a pristine elven shrine dedicated to Corellon Larethian.
      
      The shrine contained a font of holy water that restored the party's vitality and granted a temporary blessing.
    `,
    date: "1492 DR, 25th of Mirtul",
  },
];
