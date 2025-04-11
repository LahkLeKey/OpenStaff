import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import type React from "react";

interface DateRangePickerProps {
  from?: Date;
  to?: Date;
  onChange: (range: { from: Date; to: Date }) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ from, to, onChange }) => {
  const handleSelect = (date: Date) => {
    if (!from || (from && to)) {
      onChange({ from: date, to: date });
    } else {
      const newFrom = from < date ? from : date;
      const newTo = from > date ? from : date;
      onChange({ from: newFrom, to: newTo });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto justify-start text-left">
          {from && to ? `${format(from, "MMM dd")} - ${format(to, "MMM dd")}` : "Pick a date range"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={{ from, to }}
          onSelect={({ from, to }) => {
            if (from && to) onChange({ from, to });
          }}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
