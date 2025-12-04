import { Scroll } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-stone-900 text-stone-100 border-b-4 border-secondary py-4 shadow-lg relative z-30">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            <Scroll className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold tracking-wider text-secondary">
              Sword Coast Chronicles
            </h1>
            <p className="text-xs text-stone-400 font-serif italic">
              A record of our adventures
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-heading text-stone-400">
          <span className="text-secondary cursor-pointer hover:text-white transition-colors">Map</span>
          <span className="hover:text-white transition-colors cursor-not-allowed">Journal</span>
          <span className="hover:text-white transition-colors cursor-not-allowed">Characters</span>
        </div>
      </div>
    </header>
  );
}
