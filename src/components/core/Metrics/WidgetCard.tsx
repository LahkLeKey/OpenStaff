import ConfirmDialog from "@/components/core/Shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type React from "react";
import EditInsightModal from "./EditInsightModal";

interface WidgetCardProps {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onDelete: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  id,
  title,
  description,
  icon,
  onDelete,
  children,
  actions,
}) => {
  return (
    <Card className="bg-card text-card-foreground border border-border shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl">
      <CardHeader className="pb-2 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex items-start gap-3">
            {icon && <span className="text-xl text-muted-foreground pt-1">{icon}</span>}
            <div>
              <CardTitle className="text-base leading-snug">{title}</CardTitle>
              {description && (
                <CardDescription className="text-sm text-muted-foreground">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            {actions}
            <EditInsightModal id={id} initialTitle={title} initialDescription={description || ""} />
            <ConfirmDialog
              trigger={
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10"
                >
                  Delete
                </Button>
              }
              title="Delete Insight?"
              description="This will permanently remove this chart."
              onConfirm={onDelete}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-60 p-3 bg-muted/40 rounded-md overflow-hidden">
        <div className="w-full h-full overflow-auto">{children}</div>
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
