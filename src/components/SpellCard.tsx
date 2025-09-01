import type { Spell } from "../lib/types/spell";

export interface SpellCardProps {
  spell: Spell;
}

export const SpellCard = (props: SpellCardProps) => {
  const { spell } = props;
  return (
    <div className="text-card-foreground flex flex-col gap-6 rounded-xl border p-6 shadow-sm group hover:shadow-lg transition-all duration-200 cursor-pointer border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
      {spell.name}
    </div>
  );
};
