/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, subDays } from "date-fns";

type HeatMapCalendarProps = {
  title: string;
  data: Record<string, number>;
};

const getColor = (value: number) => {
  if (value >= 4) return "bg-indigo-600";
  if (value >= 3) return "bg-indigo-500";
  if (value >= 2) return "bg-indigo-400";
  if (value >= 1) return "bg-indigo-300";
  return "bg-muted";
};

export function HeatMapCalendar({ title, data }: HeatMapCalendarProps) {
  const today = new Date();
  const daysArray = Array.from({ length: 42 }).map((_, i) => {
    const date = subDays(today, 41 - i);
    const key = format(date, "yyyy-MM-dd");
    return { key, value: data[key] || 0 };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {daysArray.map(({ key, value }) => (
            <div
              key={key}
              className={`w-4 h-4 rounded-sm ${getColor(value)}`}
              title={`${key}: ${value} logs`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
