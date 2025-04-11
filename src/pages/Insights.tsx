import ChartBlock from "@/components/core/Metrics/ChartBlock";
import { InsightsProvider, useInsights } from "@/components/core/Metrics/InsightsContext";
import NewInsightModal from "@/components/core/Metrics/NewInsightModal";
import FilterToolbar from "@/components/core/Shared/FilterToolbar";
import TagFilter from "@/components/core/Shared/TagFilter";
import type React from "react";
import { useEffect, useState } from "react";

const InsightList: React.FC<{
  filter: string;
  search: string;
  tags: string[];
}> = ({ filter, search, tags }) => {
  const { insights } = useInsights();

  const filtered = insights.filter((insight) => {
    const matchType = filter === "all" || insight.type === filter;
    const matchSearch = search === "" || insight.title.toLowerCase().includes(search.toLowerCase());
    const matchTags = tags.length === 0 || insight.tags?.some((tag: string) => tags.includes(tag));
    return matchType && matchSearch && matchTags;
  });

  return (
    <div className="flex flex-col gap-4">
      {filtered.map(({ id, title, description, type, data, color }) => (
        <ChartBlock
          key={id}
          id={id}
          title={title}
          description={description}
          type={type}
          data={data}
          color={color}
        />
      ))}
    </div>
  );
};

const InsightsPage: React.FC = () => {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const store = await import("localforage");
      type Insight = {
        id: string;
        title: string;
        description: string;
        type: string;
        data: Record<string, unknown>; // Replace with a more specific type if the structure is known
        tags?: string[];
        color?: string;
      };
      const insights = await store.default.getItem<Insight[]>("insights:data");
      const all = Array.from(new Set(insights?.flatMap((i) => i.tags ?? []) ?? []));
      setAllTags(all);
    };
    load();
  }, []);

  return (
    <InsightsProvider>
      <main className="mx-auto max-w-7xl p-6 space-y-8">
        {/* Header with modal */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">📊 Insights</h1>
          <div className="w-full sm:w-auto sm:self-end">
            <NewInsightModal />
          </div>
        </div>

        {/* Filters and list */}
        <div className="space-y-4">
          <FilterToolbar
            tabs={[
              { label: "All", value: "all" },
              { label: "Line", value: "line" },
              { label: "Bar", value: "bar" },
            ]}
            activeTab={tab}
            onTabChange={setTab}
            search={search}
            onSearch={setSearch}
          />
          {allTags.length > 0 && <TagFilter tags={allTags} selected={tags} onChange={setTags} />}
          <InsightList filter={tab} search={search} tags={tags} />
        </div>
      </main>
    </InsightsProvider>
  );
};

export default InsightsPage;
