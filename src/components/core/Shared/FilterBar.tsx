import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type React from "react";

interface FilterBarProps {
  tabs?: { label: string; value: string }[];
  activeTab?: string;
  onTabChange?: (val: string) => void;
  selectOptions?: { label: string; value: string }[];
  activeSelect?: string;
  onSelectChange?: (val: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  tabs = [],
  activeTab,
  onTabChange,
  selectOptions = [],
  activeSelect,
  onSelectChange,
}) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 w-full">
      {/* Tabs block */}
      {tabs.length > 0 && (
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full sm:w-auto">
          <TabsList className="flex flex-wrap justify-start gap-2 sm:gap-3">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Select block */}
      {selectOptions.length > 0 && (
        <div className="w-full sm:w-48">
          <Select value={activeSelect} onValueChange={onSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
