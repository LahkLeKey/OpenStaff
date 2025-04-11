// src/frontend.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App"; // ← default export

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.hot) {
  const root = (import.meta.hot.data.root ??= ReactDOM.createRoot(elem));
  root.render(app);
} else {
  ReactDOM.createRoot(elem).render(app);
}
