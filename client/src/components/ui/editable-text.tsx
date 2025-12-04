import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void;
  isAdmin: boolean;
  className?: string;
  inputClassName?: string;
  multiline?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function EditableText({ 
  value, 
  onSave, 
  isAdmin, 
  className, 
  inputClassName,
  as: Component = "span" 
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={cn("h-auto py-1 px-2 min-w-[100px] inline-block", inputClassName)}
      />
    );
  }

  return (
    <Component 
      className={cn(
        "relative group", 
        isAdmin && "cursor-pointer hover:underline decoration-primary/50 decoration-dashed underline-offset-4",
        className
      )}
      onClick={() => isAdmin && setIsEditing(true)}
      title={isAdmin ? "Click to edit" : undefined}
    >
      {value}
      {isAdmin && (
        <Pencil className="w-3 h-3 absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity text-primary" />
      )}
    </Component>
  );
}
