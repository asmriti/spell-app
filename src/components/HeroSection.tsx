import { SpellList } from "./SpellList";

export const HeroSection = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 w-full">
        <SpellList />
      </div>
    </main>
  );
};
