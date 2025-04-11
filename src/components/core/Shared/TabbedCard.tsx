import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type React from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabbedCardProps {
  title: string;
  tabs: Tab[];
  defaultTab?: string;
}

const TabbedCard: React.FC<TabbedCardProps> = ({ title, tabs, defaultTab }) => {
  return (
    <Card className="bg-card text-card-foreground border border-border shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <Tabs defaultValue={defaultTab || tabs[0].id} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="pt-4">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </CardHeader>
    </Card>
  );
};

export default TabbedCard;
