import { cn } from "@/lib/utils";
import { Encounter } from "@/data/encounters";
import { motion } from "framer-motion";
import { 
  Swords, 
  MessageCircle, 
  Map as MapIcon, 
  Skull 
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MapPinProps {
  encounter: Encounter;
  onClick: (encounter: Encounter) => void;
  scale?: number;
}

const typeIcons = {
  combat: Swords,
  social: MessageCircle,
  exploration: MapIcon,
  boss: Skull,
};

const typeColors = {
  combat: "bg-red-700 border-red-900 text-white",
  social: "bg-blue-600 border-blue-800 text-white",
  exploration: "bg-emerald-600 border-emerald-800 text-white",
  boss: "bg-purple-700 border-purple-950 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]",
};

export function MapPin({ encounter, onClick, scale = 1 }: MapPinProps) {
  const Icon = typeIcons[encounter.type];
  
  // Inverse scaling to keep pins relatively same size when zoomed
  const pinStyle = {
    left: `${encounter.location.x}%`,
    top: `${encounter.location.y}%`,
    transform: `translate(-50%, -50%) scale(${1 / Math.max(scale, 0.5)})`,
  };

  return (
    <div 
      className="absolute z-10 cursor-pointer"
      style={pinStyle}
    >
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent map click
              onClick(encounter);
            }}
            className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-lg transition-colors",
              typeColors[encounter.type]
            )}
          >
            <Icon className="w-5 h-5" />
            
            {/* Pulse effect for boss or active elements */}
            {encounter.type === 'boss' && (
              <span className="absolute inset-0 rounded-full animate-ping bg-purple-500 opacity-75 duration-1000" />
            )}
          </motion.button>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="bg-card border-secondary/50 text-card-foreground font-serif max-w-xs p-3 shadow-xl"
        >
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-primary text-base">{encounter.title}</h4>
            <p className="text-xs text-muted-foreground italic">{encounter.date}</p>
            <p className="text-sm">{encounter.summary}</p>
            <p className="text-xs text-primary/80 mt-2 font-bold">Click for details</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
