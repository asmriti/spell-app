import { Sparkles } from "lucide-react";

export const Nav = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <Sparkles className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 h-8 w-8 text-primary animate-pulse opacity-50">
              <Sparkles className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-balance">
            D&D Spell Compendium
          </h1>
        </div>
        <p className="text-muted-foreground text-balance">
          Discover and explore the magical arts of Dungeons & Dragons
        </p>
      </div>
    </header>
  );
};
