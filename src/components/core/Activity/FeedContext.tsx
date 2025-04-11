import localforage from "localforage";
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type FeedEvent = {
  id: string;
  message: string;
  type?: "info" | "warning" | "success" | "error";
  timestamp: string;
};

type FeedContextType = {
  deleteEvent: (id: string) => void;
  events: FeedEvent[];
  addEvent: (event: Omit<FeedEvent, "id">) => void;
};

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const useFeed = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error("useFeed must be used within a FeedProvider");
  }
  return context;
};

export const FeedProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<FeedEvent[]>([]);

  useEffect(() => {
    localforage.getItem<FeedEvent[]>("feed:events").then((data) => {
      if (data) setEvents(data);
    });
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localforage.setItem("feed:events", events);
    }
  }, [events]);

  const addEvent = (event: Omit<FeedEvent, "id">) => {
    const newEvent: FeedEvent = {
      ...event,
      id: `event-${Date.now()}`,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    localforage.setItem("feed:events", updated);
  };

  return (
    <FeedContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </FeedContext.Provider>
  );
};
