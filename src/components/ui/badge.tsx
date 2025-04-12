import * as React from "react";

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center px-2 py-1 text-sm rounded bg-muted text-foreground ${className}`}>{children}</span>;
}
