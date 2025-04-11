/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Skeleton } from "@/components/ui/skeleton";
import type * as React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Skeleton className="w-10 h-10 rounded-full animate-pulse" />
    </div>
  );
};
