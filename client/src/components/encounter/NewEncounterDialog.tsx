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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Encounter } from "@/data/encounters";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const encounterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["combat", "social", "exploration", "boss"]),
  summary: z.string().min(1, "Summary is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
});

type EncounterFormValues = z.infer<typeof encounterSchema>;

interface NewEncounterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Encounter, "id" | "location">) => void;
  location: { x: number; y: number } | null;
}

export function NewEncounterDialog({ isOpen, onClose, onSubmit, location }: NewEncounterDialogProps) {
  const form = useForm<EncounterFormValues>({
    resolver: zodResolver(encounterSchema),
    defaultValues: {
      title: "",
      type: "exploration",
      summary: "",
      description: "",
      date: "1492 DR",
    },
  });

  const handleSubmit = (data: EncounterFormValues) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card text-card-foreground border-secondary/50">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-primary">Record New Encounter</DialogTitle>
          <DialogDescription>
            Add a new entry to the chronicles at coordinates ({location?.x.toFixed(1)}%, {location?.y.toFixed(1)}%)
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Battle of..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="combat">Combat</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="exploration">Exploration</SelectItem>
                        <SelectItem value="boss">Boss</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input placeholder="1492 DR..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary (Short)</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief overview..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What happened?" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Record Entry</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
