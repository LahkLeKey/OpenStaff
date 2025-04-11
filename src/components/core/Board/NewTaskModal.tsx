import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type React from "react";
import { useState } from "react";
import { useBoard } from "./BoardContext";

const NewTaskModal: React.FC = () => {
  const { setTasks, setColumns, isLoaded } = useBoard();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  if (!isLoaded) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newId = `task-${Date.now()}`;
    const newTask = {
      id: newId,
      title,
      status,
      priority: "low",
      tags: [],
      assignee: "Unassigned",
      due: undefined,
    };

    setTasks((prev) => ({ ...prev, [newId]: newTask }));
    setColumns((prev) => ({
      ...prev,
      [status]: {
        ...prev[status],
        taskIds: [...prev[status].taskIds, newId],
      },
    }));

    setTitle("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto w-full sm:w-auto">
          + New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Create a new task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea placeholder="Optional details..." disabled />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            Add Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskModal;
