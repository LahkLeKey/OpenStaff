/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Metric = {
  label: string;
  value: number | string;
  unit?: string;
  className?: string;
};

type MetricGridProps = {
  title?: string;
  metrics: Metric[];
  columns?: string;
};

export function MetricGrid({ title, metrics, columns = "grid-cols-2" }: MetricGridProps) {
  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className={cn("grid gap-4", columns)}>
          {metrics.map((metric) => (
            <div key={metric.label} className={cn("flex flex-col", metric.className)}>
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <span className="text-xl font-bold">
                {metric.value}
                {metric.unit && (
                  <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
