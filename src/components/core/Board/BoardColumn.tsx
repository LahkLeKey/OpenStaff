import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import type { Column, Task } from "./Board";
import { useBoard } from "./BoardContext";
import BoardItem from "./BoardItem";

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
}

const BoardColumn: React.FC<BoardColumnProps> = ({ column, tasks }) => {
  const { setTasks, setColumns, tasks: allTasks } = useBoard();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [adding, setAdding] = useState(false); // toggle input state

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const id = `task-${Date.now()}`;
    const newTask: Task = {
      id,
      title: newTaskTitle,
      status: column.id,
    };

    const updatedTasks = {
      ...allTasks,
      [id]: newTask,
    };

    const updatedColumn: Column = {
      ...column,
      taskIds: [...column.taskIds, id],
    };

    setTasks(updatedTasks);
    setColumns((prev) => ({ ...prev, [column.id]: updatedColumn }));
    setNewTaskTitle("");
    setAdding(false); // close input
  };

  return (
    <Card className="w-full sm:w-64 flex-shrink-0 bg-muted text-muted-foreground border border-border flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm">{column.title}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground"
          onClick={() => setAdding(!adding)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 justify-between gap-4">
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-3 min-h-[100px] pb-2 ${
                snapshot.isDraggingOver ? "bg-accent/30" : ""
              }`}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-shadow ${snapshot.isDragging ? "shadow-lg" : ""}`}
                    >
                      <BoardItem task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Conditional Add Task Form */}
        {adding && (
          <div className="space-y-2 mt-2">
            <Input
              placeholder="New task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="text-sm"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleAddTask}
                disabled={!newTaskTitle.trim()}
                className="w-full"
              >
                Add Task
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setAdding(false);
                  setNewTaskTitle("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoardColumn;
