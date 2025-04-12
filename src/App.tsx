// src/App.tsx
import "./index.css";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { seedIfNeeded, getUsers, addUser, type User } from "./lib/crewDb";
import { useToast } from "@/components/ui/use-toast";

function StatusBadge({ status }: { status: User["status"] }) {
  const color =
    status === "available"
      ? "bg-green-500"
      : status === "on-mission"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <Badge className="pl-2 pr-3 flex items-center gap-1">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {status.replace("-", " ")}
    </Badge>
  );
}

export function App() {
  const [crew, setCrew] = useState<User[]>([]);
  const [newName, setNewName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    seedIfNeeded().then(() => getUsers().then(setCrew));
  }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    const user = await addUser(newName);
    setCrew((prev) => [...prev, user]);
    setNewName("");

    toast({
      title: "New crew member added 🚀",
      description: `${user.role} ${user.name} has boarded the ship.`,
    });
  };

  return (
    <div className="container mx-auto p-8 text-center relative z-10 space-y-12">
      <Card className="bg-card/50 backdrop-blur-sm border-muted max-w-2xl mx-auto text-left">
        <CardHeader>
          <CardTitle className="text-center text-3xl">🛰 OpenStaff Crew Manifest</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-60 border rounded-md p-2">
            <ul className="space-y-4">
              {crew.map((user) => (
                <li key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.role}</div>
                    </div>
                  </div>
                  <StatusBadge status={user.status} />
                </li>
              ))}
            </ul>
          </ScrollArea>

          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Add a new crew member..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Button onClick={handleAdd}>Add</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
