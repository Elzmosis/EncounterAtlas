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
import { useState } from "react";
import { Lock } from "lucide-react";

interface AdminLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => void;
}

export function AdminLoginDialog({ isOpen, onClose, onLogin }: AdminLoginDialogProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check for the prototype
    if (password === "dndmaster") {
      onLogin(password);
      setPassword("");
      setError(false);
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-card text-card-foreground border-secondary/50">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-primary flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Dungeon Master Access
          </DialogTitle>
          <DialogDescription>
            Enter the password to enable editing mode.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={error ? "border-destructive" : ""}
            />
            {error && (
              <p className="text-xs text-destructive font-medium">
                Incorrect password. Roll for Deception?
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Unlock
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
