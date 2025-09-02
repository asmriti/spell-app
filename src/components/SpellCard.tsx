import { Eye, Heart, Sparkles } from "lucide-react";
import type { Spell } from "../lib/types/spell";
import { getLevelColor } from "../lib/color";
import { getLevelDisplay } from "../lib/level";

export interface SpellCardProps {
  spell: Spell;
  onViewDetails: (spell: Spell) => void;
}

export const SpellCard = (props: SpellCardProps) => {
  const { spell, onViewDetails } = props;

  return (
    <div className=" flex flex-col gap-6 rounded-xl border p-6 shadow-sm group hover:shadow-lg transition-all duration-200 cursor-pointer border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3>{spell.name}</h3>

        <button className="cursor-pointer">
          <Heart className="h-4 w-4 transition hover:fill-primary text-primary" />
        </button>
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

      <button
        onClick={() => onViewDetails(spell)}
        className="w-full h-8 transition-colors px-3 rounded-md cursor-pointer inline-flex items-center justify-center gap-2 border border-border bg-background hover:bg-primary hover:text-card"
      >
        <Eye className="h-4 w-4 mr-2" />
        View Details
      </button>
    </div>
  );
};
