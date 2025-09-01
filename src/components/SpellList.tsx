import { useEffect, useState } from "react";
import { SpellCard } from "./SpellCard";
import { fetchSpells } from "../lib/api";
import type { Spell } from "../lib/types/spell";

export const SpellList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [spells, setSpells] = useState<Spell[]>([]);

  const loadSpells = async () => {
    try {
      setLoading(true);
      setError(null);
      const spellData = await fetchSpells();
      setSpells(spellData);
    } catch (err) {
      setError("Failed to load spells.");
      console.error("Error loading spells:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpells();
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {spells.map((spell) => (
          <SpellCard key={spell.index} spell={spell} />
        ))}
      </div>
    </>
  );
};
