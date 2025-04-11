/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Loading } from "@/layouts/Loading";
import { type ComponentType, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

export function withErrorBoundary<P>(Component: ComponentType<P>) {
  return function ErrorWrapped(props: P) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}
