export interface Spell {
  index: string;
  name: string;
  level: number;
  url: string;
}

export interface SpellListResponse {
  count: number;
  results: Spell[];
}
