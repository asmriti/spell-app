import type { Spell } from "./types/spell";

export function paginateSpells(
  spells: Spell[],
  page: number,
  itemsPerPage: number
) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return {
    spells: spells.slice(startIndex, endIndex),
    totalPages: Math.ceil(spells.length / itemsPerPage),
    currentPage: page,
    totalItems: spells.length,
  };
}
