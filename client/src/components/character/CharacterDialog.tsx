import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Character } from "@/data/characters";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";

const characterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  race: z.string().min(1, "Race is required"),
  class: z.string().min(1, "Class is required"),
  level: z.preprocess((val) => Number(val), z.number().min(1).max(20)),
  bio: z.string().min(1, "Bio is required"),
  imageUrl: z.string().optional(),
  stats: z.object({
    str: z.preprocess((val) => Number(val), z.number().min(1).max(30)),
    dex: z.preprocess((val) => Number(val), z.number().min(1).max(30)),
    con: z.preprocess((val) => Number(val), z.number().min(1).max(30)),
    int: z.preprocess((val) => Number(val), z.number().min(1).max(30)),
    wis: z.preprocess((val) => Number(val), z.number().min(1).max(30)),
    cha: z.preprocess((val) => Number(val), z.number().min(1).max(30)),
  }),
});

type CharacterFormValues = z.infer<typeof characterSchema>;

interface CharacterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Character, "id">) => void;
  characterToEdit?: Character | null;
}

export function CharacterDialog({ isOpen, onClose, onSubmit, characterToEdit }: CharacterDialogProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<CharacterFormValues>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: "",
      race: "",
      class: "",
      level: 1,
      bio: "",
      imageUrl: "",
      stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    },
  });

  useEffect(() => {
    if (characterToEdit) {
      form.reset({
        name: characterToEdit.name,
        race: characterToEdit.race,
        class: characterToEdit.class,
        level: characterToEdit.level,
        bio: characterToEdit.bio,
        imageUrl: characterToEdit.imageUrl,
        stats: characterToEdit.stats,
      });
      setImagePreview(characterToEdit.imageUrl);
    } else {
      form.reset({
        name: "",
        race: "",
        class: "",
        level: 1,
        bio: "",
        imageUrl: "",
        stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      });
      setImagePreview(null);
    }
  }, [characterToEdit, isOpen, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      form.setValue("imageUrl", url);
    }
  };

  const handleSubmit = (data: CharacterFormValues) => {
    onSubmit({
      ...data,
      imageUrl: data.imageUrl || "https://placehold.co/400x600/2a2a2a/ffffff?text=No+Image",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card text-card-foreground border-secondary/50 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-primary">
            {characterToEdit ? "Edit Character" : "New Character"}
          </DialogTitle>
          <DialogDescription>
            {characterToEdit ? "Update character details." : "Add a new hero to the party."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="flex gap-4">
              {/* Image Upload */}
              <div className="w-32 flex-shrink-0">
                <div 
                  className="h-40 w-full bg-muted rounded-lg border-2 border-dashed border-secondary/50 flex items-center justify-center overflow-hidden relative cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => document.getElementById('char-image-upload')?.click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-2 text-muted-foreground">
                      <ImagePlus className="w-8 h-8 mx-auto mb-1" />
                      <span className="text-xs">Upload Portrait</span>
                    </div>
                  )}
                  <input 
                    id="char-image-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Character Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="race"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Race</FormLabel>
                        <FormControl>
                          <Input placeholder="Elf, Dwarf..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <FormControl>
                          <Input placeholder="Wizard, Fighter..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 items-end bg-muted/20 p-3 rounded-lg border border-border/50">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-xs uppercase font-bold text-primary">Lvl</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="text-center font-bold" />
                    </FormControl>
                  </FormItem>
                )}
              />
              {(["str", "dex", "con", "int", "wis", "cha"] as const).map((stat) => (
                <FormField
                  key={stat}
                  control={form.control}
                  // @ts-ignore
                  name={`stats.${stat}`}
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel className="text-xs uppercase font-bold text-muted-foreground">{stat}</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="text-center" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Character backstory and traits..." 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {characterToEdit ? "Save Changes" : "Create Character"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
