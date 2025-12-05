import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Character } from "@/data/characters";
import { initialNpcs } from "@/data/npcs";
import { CharacterCard } from "@/components/character/CharacterCard";
import { CharacterDialog } from "@/components/character/CharacterDialog";
import { AdminLoginDialog } from "@/components/admin/AdminLoginDialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCampaign } from "@/context/CampaignContext";
import { EditableText } from "@/components/ui/editable-text";

export default function Npcs() {
  const [npcs, setNpcs] = useState<Character[]>(initialNpcs);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNpc, setEditingNpc] = useState<Character | null>(null);
  
  const { toast } = useToast();
  const { data, updateData } = useCampaign();

  const handleCreateOrUpdate = (data: Omit<Character, "id">) => {
    if (editingNpc) {
      setNpcs(npcs.map(c => 
        c.id === editingNpc.id ? { ...data, id: c.id } : c
      ));
      toast({
        title: "NPC Updated",
        description: `${data.name} has been updated.`,
      });
    } else {
      const newNpc: Character = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      };
      setNpcs([...npcs, newNpc]);
      toast({
        title: "New NPC",
        description: `${data.name} has been added to the world!`,
      });
    }
    setEditingNpc(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this NPC?")) {
      setNpcs(npcs.filter(c => c.id !== id));
      toast({
        title: "NPC Removed",
        description: "They have vanished from the world.",
        variant: "destructive",
      });
    }
  };

  const openEdit = (npc: Character) => {
    setEditingNpc(npc);
    setIsDialogOpen(true);
  };

  const openCreate = () => {
    setEditingNpc(null);
    setIsDialogOpen(true);
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      setIsAdmin(false);
      toast({
        title: "Admin Mode Disabled",
        description: "You are now viewing as a player.",
      });
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    toast({
      title: "Admin Mode Enabled",
      description: "You can now edit NPC sheets.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-950">
      <Header isAdmin={isAdmin} onAdminClick={handleAdminClick} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 border-b border-secondary/30 pb-4">
          <div>
            <h1 className="text-3xl font-heading text-secondary mb-2 flex items-center gap-2">
              <EditableText
                value={data.npcsTitle}
                onSave={(val) => updateData({ npcsTitle: val })}
                isAdmin={isAdmin}
              />
            </h1>
            <p className="text-muted-foreground font-serif italic">
              <EditableText
                value={data.npcsSubtitle}
                onSave={(val) => updateData({ npcsSubtitle: val })}
                isAdmin={isAdmin}
              />
            </p>
          </div>
          
          {isAdmin && (
            <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 text-white">
              <UserPlus className="w-4 h-4 mr-2" /> Add NPC
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {npcs.map((npc) => (
            <CharacterCard
              key={npc.id}
              character={npc}
              isAdmin={isAdmin}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {npcs.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <h3 className="text-xl font-heading text-muted-foreground">No NPCs recorded.</h3>
          </div>
        )}
      </main>

      <CharacterDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreateOrUpdate}
        characterToEdit={editingNpc}
      />

      <AdminLoginDialog 
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLogin={handleAdminLogin}
      />
    </div>
  );
}
