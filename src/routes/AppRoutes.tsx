/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { withErrorBoundary } from "@/components/core/Boundary/withErrorBoundary";
import { Loading } from "@/layouts/Loading";
import MainLayout from "@/layouts/MainLayout";
import React, { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

const Dashboard = withErrorBoundary(lazy(() => import("@/pages/Dashboard")));
const Feed = withErrorBoundary(lazy(() => import("@/pages/Feed")));
const SprintBoard = withErrorBoundary(lazy(() => import("@/pages/Board")));
const Insights = withErrorBoundary(lazy(() => import("@/pages/Insights")));
const NotFound = withErrorBoundary(lazy(() => import("@/pages/NotFound")));
const Blob = withErrorBoundary(lazy(() => import("@/pages/Blob")));

export default function AppRoutes() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/boards" element={<SprintBoard />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/blob" element={<Blob />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
