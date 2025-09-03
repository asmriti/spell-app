import { useEffect, useState } from "react";

import "./App.css";
import { Nav } from "./components/Nav";
import { HeroSection } from "./components/HeroSection";
import { LoadingSpinner } from "./components/ui/loading";
import { RefreshCw, Sparkles } from "lucide-react";

import type { Spell } from "./lib/types/spell";
import { fetchSpells } from "./services/api";
import { FavoritesPage } from "./components/FavoritesPage";
import { Route, Routes } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spells, setSpells] = useState<Spell[]>([]);

  const loadSpells = async () => {
    try {
      setLoading(true);
      setError(null);
      const spellData = await fetchSpells();
      setSpells(spellData);
    } catch (err) {
      setError("Failed to load spells.");
      console.error("Error loading spells:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpells();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative">
            <LoadingSpinner size="lg" className="mx-auto" />
            <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold ">Loading Spell Compendium</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">⚠️</div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Connection Failed
            </h2>
            <p className="text-balance">{error}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={loadSpells}
              className="bg-transparent flex items-center justify-center cursor-pointer border border-border px-3 py-1 rounded-md"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Routes>
        <Route path="/" element={<HeroSection spells={spells} />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
