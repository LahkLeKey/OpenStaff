import type React from "react";

interface LayoutGridProps {
  children: React.ReactNode;
  cols?: string;
}

const LayoutGrid: React.FC<LayoutGridProps> = ({
  children,
  cols = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
}) => {
  return <div className={`grid ${cols} gap-4 w-full`}>{children}</div>;
};

export default LayoutGrid;
