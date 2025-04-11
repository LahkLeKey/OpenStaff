/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { ActivityTicker } from "@/components/core/Metrics/ActivityTicker";
import { ChartCard } from "@/components/core/Metrics/ChartCard";
import { FunnelCard } from "@/components/core/Metrics/FunnelChart";
import { MetricGrid } from "@/components/core/Metrics/MetricGrid";
import { StatBadge } from "@/components/core/Metrics/StatBadge";
import { TrendIndicator } from "@/components/core/Metrics/TrendIndicator";
import { UsageDonut } from "@/components/core/Metrics/UsageDonut";
import { useEffect } from "react";

export default function DashboardPage() {
  const mockChartData = [
    { label: "Mon", value: 240 },
    { label: "Tue", value: 221 },
    { label: "Wed", value: 280 },
    { label: "Thu", value: 390 },
    { label: "Fri", value: 320 },
    { label: "Sat", value: 500 },
    { label: "Sun", value: 430 },
  ];

  const metricData = [
    { label: "Sessions", value: 1345 },
    { label: "Conversion Rate", value: 6.8, unit: "%" },
    { label: "Avg. Session Time", value: "3m 22s" },
    { label: "Bounce Rate", value: 38.1, unit: "%" },
  ];

  const mockUsageData = [
    { name: "Used", value: 72, color: "#4f46e5" },
    { name: "Available", value: 28, color: "#e5e7eb" },
  ];

  const mockFunnelData = [
    { name: "Landing", value: 2400, fill: "#4f46e5" },
    { name: "Signup", value: 1800, fill: "#6366f1" },
    { name: "Onboarded", value: 1100, fill: "#818cf8" },
    { name: "Activated", value: 800, fill: "#a5b4fc" },
  ];

  const activityFeed: {
    id: string;
    type: "info" | "success" | "launch" | "warning";
    message: string;
    timestamp: string;
  }[] = [
    {
      id: "1",
      type: "launch",
      message: "Initiated engine ignition sequence",
      timestamp: "04:22 UTC",
    },
    {
      id: "2",
      type: "success",
      message: "Navigation AI v9.2 deployed",
      timestamp: "03:57 UTC",
    },
    {
      id: "3",
      type: "info",
      message: "Course correction uploaded",
      timestamp: "03:45 UTC",
    },
    {
      id: "4",
      type: "warning",
      message: "Power dip in Sector 7-B",
      timestamp: "03:22 UTC",
    },
    {
      id: "5",
      type: "success",
      message: "All systems passed diagnostics",
      timestamp: "03:00 UTC",
    },
  ];

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <div className="flex flex-wrap gap-3 col-span-full">
        <StatBadge value="+12.5%" delta={12.5} positive />
        <StatBadge value="-5 signups" delta={5} positive={false} />
        <StatBadge value="Stable" />
      </div>

      <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TrendIndicator label="Retention Rate" value={5.2} unit="%" positive />
        <TrendIndicator label="Drop-off" value={3.1} unit="%" positive={false} />
      </div>

      <ChartCard title="Weekly Active Users" data={mockChartData} />
      <UsageDonut title="Quota Usage" data={mockUsageData} />
      <MetricGrid title="Performance Overview" metrics={metricData} columns="grid-cols-2" />
      <FunnelCard title="User Journey Funnel" stages={mockFunnelData} />
      <ActivityTicker title="Mission Event Log" events={activityFeed} />
    </div>
  );
}
