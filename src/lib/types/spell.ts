export interface Spell {
  index: string;
  name: string;
  level: number;
  url?: string;
}

export interface SpellListResponse {
  count: number;
  results: Spell[];
}

export interface SpellDetail {
  index: string;
  desc: string[];
  higher_level?: string[];
  range: string;
  components: string[];
  material?: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  attack_type?: string;
  classes: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}

export interface FavoriteSpell {
  index: string;
  name: string;
  level: number;
  dateAdded: string;
}
