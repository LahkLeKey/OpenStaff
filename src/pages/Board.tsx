import Board from "@/components/core/Board/Board";
import { BoardProvider } from "@/components/core/Board/BoardContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type React from "react";

const SprintBoardPage: React.FC = () => {
  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🗂 Board</CardTitle>
        </CardHeader>
        <CardContent>
          <BoardProvider>
            <Board />
          </BoardProvider>
        </CardContent>
      </Card>
    </main>
  );
};

export default SprintBoardPage;
