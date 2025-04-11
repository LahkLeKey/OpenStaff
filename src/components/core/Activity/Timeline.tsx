import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import type React from "react";

type EventItem = {
  id: string;
  message: string;
  type?: "info" | "warning" | "success" | "error";
  timestamp: string;
};

const mockEvents: EventItem[] = [
  {
    id: "1",
    message: "Login route deployed",
    type: "success",
    timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
  },
  {
    id: "2",
    message: "New user signed up: Elena",
    type: "info",
    timestamp: new Date(Date.now() - 7200 * 1000).toISOString(),
  },
  {
    id: "3",
    message: "Payment webhook failed",
    type: "error",
    timestamp: new Date(Date.now() - 9600 * 1000).toISOString(),
  },
];

const typeColorMap: Record<string, string> = {
  success: "bg-green-500",
  info: "bg-blue-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
};

const Timeline: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {mockEvents.map((event) => (
        <Card key={event.id} className="border-border bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${typeColorMap[event.type ?? "info"]}`} />
              <p className="text-sm font-medium leading-tight">{event.message}</p>
            </div>
            <Badge variant="outline" className="text-xs font-normal">
              {formatDistanceToNow(new Date(event.timestamp), {
                addSuffix: true,
              })}
            </Badge>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-muted-foreground text-xs sm:text-sm">
            Type: {event.type ?? "info"} • ID: {event.id}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Timeline;
