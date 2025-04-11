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
import { useState } from "react";

const NewInsightModal: React.FC = () => {
  const [open, setOpen] = useState(false); // ✅ controlled open state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"line" | "bar">("line");

  const handleAdd = async () => {
    if (!title.trim()) return;

    const newInsight = {
      id: `insight-${Date.now()}`,
      title,
      description,
      type,
      color: "#0ea5e9",
      data: [
        { label: "A", value: Math.floor(Math.random() * 200) + 100 },
        { label: "B", value: Math.floor(Math.random() * 200) + 100 },
        { label: "C", value: Math.floor(Math.random() * 200) + 100 },
      ],
    };

    const existing = (await localforage.getItem<(typeof newInsight)[]>("insights:data")) || [];
    const updated = [newInsight, ...existing];
    await localforage.setItem("insights:data", updated);

    // Reset form & close modal ✅
    setTitle("");
    setDescription("");
    setType("line");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto w-full sm:w-auto">
          + New Insight
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Create a new chart insight</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input
            placeholder="Insight title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select value={type} onValueChange={(val) => setType(val as "line" | "bar")}>
            <SelectTrigger>
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleAdd} disabled={!title.trim()}>
            Add Insight
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewInsightModal;
