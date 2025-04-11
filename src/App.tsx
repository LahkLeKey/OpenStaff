/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import "./index.css";
import { Card, CardContent } from "@/components/ui/card";
import { DayPickerProvider } from "react-day-picker";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <DayPickerProvider initialProps={{ mode: "default" }}>
      <Card className="rounded-none border-0 shadow-none min-h-screen">
        <CardContent className="p-0">
          <AppRoutes />
        </CardContent>
      </Card>
    </DayPickerProvider>
  );
}
