import { SpellCard } from "./SpellCard";
import type { Spell } from "../lib/types/spell";
import { SpellDetailModal } from "./SpellDetailModal";
import { useState } from "react";
import { paginateSpells } from "../lib/paginate";
import { Pagination, Stack } from "@mui/material";
export interface SpellListProps {
  spells: Spell[];
}

export const SpellList = (props: SpellListProps) => {
  const { spells } = props;

  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const paginatedData = paginateSpells(spells, currentPage, itemsPerPage);
  const { spells: displayedSpells, totalPages } = paginatedData;

  const handleViewDetails = (spell: Spell) => {
    setSelectedSpell(spell);
    setIsModalOpen(true);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  if (spells.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-lg mb-2">No spells found</div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedSpells.map((spell) => (
          <SpellCard
            key={spell.index}
            spell={spell}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-center text-sm text-muted-foreground mt-4">
            Showing {displayedSpells.length} of {spells.length} spells
          </div>
          <Stack spacing={2} alignItems="center" className="mt-8">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              size="large"
            />
          </Stack>
        </div>
      )}

      <SpellDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        spell={selectedSpell}
      />
    </>
  );
};
