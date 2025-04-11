import EditFeedEventModal from "@/components/core/Activity/EditFeedEventModal";
import { FeedProvider, useFeed } from "@/components/core/Activity/FeedContext";
import NewFeedEventModal from "@/components/core/Activity/NewFeedEventModal";
import ConfirmDialog from "@/components/core/Shared/ConfirmDialog";
import FilterToolbar from "@/components/core/Shared/FilterToolbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import type React from "react";
import { useState } from "react";

const FeedTimeline: React.FC<{
  search: string;
  type: string;
  from?: Date;
  to?: Date;
  sort: "latest" | "oldest";
}> = ({ search, type, from, to, sort }) => {
  const { events, deleteEvent } = useFeed();

  const filtered = events.filter((event) => {
    const matchesSearch = event.message.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "all" || event.type === type;
    const eventDate = new Date(event.timestamp);
    const matchesDate = (!from || eventDate >= from) && (!to || eventDate <= to);
    return matchesSearch && matchesType && matchesDate;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aDate = new Date(a.timestamp).getTime();
    const bDate = new Date(b.timestamp).getTime();
    return sort === "latest" ? bDate - aDate : aDate - bDate;
  });

  return (
    <div className="flex flex-col gap-4">
      {sorted.map((event) => (
        <Card key={event.id} className="hover:shadow-md transition-shadow rounded-lg">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-4">
            <div className="flex items-start gap-3">
              <span
                className={`w-2.5 h-2.5 mt-1 rounded-full ${
                  {
                    success: "bg-green-500",
                    info: "bg-blue-500",
                    warning: "bg-yellow-500",
                    error: "bg-red-500",
                  }[event.type ?? "info"]
                }`}
              />
              <p className="text-sm font-medium leading-tight text-foreground">{event.message}</p>
            </div>
            <Badge
              variant="outline"
              className="text-xs font-normal text-muted-foreground whitespace-nowrap"
            >
              {formatDistanceToNow(new Date(event.timestamp), {
                addSuffix: true,
              })}
            </Badge>
          </CardHeader>
          <CardContent className="text-muted-foreground text-xs sm:text-sm px-4 pb-4 space-y-3">
            <div>
              Type: <span className="capitalize">{event.type ?? "info"}</span> • ID:{" "}
              <code className="text-xs">{event.id}</code>
            </div>
            <div className="flex gap-3">
              <EditFeedEventModal
                id={event.id}
                initialMessage={event.message}
                initialType={event.type ?? "info"}
              />
              <ConfirmDialog
                trigger={
                  <button
                    type="button"
                    className="text-xs text-red-500 underline hover:text-red-600"
                  >
                    Delete
                  </button>
                }
                title="Delete this event?"
                description="This action cannot be undone."
                onConfirm={() => deleteEvent(event.id)}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const FeedPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState<{ from: Date; to: Date } | undefined>();
  const [type, setType] = useState("all");
  const [sort, setSort] = useState<"latest" | "oldest">("latest");

  return (
    <FeedProvider>
      <main className="mx-auto max-w-5xl p-6 space-y-8">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl font-bold">📆 Activity Feed</CardTitle>
            <div className="w-full sm:w-auto sm:self-end">
              <NewFeedEventModal />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <FilterToolbar
              tabs={[
                { label: "All", value: "all" },
                { label: "Info", value: "info" },
                { label: "Success", value: "success" },
                { label: "Warning", value: "warning" },
                { label: "Error", value: "error" },
              ]}
              activeTab={type}
              onTabChange={setType}
              search={search}
              onSearch={setSearch}
              from={range?.from}
              to={range?.to}
              onDateRangeChange={setRange}
              selectOptions={[
                { label: "Newest first", value: "latest" },
                { label: "Oldest first", value: "oldest" },
              ]}
              activeSelect={sort}
              onSelectChange={(val) => setSort(val as "latest" | "oldest")}
            />
            <FeedTimeline
              search={search}
              type={type}
              from={range?.from}
              to={range?.to}
              sort={sort}
            />
          </CardContent>
        </Card>
      </main>
    </FeedProvider>
  );
};

export default FeedPage;
