// src/frontend.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./components/ui/theme-provider";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="openstaff-theme">
      <>
        <App />
        <Toaster />
      </>
    </ThemeProvider>
  </StrictMode>
);

if (import.meta.hot) {
  const root = (import.meta.hot.data.root ??= ReactDOM.createRoot(elem));
  root.render(app);
} else {
  ReactDOM.createRoot(elem).render(app);
}
