import { useEffect, useState } from "react";
import type { Spell } from "../lib/types/spell";
import { SpellList } from "./SpellList";
import { SpellSearch } from "./SpellSearch";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export interface HeroSectionProps {
  spells: Spell[];
}

export const HeroSection = (props: HeroSectionProps) => {
  const { spells } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [filteredSpells, setFilteredSpells] = useState<Spell[]>(spells);

  useEffect(() => {
    let results = [...spells];

    if (searchQuery.trim()) {
      results = results.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLevel !== null) {
      results = results.filter((s) => s.level === selectedLevel);
    }

    setFilteredSpells(results);
  }, [spells, searchQuery, selectedLevel]);

  return (
    <main className="container mx-auto px-4 py-8">
      <SpellSearch
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        selectedLevel={selectedLevel}
        onLevelFilter={setSelectedLevel}
      />

      <div className="flex justify-end mb-4">
        <Link
          to="/favorites"
          className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-md border border-border bg-background hover:bg-primary/50 hover:text-black transition"
        >
          <Heart className="h-4 w-4" />
          View Favorites
        </Link>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <SpellList spells={filteredSpells} />
      </div>
    </main>
  );
};
