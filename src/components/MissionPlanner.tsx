
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/crewDb";
import { useState } from "react";

interface MissionPlannerProps {
  crew: User[];
  open: boolean;
  onClose: () => void;
  onAssign: (userIds: string[]) => void;
}

export function MissionPlanner({ crew, open, onClose, onAssign }: MissionPlannerProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleUser = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleAssign = () => {
    onAssign(selected);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Plan a New Mission</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {crew
            .filter((u) => u.status === "available")
            .map((u) => (
              <div
                key={u.id}
                className={`p-2 border rounded cursor-pointer ${
                  selected.includes(u.id) ? "bg-blue-100" : ""
                }`}
                onClick={() => toggleUser(u.id)}
              >
                {u.name}
              </div>
            ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAssign}>Assign</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
