// src/App.tsx
import "./index.css";
import { APITester } from "./APITester";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

// 🌠 Mock Crew Data
type User = { id: number; name: string };
let users: User[] = [
  { id: 1, name: "Nova Bright" },
  { id: 2, name: "Orion Flux" },
];
let nextId = 3;

const mockDb = {
  getUsers: () => Promise.resolve([...users]),
  addUser: (name: string) => {
    const user = { id: nextId++, name };
    users.push(user);
    return Promise.resolve(user);
  },
};

export function App() {
  const [crew, setCrew] = useState<User[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    mockDb.getUsers().then(setCrew);
  }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    const user = await mockDb.addUser(newName);
    setCrew((prev) => [...prev, user]);
    setNewName("");
  };

  return (
    <div className="container mx-auto p-8 text-center relative z-10 space-y-12">
      {/* 🚀 Branding Logos */}
      <div className="flex justify-center items-center gap-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
        <img
          src={reactLogo}
          alt="React Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
        />
      </div>

      {/* 🌌 OpenStaff Card */}
      <Card className="bg-card/50 backdrop-blur-sm border-muted max-w-2xl mx-auto text-left">
        <CardHeader>
          <CardTitle className="text-center text-3xl">🛰 OpenStaff Crew Manifest</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-48 border rounded-md p-2">
            <ul className="space-y-1">
              {crew.map((u) => (
                <li key={u.id}>⭐ {u.name}</li>
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

      {/* 🧪 API Test Panel */}
      <Card className="bg-card/50 backdrop-blur-sm border-muted max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-2">API Tester</h2>
          <APITester />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
