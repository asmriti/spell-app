import type { Spell } from "../lib/types/spell";
import { SpellList } from "./SpellList";

export interface HeroSectionProps {
  spells: Spell[];
}

export const HeroSection = (props: HeroSectionProps) => {
  const { spells } = props;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 w-full">
        <SpellList spells={spells} />
      </div>
    </main>
  );
};
