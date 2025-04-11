/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

type GaugeMeterProps = {
  title: string;
  percentage: number;
  color?: string;
};

export function GaugeMeter({ title, percentage, color = "#4f46e5" }: GaugeMeterProps) {
  const data = [{ name: "Progress", value: percentage, fill: color }];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative h-[240px]">
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="90%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={20}
              startAngle={180}
              endAngle={0}
              data={data}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar background clockWise dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4 text-2xl font-bold text-center">
          {percentage}%
        </div>
      </CardContent>
    </Card>
  );
}
