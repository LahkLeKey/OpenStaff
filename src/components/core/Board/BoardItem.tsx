import ConfirmDialog from "@/components/core/Shared/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import localforage from "localforage";
import type React from "react";
import { useState } from "react";
import type { Task } from "./Board";
import { useBoard } from "./BoardContext";
import EditTaskModal from "./EditTaskModal";

interface BoardItemProps {
  task: Task;
}

const priorityColors: Record<string, string> = {
  high: "bg-destructive text-white",
  medium: "bg-yellow-400 text-black",
  low: "bg-green-500 text-white",
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const formatDue = (iso?: string) => {
  if (!iso) return null;
  const due = new Date(iso);
  const diff = Math.round((due.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return `Overdue ${Math.abs(diff)}d`;
  if (diff === 0) return "Due today";
  return `Due in ${diff}d`;
};

const BoardItem: React.FC<BoardItemProps> = ({ task }) => {
  const dueText = formatDue(task.due);
  const priorityStyle = priorityColors[task.priority ?? "low"];
  const { tasks, columns, setTasks, setColumns } = useBoard();

  const handleDelete = async () => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[task.id];

    const updatedColumns = Object.fromEntries(
      Object.entries(columns).map(([key, col]) => [
        key,
        {
          ...col,
          taskIds: col.taskIds.filter((id) => id !== task.id),
        },
      ]),
    );

    setTasks(updatedTasks);
    setColumns(updatedColumns);
    await localforage.setItem("board:tasks", updatedTasks);
    await localforage.setItem("board:columns", updatedColumns);
  };

  return (
    <Card className="bg-card text-card-foreground border border-border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col space-y-1">
            <h3 className="text-sm font-medium leading-tight">{task.title}</h3>
            {task.notes &&
              (() => {
                const [expanded, setExpanded] = useState(false);
                const isLong = task.notes.length > 100;
                const visibleText =
                  isLong && !expanded ? `${task.notes.slice(0, 100)}...` : task.notes;
                return (
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>{visibleText}</p>
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => setExpanded(!expanded)}
                        className="text-xs underline text-blue-600"
                      >
                        {expanded ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                );
              })()}

            <p className="text-xs text-muted-foreground">{task.notes}</p>
          </div>
        </div>

        {(task.tags ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1">
            {(task.tags ?? []).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5 rounded">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2 items-center">
            <EditTaskModal task={task} />
            <span
              className={cn("text-xs px-2 py-0.5 rounded-full whitespace-nowrap", priorityStyle)}
            >
              {task.priority}
            </span>
            <ConfirmDialog
              trigger={
                <Button size="sm" variant="outline" className="text-xs">
                  Delete
                </Button>
              }
              title="Delete Task?"
              description="This will permanently remove the task."
              onConfirm={handleDelete}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {task.assignee && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 rounded-full bg-accent text-xs font-bold text-center leading-6">
                  {getInitials(task.assignee)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{task.assignee}</p>
              </TooltipContent>
            </Tooltip>
          )}
          {dueText && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">{dueText}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BoardItem;
