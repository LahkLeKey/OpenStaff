import { Input } from "@/components/ui/input";
import type React from "react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="w-full sm:max-w-sm">
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-sm"
      />
    </div>
  );
};

export default SearchInput;
