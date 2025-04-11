/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AlertTriangle, Calendar, CheckCircle, Rocket } from "lucide-react";

type LogItem = {
  id: string;
  type: "info" | "success" | "warning" | "launch";
  message: string;
  timestamp: string;
};

const icons = {
  info: Calendar,
  success: CheckCircle,
  warning: AlertTriangle,
  launch: Rocket,
};

const colors = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  launch: "text-indigo-500",
};

type ActivityTickerProps = {
  title?: string;
  events: LogItem[];
};

export function ActivityTicker({ title = "Ship Log", events }: ActivityTickerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[260px] p-0">
        <ScrollArea className="h-full px-4 py-2">
          <ul className="space-y-4">
            {events.map((event) => {
              const Icon = icons[event.type];
              return (
                <li key={event.id} className="flex items-start gap-3">
                  <Icon className={cn("w-5 h-5 mt-0.5", colors[event.type])} />
                  <div>
                    <p className="text-sm text-muted-foreground">{event.message}</p>
                    <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
