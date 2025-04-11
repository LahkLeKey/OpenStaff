/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import type * as React from "react";

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ title = "Oops!", message }) => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
};
