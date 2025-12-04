import { Encounter } from "@/data/encounters";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin as MapIcon, Swords, Coins } from "lucide-react";

interface EncounterSheetProps {
  encounter: Encounter | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EncounterSheet({ encounter, isOpen, onClose }: EncounterSheetProps) {
  if (!encounter) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[90vw] sm:w-[540px] bg-card border-l-4 border-primary/20 p-0 overflow-hidden flex flex-col">
        {/* Decorative Header Image or Texture could go here */}
        <div className="h-32 bg-stone-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div className="absolute bottom-4 left-6">
            <Badge variant="outline" className="bg-primary/20 text-primary-foreground border-primary/40 mb-2 backdrop-blur-sm">
              {encounter.type.toUpperCase()}
            </Badge>
            <h2 className="text-3xl font-heading font-bold text-primary-foreground drop-shadow-md">
              {encounter.title}
            </h2>
          </div>
        </div>

        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-6 font-serif text-card-foreground">
            
            {/* Meta Data */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{encounter.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapIcon className="w-4 h-4" />
                <span>Sword Coast</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-stone dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed italic text-foreground/90 border-l-2 border-secondary pl-4">
                {encounter.summary}
              </p>
              <div className="mt-6 whitespace-pre-line text-base leading-7">
                {encounter.description}
              </div>
            </div>

            {/* Loot Section */}
            {encounter.loot && encounter.loot.length > 0 && (
              <div className="bg-stone-100 dark:bg-stone-900/50 rounded-lg p-4 border border-stone-200 dark:border-stone-800 mt-6">
                <div className="flex items-center gap-2 mb-3 text-secondary-foreground font-bold font-heading uppercase tracking-wider text-sm">
                  <Coins className="w-4 h-4 text-secondary" />
                  <span>Recovered Items</span>
                </div>
                <ul className="grid grid-cols-1 gap-2">
                  {encounter.loot.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/20 text-center text-xs text-muted-foreground italic">
           From the Journals of the Sword Coast
        </div>
      </SheetContent>
    </Sheet>
  );
}
