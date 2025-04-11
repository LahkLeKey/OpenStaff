import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type React from "react";
import { useState } from "react";
import { useFeed } from "./FeedContext";

interface EditFeedEventModalProps {
  id: string;
  initialMessage: string;
  initialType: "info" | "success" | "warning" | "error";
}

const EditFeedEventModal: React.FC<EditFeedEventModalProps> = ({
  id,
  initialMessage,
  initialType,
}) => {
  const { events } = useFeed();
  const [message, setMessage] = useState(initialMessage);
  const [type, setType] = useState(initialType);

  const handleSave = async () => {
    const updatedEvents = events.map((e) => (e.id === id ? { ...e, message, type } : e));
    const localforage = (await import("localforage")).default;
    await localforage.setItem("feed:events", updatedEvents);
    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Edit Feed Event</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input
            placeholder="Event message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Select
            value={type}
            onValueChange={(val) => setType(val as "info" | "success" | "warning" | "error")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={!message.trim()}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditFeedEventModal;
