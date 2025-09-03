import { useEffect, useState } from "react";
import type { FavoriteSpell } from "../lib/types/spell";
import { getFavorites, removeFromFavorites } from "../lib/favorites";
import { Heart } from "lucide-react";
import { SpellCard } from "./SpellCard";

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<FavoriteSpell[]>([]);

  const loadFavorites = () => setFavorites(getFavorites());

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemoveFavorite = (spellIndex: string) => {
    removeFromFavorites(spellIndex);
    loadFavorites();
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-12 w-12 mx-auto mb-4" />
        <div className="text-lg mb-2">No favorite spells yet</div>
        <p className="text-sm">
          Browse spells and click the heart icon to add them to your favorites.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm mb-4">
        {favorites.length} favorite spell{favorites.length !== 1 ? "s" : ""}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((favoriteSpell) => (
          <SpellCard
            key={favoriteSpell.index}
            spell={favoriteSpell}
            dateAdded={favoriteSpell.dateAdded}
            showRemove={true}
            onRemove={handleRemoveFavorite}
          />
        ))}
      </div>
    </div>
  );
};
