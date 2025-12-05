export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
  author: string;
}

export const initialJournalEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Departure from Neverwinter",
    date: "1492 DR, 1st of Mirtul",
    author: "Thorgar",
    imageUrl: "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?q=80&w=1200&auto=format&fit=crop",
    content: `We have finally gathered our supplies and set forth from the Jewel of the North. The road ahead is long and fraught with peril, but our spirits are high. 

Gundren Rockseeker has promised us a fair share of the profits if we can deliver his wagon of provisions to Phandalin safely. It seems like a simple enough task, but I have a bad feeling about the Triboar Trail.

Elara seems distracted, constantly reading that old tome of hers. Kaelen is already gambling with our advance pay. I pray to Moradin that we find glory, or at least a good ale, at the end of this road.`
  },
  {
    id: "2",
    title: "The Goblin Ambush",
    date: "1492 DR, 5th of Mirtul",
    author: "Elara",
    imageUrl: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1200&auto=format&fit=crop",
    content: `My studies were interrupted by the twang of bowstrings. Goblins! Wretched creatures. They set a trap for us using two dead horses on the road.

Thorgar was magnificent, albeit reckless, charging into the thick of them. I managed to incinerate two of them with a well-placed Firebolt. We found a map case on one of them - it seems they have taken Gundren and his escort, Sildar Hallwinter, to a nearby cave.

We must rest now, but at first light, we hunt.`
  }
];
