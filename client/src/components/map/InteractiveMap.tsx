import { useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapPin } from "./MapPin";
import { encounters, Encounter } from "@/data/encounters";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapImage from "@assets/Sword-Coast-Map_HighRes_1764836285569.jpg";

interface InteractiveMapProps {
  onEncounterSelect: (encounter: Encounter) => void;
}

export function InteractiveMap({ onEncounterSelect }: InteractiveMapProps) {
  const [scale, setScale] = useState(1);

  return (
    <div className="relative w-full h-full bg-[#1a1d21] overflow-hidden rounded-lg border-4 border-stone-800 shadow-2xl">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
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

            <TransformComponent
              wrapperClass="w-full h-full cursor-grab active:cursor-grabbing"
              contentClass="w-full h-full"
            >
              <div className="relative w-full h-full min-h-[800px]">
                <img
                  src={mapImage}
                  alt="Sword Coast Map"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                
                {/* Overlay Gradient for atmosphere (optional, keeping it clean for now) */}
                
                {/* Pins Layer */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Pointer events none on container so map drag works, enable on pins */}
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
