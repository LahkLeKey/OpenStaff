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
import { useState } from "react";
import type { Task } from "./Board";
import { useBoard } from "./BoardContext";

interface EditTaskModalProps {
  task: Task;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task }) => {
  const { tasks, setTasks } = useBoard();
  const [title, setTitle] = useState(task.title);
  const [assignee, setAssignee] = useState(task.assignee ?? "");
  const [priority, setPriority] = useState(task.priority ?? "low");
  const [due, setDue] = useState(task.due ?? "");
  const [notes, setNotes] = useState(task.notes ?? "");
  const [tags, setTags] = useState<string[]>(task.tags ?? []);

  const allTags = Array.from(new Set(Object.values(tasks).flatMap((t) => t.tags ?? [])));

  const handleSave = async () => {
    const updatedTask: Task = {
      ...task,
      title,
      assignee,
      priority,
      due,
      notes,
      tags,
    };

    const newTasks = { ...tasks, [task.id]: updatedTask };
    setTasks(newTasks);
    await localforage.setItem("board:tasks", newTasks);
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
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
          <Select value={priority} onValueChange={(val) => setPriority(val as Task["priority"])}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={due ? due.slice(0, 10) : ""}
            onChange={(e) => setDue(e.target.value)}
          />
          <Textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <div className="space-y-1">
            <label htmlFor="tag-filter" className="text-xs font-medium text-muted-foreground">
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

export default EditTaskModal;
