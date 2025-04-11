/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { cn } from "@/lib/utils";
import type * as React from "react";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  underline?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  className,
  underline = false,
  children,
  ...props
}) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={cn(
        "font-bold text-foreground tracking-tight",
        level === 1 && "text-3xl",
        level === 2 && "text-2xl",
        level === 3 && "text-xl",
        level === 4 && "text-lg",
        underline && "border-b border-muted pb-1",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
