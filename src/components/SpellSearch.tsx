import { Search, X } from "lucide-react";
import { useState } from "react";
import Select from "react-select";

interface SpellSearchProps {
  onSearch: (query: string) => void;
  onLevelFilter: (level: number | null) => void;
  selectedLevel: number | null;
  searchQuery: string;
}

export const SpellSearch = (props: SpellSearchProps) => {
  const { onSearch, onLevelFilter, selectedLevel, searchQuery } = props;
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearchChange = (value: string) => {
    setLocalQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setLocalQuery("");
    onSearch("");
  };

  const clearLevelFilter = () => {
    onLevelFilter(null);
  };

  const spellLevels = [
    { value: 0, label: "Cantrip" },
    { value: 1, label: "1st Level" },
    { value: 2, label: "2nd Level" },
    { value: 3, label: "3rd Level" },
    { value: 4, label: "4th Level" },
    { value: 5, label: "5th Level" },
    { value: 6, label: "6th Level" },
    { value: 7, label: "7th Level" },
    { value: 8, label: "8th Level" },
    { value: 9, label: "9th Level" },
  ];

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            placeholder="Search spells by name..."
            value={localQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="px-10 py-1 bg-card border border-border rounded-md focus:ring-primary focus-visible:outline-none transition-all duration-200 w-full placeholder:text-sm"
          />
          {localQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Select
            className="w-[180px] text-sm"
            value={
              spellLevels.find((lvl) => lvl.value === selectedLevel) || null
            }
            onChange={(option) => onLevelFilter(option?.value ?? null)}
            options={spellLevels}
            isClearable
            placeholder="All Levels"
          />

          {selectedLevel !== null && (
            <button
              onClick={clearLevelFilter}
              className="px-3 bg-transparent hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
