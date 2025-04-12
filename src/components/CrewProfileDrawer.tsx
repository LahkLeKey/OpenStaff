
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { User } from "@/lib/crewDb";
import { Drawer } from "./ui/drawer";

interface CrewProfileDrawerProps {
  user: User | null;
  onClose: () => void;
  onUpdate: (updated: User) => void;
}

export function CrewProfileDrawer({ user, onClose, onUpdate }: CrewProfileDrawerProps) {
  const [editableUser, setEditableUser] = useState<User | null>(user);

  if (!user || !editableUser) return null;

  const handleChange = (field: keyof User, value: string) => {
    setEditableUser({ ...editableUser, [field]: value });
  };

  const handleSave = () => {
    if (editableUser) {
      onUpdate(editableUser);
      onClose();
    }
  };

  return (
    <Drawer open onClose={onClose}>
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">Edit Profile</h2>
        <Input
          value={editableUser.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Name"
        />
        <Input
          value={editableUser.status}
          onChange={(e) => handleChange("status", e.target.value)}
          placeholder="Status"
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Drawer>
  );
}
