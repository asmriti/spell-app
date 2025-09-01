import { useState } from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { HeroSection } from "./components/HeroSection";

function App() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Nav />
        <HeroSection />
      </div>
    </>
  );
}

export default App;
