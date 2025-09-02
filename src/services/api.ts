import axios from "axios";
import type { Spell, SpellDetail, SpellListResponse } from "../lib/types/spell";

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

export async function fetchSpellDetail(index: string): Promise<SpellDetail> {
  try {
    const response = await api.get<SpellDetail>(`/spells/${index}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching spell ${index}:`, error);
    throw error;
  }
}
