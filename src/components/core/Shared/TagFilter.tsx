import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type React from "react";
import { useState } from "react";

interface TagFilterProps {
  tags: string[];
  selected: string[];
  onChange: (updated: string[]) => void;
  allowCreate?: boolean;
  onCreateTag?: (tag: string) => void; // ✅ New callback
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selected,
  onChange,
  allowCreate = true,
  onCreateTag,
}) => {
  const [newTag, setNewTag] = useState("");

  const toggleTag = (tag: string) => {
    const updated = selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag];
    onChange(updated);
  };

  const handleAddTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      onCreateTag?.(tag); // ✅ Notify parent to persist the tag
    }
    if (tag && !selected.includes(tag)) {
      onChange([...selected, tag]); // still select it
    }
    setNewTag("");
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={selected.includes(tag) ? "default" : "outline"}
            onClick={() => toggleTag(tag)}
            className={cn("cursor-pointer text-xs capitalize", {
              "bg-primary text-primary-foreground": selected.includes(tag),
            })}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {allowCreate && (
        <div className="flex gap-2 mt-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="New tag"
            className="text-xs"
          />
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={handleAddTag}
            disabled={!newTag.trim()}
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
