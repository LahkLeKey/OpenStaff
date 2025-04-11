/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { cn } from "@/lib/utils";
import type * as React from "react";

type FlexProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "col";
  justify?: string;
  align?: string;
  gap?: string;
};

export const Flex: React.FC<FlexProps> = ({
  children,
  className,
  direction = "row",
  justify = "start",
  align = "center",
  gap = "gap-4",
}) => {
  return (
    <div
      className={cn(
        "flex",
        `flex-${direction}`,
        `justify-${justify}`,
        `items-${align}`,
        gap,
        className,
      )}
    >
      {children}
    </div>
  );
};
