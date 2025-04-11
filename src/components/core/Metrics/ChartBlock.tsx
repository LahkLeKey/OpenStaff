import localforage from "localforage";
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
import WidgetCard from "./WidgetCard";

type ChartType = "line" | "bar";

interface ChartBlockProps {
  id: string;
  title: string;
  type: ChartType;
  data: { label: string; value: number }[];
  color?: string;
  description?: string;
}

const ChartBlock: React.FC<ChartBlockProps> = ({
  id,
  title,
  type,
  data,
  color = "#4f46e5",
  description,
}) => {
  const handleDelete = async () => {
    interface InsightData {
      id: string;
      label: string;
      value: number;
    }

    const current = await localforage.getItem<InsightData[]>("insights:data");
    if (!current) return;
    const filtered = current.filter((i) => i.id !== id);
    await localforage.setItem("insights:data", filtered);
    location.reload(); // simple for now
  };

  const renderChart = () => {
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
        return <></>;
    }
  };

  return (
    <WidgetCard id={id} title={title} description={description} onDelete={handleDelete}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </WidgetCard>
  );
};

export default ChartBlock;
