import TagFilter from "@/components/core/Shared/TagFilter";
import { Card } from "@/components/ui/card";
import type React from "react";
import { useState } from "react";
import { DragDropContext, type DropResult } from "react-beautiful-dnd";
import BoardColumn from "./BoardColumn";
import { useBoard } from "./BoardContext";

export interface Task {
  id: string;
  title: string;
  notes?: string;
  status: string;
  assignee?: string;
  priority?: "low" | "medium" | "high";
  tags?: string[];
  due?: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

const Board: React.FC = () => {
  const { tasks, columns, setTasks, setColumns } = useBoard();
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Extract all existing tags
  const [allTags, setAllTags] = useState<string[]>(
    Array.from(new Set(Object.values(tasks).flatMap((t) => t.tags ?? []))),
  );

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newCol = { ...start, taskIds: newTaskIds };
      setColumns({ ...columns, [newCol.id]: newCol });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    const updatedTask = {
      ...tasks[draggableId],
      status: finish.id,
    };

    setTasks({ ...tasks, [draggableId]: updatedTask });
    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  const columnOrder = ["todo", "in-progress", "review", "done"];

  return (
    <Card className="p-4 bg-background text-foreground border border-border space-y-4 overflow-x-auto">
      {/* Tag Filtering */}
      <TagFilter
        tags={allTags}
        selected={activeTags}
        onChange={setActiveTags}
        onCreateTag={(newTag) => {
          const tag = newTag.trim().toLowerCase();
          if (tag && !allTags.includes(tag)) {
            setAllTags((prev) => [...prev, tag]);
          }
        }}
      />

      {/* Board Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row gap-4 sm:gap-6 min-w-full overflow-x-auto pb-2">
          {columnOrder.map((colId) => {
            const column = columns[colId];
            const columnTasks = column.taskIds
              .map((tid) => tasks[tid])
              .filter((task): task is Task => !!task) // ensure defined
              .filter(
                (task) =>
                  activeTags.length === 0 ||
                  (task.tags ?? []).some((tag) => activeTags.includes(tag)),
              );

            return <BoardColumn key={colId} column={column} tasks={columnTasks} />;
          })}
        </div>
      </DragDropContext>
    </Card>
  );
};

export default Board;
