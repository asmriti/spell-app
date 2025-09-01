import axios from "axios";
import type { Spell, SpellListResponse } from "./types/spell";

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

export async function fetchSpells(): Promise<Spell[]> {
  try {
    const response = await api.get<SpellListResponse>("/spells");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching spells:", error);
    throw error;
  }
}
