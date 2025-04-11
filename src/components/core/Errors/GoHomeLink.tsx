/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Button } from "@/components/ui/button";
import type * as React from "react";
import { Link } from "react-router-dom";

export const GoHomeLink: React.FC = () => {
  return (
    <div className="flex justify-center mt-4">
      <Button asChild>
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  );
};
