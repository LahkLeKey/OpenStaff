
import "./index.css";
import { useEffect, useState, type JSX } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

import { CrewProfileDrawer } from "@/components/CrewProfileDrawer";
import { MissionPlanner } from "@/components/MissionPlanner";
import { SkillGalaxy } from "@/components/SkillGalaxy";
import { seedIfNeeded, getUsers, addUser, type User } from "./lib/crewDb";

function StatusBadge({ status }: { status: User["status"] }): JSX.Element {
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
  const { toast } = useToast();
  const [crew, setCrew] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPlannerOpen, setPlannerOpen] = useState(false);

  const handleUpdateUser = (updated: User) => {
    setCrew(prev => prev.map(user => (user.id === updated.id ? updated : user)));
  };

  const handleAssignMission = (userIds: string[]) => {
    setCrew(prev =>
      prev.map(user =>
        userIds.includes(user.id.toString()) ? { ...user, status: "on-mission" } : user
      )
    );
  };

  useEffect(() => {
    seedIfNeeded().then(() => {
      getUsers().then(setCrew);
    });
  }, []);

  const handleAddUser = () => {
    addUser(name).then((newUser) => {
      setCrew([...crew, newUser]);
      setName("");
      toast({ title: "Crew Update", description: `${newUser.name} joined the crew.` });
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="New crew member"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleAddUser}>Add</Button>
      </div>

      <div className="mb-4">
        <Button onClick={() => setPlannerOpen(true)}>Plan Mission</Button>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crew.map((user) => (
            <Card key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarFallback>{String(user.name)[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <StatusBadge status={user.status} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Skills: {(user.skills ?? []).join(", ")}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <CrewProfileDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onUpdate={handleUpdateUser}
      />

      <MissionPlanner
        crew={crew}
        open={isPlannerOpen}
        onClose={() => setPlannerOpen(false)}
        onAssign={handleAssignMission}
      />

      <SkillGalaxy crew={crew} />
    </div>
  );
}
