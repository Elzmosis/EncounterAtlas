import { Character } from "@/data/characters";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface CharacterCardProps {
  character: Character;
  isAdmin: boolean;
  onEdit: (character: Character) => void;
  onDelete: (id: string) => void;
}

export function CharacterCard({ character, isAdmin, onEdit, onDelete }: CharacterCardProps) {
  return (
    <Card className="bg-card border-secondary/20 overflow-hidden hover:shadow-xl transition-all duration-300 group relative flex flex-col">
      <div className="h-64 overflow-hidden relative">
        <img 
          src={character.imageUrl} 
          alt={character.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-heading font-bold text-white">{character.name}</h3>
              <p className="text-stone-300 font-serif italic">{character.race} {character.class} • Level {character.level}</p>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="grid grid-cols-6 gap-2 mb-4 text-center text-xs font-mono border-b border-secondary/20 pb-4">
          {Object.entries(character.stats).map(([stat, value]) => (
            <div key={stat} className="flex flex-col items-center p-1 bg-muted/30 rounded">
              <span className="uppercase text-muted-foreground font-bold">{stat}</span>
              <span className="text-lg font-bold text-primary">{value}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {character.bio}
        </p>
      </CardContent>

      {isAdmin && (
        <CardFooter className="pt-2 pb-4 px-4 flex justify-end gap-2 border-t border-secondary/10 bg-muted/10">
          <Button variant="outline" size="sm" onClick={() => onEdit(character)} className="hover:bg-secondary/10 border-secondary/30">
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(character.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
