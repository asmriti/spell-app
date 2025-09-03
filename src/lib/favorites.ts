import type { FavoriteSpell } from "./types/spell";

const FAVORITES_KEY = "dnd-spell-favorites";

export function getFavorites(): FavoriteSpell[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading favorites from localStorage:", error);
    return [];
  }
}

export function addToFavorites(spell: {
  index: string;
  name: string;
  level: number;
}): void {
  if (typeof window === "undefined") return;

  try {
    const favorites = getFavorites();
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.index === spell.index
    );

    if (!isAlreadyFavorite) {
      const newFavorite: FavoriteSpell = {
        ...spell,
        dateAdded: new Date().toISOString(),
      };
      const updatedFavorites = [...favorites, newFavorite];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
}

export function removeFromFavorites(spellIndex: string): void {
  if (typeof window === "undefined") return;

  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(
      (fav) => fav.index !== spellIndex
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
}

export function isFavorite(spellIndex: string): boolean {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.index === spellIndex);
}
