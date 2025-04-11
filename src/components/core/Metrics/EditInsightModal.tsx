import TagFilter from "@/components/core/Shared/TagFilter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import localforage from "localforage";
import type React from "react";
import { useEffect, useState } from "react";

interface EditInsightModalProps {
  id: string;
  initialTitle: string;
  initialDescription?: string;
}

const EditInsightModal: React.FC<EditInsightModalProps> = ({
  id,
  initialTitle,
  initialDescription = "",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [type, setType] = useState<"line" | "bar">("line");
  const [color, setColor] = useState("#4f46e5");
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      interface Insight {
        id: string;
        title: string;
        description?: string;
        type: "line" | "bar";
        color: string;
        tags?: string[];
      }
      const insights = await localforage.getItem<Insight[]>("insights:data");
      const current = insights?.find((i) => i.id === id);
      if (current) {
        setType(current.type);
        setColor(current.color);
        setTags(current.tags ?? []);
        const knownTags = Array.from(new Set(insights?.flatMap((i) => i.tags ?? []) ?? []));
        setAllTags(knownTags);
      }
    };
    fetch();
  }, [id]);

  const handleSave = async () => {
    interface Insight {
      id: string;
      title: string;
      description?: string;
      type: "line" | "bar";
      color: string;
      tags?: string[];
    }

    const current = await localforage.getItem<Insight[]>("insights:data");
    if (!current) return;

    const updated = current.map((insight) =>
      insight.id === id ? { ...insight, title, description, type, color, tags } : insight,
    );

    await localforage.setItem("insights:data", updated);
    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Edit Insight</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Insight description"
          />
          <Select value={type} onValueChange={(val: "line" | "bar") => setType(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10"
          />
          <div className="space-y-1">
            <label htmlFor="tags-input" className="text-xs font-medium text-muted-foreground">
              Tags
            </label>
            <TagFilter tags={allTags} selected={tags} onChange={setTags} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditInsightModal;
