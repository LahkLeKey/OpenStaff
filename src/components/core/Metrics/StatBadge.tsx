/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

type StatBadgeProps = {
  value: string | number;
  delta?: number;
  positive?: boolean;
  className?: string;
  iconOnly?: boolean;
};

export function StatBadge({ value, delta, positive, className }: StatBadgeProps) {
  let icon = <Minus className="w-3 h-3" />;
  let color = "bg-muted text-muted-foreground";

  if (typeof delta === "number") {
    icon = positive ? (
      <ArrowUpRight className="w-3 h-3 text-green-600" />
    ) : (
      <ArrowDownRight className="w-3 h-3 text-red-600" />
    );
    color = positive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  }

  return (
    <Badge
      variant="outline"
      className={cn("flex items-center gap-1 px-2.5 py-1.5 text-sm", color, className)}
    >
      {icon}
      <span>{value}</span>
    </Badge>
  );
}
