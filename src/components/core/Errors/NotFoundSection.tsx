/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { HeatMapCalendar } from "@/components/core/Metrics/HeatMapCalendar";
import type * as React from "react";
import { ErrorMessage } from "./ErrorMessage";
import { GoHomeLink } from "./GoHomeLink";

export const NotFoundSection: React.FC = () => {
  const today = new Date();
  const heatmapMock: Record<string, number> = {};
  for (let i = 0; i < 42; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const k = d.toISOString().slice(0, 10);
    heatmapMock[k] = Math.floor(Math.random() * 5);
  }

  return (
    <section className="p-4 max-w-md mx-auto flex flex-col justify-center items-center h-[90vh] text-center space-y-6">
      <ErrorMessage message="🚫 Lost in space. We couldn't find that route." />
      <GoHomeLink />
      <HeatMapCalendar title="Recent Mission Activity" data={heatmapMock} />
    </section>
  );
};
