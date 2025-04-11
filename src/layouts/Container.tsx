/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type * as React from "react";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
};
