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

const NewFeedEventModal: React.FC = () => {
  const { addEvent } = useFeed();
  const [message, setMessage] = useState("");
  type EventType = "info" | "success" | "warning" | "error";
  const [type, setType] = useState<EventType>("info");
  const [open, setOpen] = useState(false); // ✅ control dialog state

  const handleSubmit = () => {
    if (!message.trim()) return;
    addEvent({
      type: type,
      timestamp: new Date().toISOString(),
      message: "",
    });
    setMessage(""); // Reset fields
    setType("info");
    setOpen(false); // ✅ Close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto w-full sm:w-auto">
          + Log Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Log New Event</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input
            placeholder="Event message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Select value={type} onValueChange={setType}>
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
          <Button onClick={handleSubmit} disabled={!message.trim()}>
            Add Event
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewFeedEventModal;
