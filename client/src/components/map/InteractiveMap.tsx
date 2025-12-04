import { useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapPin } from "./MapPin";
import { Encounter } from "@/data/encounters";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapImage from "@assets/Sword-Coast-Map_HighRes_1764836285569.jpg";
import { cn } from "@/lib/utils";

interface InteractiveMapProps {
  encounters: Encounter[];
  onEncounterSelect: (encounter: Encounter) => void;
  onMapClick?: (location: { x: number; y: number }) => void;
  isAdmin?: boolean;
}

export function InteractiveMap({ encounters, onEncounterSelect, onMapClick, isAdmin = false }: InteractiveMapProps) {
  const [scale, setScale] = useState(1);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAdmin || !onMapClick || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    onMapClick({ x, y });
  };

  return (
    <div className="relative w-full h-full bg-[#1a1d21] overflow-hidden rounded-lg border-4 border-stone-800 shadow-2xl">
      <TransformWrapper
        initialScale={1}
        minScale={1} // Prevent zooming out past 100% to keep bounds
        maxScale={4}
        limitToBounds={true} // Keeps image within viewport
        centerOnInit={true}
        onTransformed={(ref) => setScale(ref.state.scale)}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => zoomIn()}
                className="bg-card/90 hover:bg-card border-stone-400 text-stone-800 shadow-md"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => zoomOut()}
                className="bg-card/90 hover:bg-card border-stone-400 text-stone-800 shadow-md"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => resetTransform()}
                className="bg-card/90 hover:bg-card border-stone-400 text-stone-800 shadow-md"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            
            {isAdmin && (
              <div className="absolute top-4 left-4 z-20 bg-primary/90 text-white px-3 py-1 rounded-md shadow-lg text-sm font-bold animate-pulse border border-white/20">
                Admin Mode: Click map to add pin
              </div>
            )}

            <TransformComponent
              wrapperClass="w-full h-full"
              contentClass="w-full h-full"
            >
              <div 
                ref={mapRef}
                className={cn(
                  "relative w-full h-full min-h-[800px]",
                  isAdmin ? "cursor-crosshair" : "cursor-grab active:cursor-grabbing"
                )}
                onClick={handleMapClick}
              >
                <img
                  src={mapImage}
                  alt="Sword Coast Map"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                
                {/* Pins Layer */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <div className="w-full h-full relative pointer-events-auto">
                    {encounters.map((encounter) => (
                      <MapPin
                        key={encounter.id}
                        encounter={encounter}
                        onClick={onEncounterSelect}
                        scale={scale}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
