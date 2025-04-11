/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
