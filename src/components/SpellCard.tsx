import { Calendar, Eye, Heart, Sparkles, Trash2 } from "lucide-react";
import type { Spell } from "../lib/types/spell";
import { getLevelColor } from "../lib/color";
import { getLevelDisplay } from "../lib/level";
import { useState } from "react";
import {
  addToFavorites,
  isFavorite,
  removeFromFavorites,
} from "../lib/favorites";
import { IconButton, Tooltip } from "@mui/material";

export interface SpellCardProps {
  spell: Spell;
  onViewDetails?: (spell: Spell) => void;
  dateAdded?: string;
  showRemove?: boolean;
  onRemove?: (spellIndex: string) => void;
}

export const SpellCard = (props: SpellCardProps) => {
  const { spell, onViewDetails, dateAdded, showRemove, onRemove } = props;
  const [isSpellFavorite, setIsSpellFavorite] = useState(() =>
    isFavorite(spell.index)
  );

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSpellFavorite) {
      removeFromFavorites(spell.index);
      setIsSpellFavorite(false);
    } else {
      addToFavorites(spell);
      setIsSpellFavorite(true);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.(spell.index);
  };

  return (
    <div className=" flex flex-col gap-6 rounded-xl border p-6 shadow-sm group hover:shadow-lg transition-all duration-200 cursor-pointer border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3>{spell.name}</h3>

        <div className="flex items-center gap-2">
          {!showRemove && (
            <Tooltip
              title={
                isSpellFavorite ? "Remove from Favorites" : "Add to Favorites"
              }
            >
              <IconButton>
                <button
                  className="cursor-pointer"
                  onClick={handleFavoriteToggle}
                >
                  <Heart
                    className={`h-4 w-4 transition hover:fill-primary text-primary ${
                      isSpellFavorite ? "fill-primary" : ""
                    }`}
                  />
                </button>
              </IconButton>
            </Tooltip>
          )}

          {showRemove && onRemove && (
            <Tooltip title="Delete">
              <IconButton>
                <button
                  onClick={handleRemove}
                  className="shrink-0 text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <div
          className={`text-xs px-2 py-0.5 rounded-md ${getLevelColor(
            spell.level
          )}`}
        >
          {getLevelDisplay(spell.level)}
        </div>
      </div>

      {dateAdded && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          Added {formatDate(dateAdded)}
        </div>
      )}

      {onViewDetails && (
        <button
          onClick={() => onViewDetails(spell)}
          className="w-full h-8 transition-colors px-3 text-sm rounded-md cursor-pointer inline-flex items-center justify-center gap-2 border border-border bg-background hover:bg-primary hover:text-card"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </button>
      )}
    </div>
  );
};
