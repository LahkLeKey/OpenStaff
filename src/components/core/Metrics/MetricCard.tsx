import type React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartType = "line" | "bar";

type DataPoint = {
  label: string;
  value: number;
};

type ChartConfig = {
  [key: string]: {
    color?: string;
    label?: string;
  };
};

interface MetricCardProps {
  title: string;
  type: ChartType;
  data: DataPoint[];
  config: ChartConfig;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, type, data, config }) => {
  const seriesKey = Object.keys(config)[0];
  const color = config[seriesKey]?.color || "#4f46e5";

  const renderChart = () => {
    const commonProps = {
      data,
      width: "100%",
      height: "100%",
    };

    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-card text-card-foreground border border-border rounded-md shadow-sm p-4 space-y-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricCard;
