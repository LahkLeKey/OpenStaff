import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type React from "react";
import DateRangePicker from "./DateRangePicker";
import FilterBar from "./FilterBar";
import SearchInput from "./SearchInput";

interface FilterToolbarProps {
  tabs?: { label: string; value: string }[];
  activeTab?: string;
  onTabChange?: (val: string) => void;
  selectOptions?: { label: string; value: string }[];
  activeSelect?: string;
  onSelectChange?: (val: string) => void;
  search?: string;
  onSearch?: (val: string) => void;
  from?: Date;
  to?: Date;
  onDateRangeChange?: (range: { from: Date; to: Date }) => void;
}

const FilterToolbar: React.FC<FilterToolbarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  selectOptions,
  activeSelect,
  onSelectChange,
  search,
  onSearch,
  from,
  to,
  onDateRangeChange,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between w-full">
      {/* Left section: filters + date */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-wrap w-full sm:w-auto">
        <FilterBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          selectOptions={selectOptions}
          activeSelect={activeSelect}
          onSelectChange={onSelectChange}
        />
        {onDateRangeChange && <DateRangePicker from={from} to={to} onChange={onDateRangeChange} />}
      </div>

      {/* Right section: search */}
      {onSearch && typeof search === "string" && (
        <div className="w-full sm:w-auto">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full sm:min-w-[250px]"
          />
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;
