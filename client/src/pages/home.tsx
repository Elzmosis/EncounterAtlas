import { useState } from "react";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { EncounterSheet } from "@/components/encounter/EncounterSheet";
import { NewEncounterDialog } from "@/components/encounter/NewEncounterDialog";
import { Header } from "@/components/layout/Header";
import { Encounter, encounters as initialEncounters } from "@/data/encounters";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [encounters, setEncounters] = useState<Encounter[]>(initialEncounters);
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [newEncounterLocation, setNewEncounterLocation] = useState<{x: number, y: number} | null>(null);
  const [isNewEncounterOpen, setIsNewEncounterOpen] = useState(false);
  const { toast } = useToast();

  const handleEncounterSelect = (encounter: Encounter) => {
    // If adding a pin, don't open sheet
    if (newEncounterLocation) return;
    
    setSelectedEncounter(encounter);
    setIsSheetOpen(true);
  };

  const handleMapClick = (location: { x: number; y: number }) => {
    if (!isAdmin) return;
    setNewEncounterLocation(location);
    setIsNewEncounterOpen(true);
  };

  const handleCreateEncounter = (data: Omit<Encounter, "id" | "location">) => {
    if (!newEncounterLocation) return;

    const newEncounter: Encounter = {
      id: Math.random().toString(36).substr(2, 9),
      location: newEncounterLocation,
      ...data,
    };

    setEncounters([...encounters, newEncounter]);
    setNewEncounterLocation(null);
    
    toast({
      title: "Entry Recorded",
      description: `Added "${data.title}" to the chronicles.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-950">
      <Header isAdmin={isAdmin} onToggleAdmin={() => setIsAdmin(!isAdmin)} />
      
      <main className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 p-4 md:p-6 lg:p-8">
          <InteractiveMap 
            encounters={encounters}
            onEncounterSelect={handleEncounterSelect}
            onMapClick={handleMapClick}
            isAdmin={isAdmin}
          />
        </div>
      </main>

      <EncounterSheet 
        encounter={selectedEncounter}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />

      <NewEncounterDialog 
        isOpen={isNewEncounterOpen}
        onClose={() => {
          setIsNewEncounterOpen(false);
          setNewEncounterLocation(null);
        }}
        onSubmit={handleCreateEncounter}
        location={newEncounterLocation}
      />
    </div>
  );
}
