/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type TrendIndicatorProps = {
  label: string;
  value: number;
  unit?: string;
  positive?: boolean;
  className?: string;
  inline?: boolean;
};

export function TrendIndicator({
  label,
  value,
  unit = "%",
  positive = true,
  className,
  inline = false,
}: TrendIndicatorProps) {
  const arrow = positive ? (
    <ArrowUpRight className="w-4 h-4 text-green-500" />
  ) : (
    <ArrowDownRight className="w-4 h-4 text-red-500" />
  );
  const color = positive ? "text-green-700" : "text-red-700";

  const content = (
    <div className={cn("flex items-center space-x-2", className)}>
      {arrow}
      <div className="flex flex-col leading-tight">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={cn("font-semibold", color)}>
          {positive ? "+" : "-"}
          {Math.abs(value)}
          {unit}
        </span>
      </div>
    </div>
  );

  if (inline) return content;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {arrow}
        <div className={cn("text-2xl font-bold", color)}>
          {positive ? "+" : "-"}
          {Math.abs(value)}
          {unit}
        </div>
      </CardContent>
    </Card>
  );
}
