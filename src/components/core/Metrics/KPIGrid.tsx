import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type React from "react";

interface KPI {
  id: string;
  label: string;
  value: string | number;
  delta?: number;
  unit?: string;
  positive?: boolean;
}

const mockKpis: KPI[] = [
  { id: "1", label: "Active Users", value: 1423, delta: 12.5, positive: true },
  { id: "2", label: "Bounce Rate", value: "36%", delta: -2.1, positive: false },
  { id: "3", label: "Avg. Session", value: "5m 32s" },
  { id: "4", label: "Signups", value: 329, delta: 18.4, positive: true },
];

const KPIGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {mockKpis.map((kpi) => (
        <Card key={kpi.id} className="bg-card text-card-foreground border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">{kpi.label}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-semibold">{kpi.value}</p>
            {typeof kpi.delta === "number" && (
              <Badge
                variant="outline"
                className={`mt-1 text-xs ${
                  kpi.positive ? "text-green-600 border-green-600" : "text-red-500 border-red-500"
                }`}
              >
                {kpi.positive ? "▲" : "▼"} {Math.abs(kpi.delta)}%
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KPIGrid;
