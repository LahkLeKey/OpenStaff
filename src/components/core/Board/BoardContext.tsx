import localforage from "localforage";
import type React from "react";
import { type ReactNode, createContext, useContext, useEffect, useState } from "react";
import type { Column, Task } from "./Board";

type BoardContextType = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  setTasks: React.Dispatch<React.SetStateAction<Record<string, Task>>>;
  setColumns: React.Dispatch<React.SetStateAction<Record<string, Column>>>;
  isLoaded: boolean;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};

const defaultTasks: Record<string, Task> = {
  "1": {
    id: "1",
    title: "Design homepage",
    status: "todo",
    assignee: "Elena",
    priority: "high",
    tags: ["design"],
    due: "2025-05-01",
  },
  "2": {
    id: "2",
    title: "Login flow",
    status: "todo",
    assignee: "Jordan",
    priority: "medium",
    tags: ["auth"],
    due: "2025-05-02",
  },
  "3": {
    id: "3",
    title: "Backend sync",
    status: "in-progress",
    assignee: "Kai",
    priority: "low",
    tags: ["api"],
    due: "2025-05-03",
  },
  "4": {
    id: "4",
    title: "QA report",
    status: "review",
    assignee: "Morgan",
    priority: "medium",
    tags: ["testing"],
    due: "2025-05-04",
  },
};

const defaultColumns: Record<string, Column> = {
  todo: { id: "todo", title: "To Do", taskIds: ["1", "2"] },
  "in-progress": { id: "in-progress", title: "In Progress", taskIds: ["3"] },
  review: { id: "review", title: "In Review", taskIds: ["4"] },
  done: { id: "done", title: "Done", taskIds: [] },
};

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Record<string, Task>>(defaultTasks);
  const [columns, setColumns] = useState<Record<string, Column>>(defaultColumns);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localforage on mount
  useEffect(() => {
    const loadState = async () => {
      const savedTasks = await localforage.getItem<Record<string, Task>>("board:tasks");
      const savedColumns = await localforage.getItem<Record<string, Column>>("board:columns");
      if (savedTasks) setTasks(savedTasks);
      if (savedColumns) setColumns(savedColumns);
      setIsLoaded(true);
    };
    loadState();
  }, []);

  // Save on change
  useEffect(() => {
    if (isLoaded) {
      localforage.setItem("board:tasks", tasks);
      localforage.setItem("board:columns", columns);
    }
  }, [tasks, columns, isLoaded]);

  return (
    <BoardContext.Provider value={{ tasks, columns, setTasks, setColumns, isLoaded }}>
      {children}
    </BoardContext.Provider>
  );
};
