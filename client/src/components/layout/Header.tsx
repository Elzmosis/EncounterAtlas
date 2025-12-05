import { Scroll, Shield, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useCampaign } from "@/context/CampaignContext";
import { EditableText } from "@/components/ui/editable-text";

interface HeaderProps {
  isAdmin: boolean;
  onAdminClick: () => void;
}

export function Header({ isAdmin, onAdminClick }: HeaderProps) {
  const [location] = useLocation();
  const { data, updateData } = useCampaign();

  return (
    <header className="w-full bg-stone-900 text-stone-100 border-b-4 border-secondary py-4 shadow-lg relative z-30">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="p-2 bg-primary rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.4)] cursor-pointer hover:opacity-90 transition-opacity">
              <Scroll className="w-6 h-6 text-white" />
            </div>
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-bold tracking-wider text-secondary flex items-center gap-2">
              <EditableText
                value={data.title}
                onSave={(val) => updateData({ title: val })}
                isAdmin={isAdmin}
              />
            </h1>
            <p className="text-xs text-stone-400 font-serif italic">
              <EditableText
                value={data.subtitle}
                onSave={(val) => updateData({ subtitle: val })}
                isAdmin={isAdmin}
              />
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-heading text-stone-400">
            <Link href="/">
              <span className={cn(
                "cursor-pointer transition-colors",
                location === "/" ? "text-secondary font-bold" : "hover:text-white"
              )}>
                Map
              </span>
            </Link>
            <Link href="/characters">
              <span className={cn(
                "cursor-pointer transition-colors",
                location === "/characters" ? "text-secondary font-bold" : "hover:text-white"
              )}>
                Characters
              </span>
            </Link>
            <Link href="/journal">
              <span className={cn(
                "cursor-pointer transition-colors",
                location === "/journal" ? "text-secondary font-bold" : "hover:text-white"
              )}>
                Journal
              </span>
            </Link>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onAdminClick}
            className={isAdmin ? "text-primary hover:text-primary/80" : "text-stone-500 hover:text-stone-300"}
          >
            {isAdmin ? <ShieldAlert className="w-4 h-4 mr-2" /> : <Shield className="w-4 h-4 mr-2" />}
            {isAdmin ? "Admin Active" : "Admin"}
          </Button>
        </div>
      </div>
    </header>
  );
}
