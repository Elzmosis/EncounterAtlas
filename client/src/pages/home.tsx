import { useState } from "react";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { EncounterSheet } from "@/components/encounter/EncounterSheet";
import { Header } from "@/components/layout/Header";
import { Encounter } from "@/data/encounters";

export default function Home() {
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleEncounterSelect = (encounter: Encounter) => {
    setSelectedEncounter(encounter);
    setIsSheetOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-950">
      <Header />
      
      <main className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 p-4 md:p-6 lg:p-8">
          <InteractiveMap onEncounterSelect={handleEncounterSelect} />
        </div>
      </main>

      <EncounterSheet 
        encounter={selectedEncounter}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  );
}
