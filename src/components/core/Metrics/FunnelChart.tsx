/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  Funnel,
  LabelList,
  FunnelChart as RechartsFunnelChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Stage = {
  name: string;
  value: number;
  fill: string;
};

type FunnelCardProps = {
  title: string;
  stages: Stage[];
};

export function FunnelCard({ title, stages }: FunnelCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[280px]">
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsFunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={stages} isAnimationActive>
                <LabelList dataKey="name" position="right" fill="#6b7280" />
              </Funnel>
            </RechartsFunnelChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
