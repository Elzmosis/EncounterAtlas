import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { JournalEntry, initialJournalEntries } from "@/data/journal";
import { AdminLoginDialog } from "@/components/admin/AdminLoginDialog";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Calendar, User, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCampaign } from "@/context/CampaignContext";
import { EditableText } from "@/components/ui/editable-text";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(initialJournalEntries);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  
  const { toast } = useToast();
  const { data, updateData } = useCampaign();

  // Dialog Form State
  const [formData, setFormData] = useState<Partial<JournalEntry>>({});

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
      description: "You can now edit the journal.",
    });
  };

  const openCreate = () => {
    setEditingEntry(null);
    setFormData({
      title: "",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: "",
      content: "",
      imageUrl: ""
    });
    setIsDialogOpen(true);
  };

  const openEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setFormData({ ...entry });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this entry? This cannot be undone.")) {
      setEntries(entries.filter(e => e.id !== id));
      toast({
        title: "Entry Deleted",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Missing Information",
        description: "Title and Content are required.",
        variant: "destructive"
      });
      return;
    }

    if (editingEntry) {
      setEntries(entries.map(e => 
        e.id === editingEntry.id ? { ...e, ...formData } as JournalEntry : e
      ));
      toast({ title: "Entry Updated" });
    } else {
      const newEntry: JournalEntry = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData as JournalEntry
      };
      setEntries([newEntry, ...entries]);
      toast({ title: "Entry Published" });
    }
    setIsDialogOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, imageUrl: url });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-950">
      <Header isAdmin={isAdmin} onAdminClick={handleAdminClick} />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-12 border-b border-secondary/30 pb-6">
          <div>
            <h1 className="text-4xl font-heading text-secondary mb-2">Campaign Journal</h1>
            <p className="text-muted-foreground font-serif italic text-lg">
              Chronicles of our deeds and misdeeds...
            </p>
          </div>
          
          {isAdmin && (
            <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" /> New Entry
            </Button>
          )}
        </div>

        <div className="space-y-16">
          {entries.map((entry) => (
            <article key={entry.id} className="relative group">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/50 via-secondary/20 to-transparent -ml-6 hidden md:block" />
              
              {/* Date Marker */}
              <div className="hidden md:flex absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-stone-950 border-2 border-secondary items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              </div>

              <div className="bg-card border border-secondary/10 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-1 rounded-md backdrop-blur-sm">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:text-primary hover:bg-white/10" onClick={() => openEdit(entry)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:text-destructive hover:bg-white/10" onClick={() => handleDelete(entry.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Image Header */}
                {entry.imageUrl && (
                  <div className="h-64 md:h-80 w-full overflow-hidden relative">
                    <img 
                      src={entry.imageUrl} 
                      alt={entry.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                )}

                <div className="p-6 md:p-8 relative">
                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 font-mono uppercase tracking-widest">
                    <div className="flex items-center gap-2 text-secondary">
                      <Calendar className="w-4 h-4" />
                      {entry.date}
                    </div>
                    {entry.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Scribe: {entry.author}
                      </div>
                    )}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 leading-tight">
                    {entry.title}
                  </h2>

                  <div className="prose prose-stone prose-invert max-w-none font-serif text-lg leading-relaxed text-stone-300">
                    {entry.content.split('\n').map((paragraph, i) => (
                      paragraph.trim() && <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-32 border-2 border-dashed border-stone-800 rounded-xl">
            <h3 className="text-2xl font-heading text-muted-foreground mb-2">The pages are empty.</h3>
            <p className="text-stone-500 font-serif italic">History waits to be written...</p>
          </div>
        )}
      </main>

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-card text-card-foreground border-secondary/50">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-primary">
              {editingEntry ? "Edit Journal Entry" : "New Journal Entry"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="The Battle of..."
                className="font-heading text-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input 
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  placeholder="1492 DR..."
                />
              </div>
              <div className="space-y-2">
                <Label>Scribe / Author</Label>
                <Input 
                  value={formData.author} 
                  onChange={e => setFormData({...formData, author: e.target.value})}
                  placeholder="Character Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="flex gap-4 items-center">
                <div 
                  className="h-24 w-40 bg-muted rounded-md overflow-hidden flex items-center justify-center border border-dashed border-secondary/50 cursor-pointer hover:bg-muted/80 transition-colors relative"
                  onClick={() => document.getElementById('journal-image-upload')?.click()}
                >
                  {formData.imageUrl ? (
                    <img src={formData.imageUrl} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-2">
                      <ImageIcon className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Upload</span>
                    </div>
                  )}
                  <input 
                    id="journal-image-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="flex-1">
                  <Input 
                    value={formData.imageUrl || ""} 
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    placeholder="Or enter image URL..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Entry Content</Label>
              <Textarea 
                value={formData.content} 
                onChange={e => setFormData({...formData, content: e.target.value})}
                placeholder="Write your story here..."
                className="min-h-[300px] font-serif text-base leading-relaxed"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">
              {editingEntry ? "Save Changes" : "Publish Entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AdminLoginDialog 
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLogin={handleAdminLogin}
      />
    </div>
  );
}
