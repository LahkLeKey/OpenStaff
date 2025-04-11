// src/components/dashboard/Sidebar.tsx
import { Button } from "@/components/ui/button";
import { RocketIcon, UsersIcon, BriefcaseIcon, SettingsIcon } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-background border-r p-4 space-y-4">
      <div className="text-2xl font-bold text-center mb-6">🛰 OpenStaff</div>
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start"><RocketIcon className="mr-2" /> Dashboard</Button>
        <Button variant="ghost" className="w-full justify-start"><UsersIcon className="mr-2" /> Users</Button>
        <Button variant="ghost" className="w-full justify-start"><BriefcaseIcon className="mr-2" /> Jobs</Button>
        <Button variant="ghost" className="w-full justify-start"><SettingsIcon className="mr-2" /> Settings</Button>
      </nav>
    </aside>
  );
}
