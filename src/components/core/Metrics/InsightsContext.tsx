import localforage from "localforage";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Insight = {
  tags: string[];
  id: string;
  title: string;
  description?: string;
  type: "line" | "bar";
  data: { label: string; value: number }[];
  color?: string;
};

type InsightsContextType = {
  insights: Insight[];
};

const InsightsContext = createContext<InsightsContextType | undefined>(undefined);

export const useInsights = () => {
  const context = useContext(InsightsContext);
  if (!context) throw new Error("useInsights must be used within InsightsProvider");
  return context;
};

export const InsightsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const load = async () => {
      const stored = await localforage.getItem<Insight[]>("insights:data");
      if (stored) {
        setInsights(stored);
      } else {
        const initial: Insight[] = [
          {
            id: "1",
            title: "User Signups",
            description: "New registrations over the last 5 days",
            type: "line",
            data: [
              { label: "Mon", value: 120 },
              { label: "Tue", value: 98 },
              { label: "Wed", value: 140 },
              { label: "Thu", value: 200 },
              { label: "Fri", value: 180 },
            ],
            color: "#4f46e5",
            tags: [],
          },
          {
            id: "2",
            title: "Session Duration",
            description: "Avg. time spent in app (Q1-Q4)",
            type: "bar",
            data: [
              { label: "Q1", value: 5.2 },
              { label: "Q2", value: 6.1 },
              { label: "Q3", value: 4.9 },
              { label: "Q4", value: 6.5 },
            ],
            color: "#22c55e",
            tags: [],
          },
        ];
        setInsights(initial);
        await localforage.setItem("insights:data", initial);
      }
    };
    load();
  }, []);

  return <InsightsContext.Provider value={{ insights }}>{children}</InsightsContext.Provider>;
};
