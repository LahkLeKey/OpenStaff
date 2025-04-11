/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type RadarScanProps = {
  title: string;
  data: { metric: string; score: number }[];
  color?: string;
};

export function RadarScan({ title, data, color = "#4f46e5" }: RadarScanProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Tooltip />
              <Radar name="Systems" dataKey="score" stroke={color} fill={color} fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
