export type ArchetypeId =
  | 'street_legend'
  | 'cartoon_era'
  | 'tiffin_time'
  | 'early_tech'
  | 'neighborhood_adventurer'
  | 'nostalgic_allrounder';

export interface ArchetypeMeta {
  id: ArchetypeId;
  titleBn: string;
  titleEn: string;
  taglineBn: string;
  taglineEn: string;
  descriptionBn: string;
  avatarIcon: string;
  accentColor: string;
  signatureTraitsBn: string[];
}

export type ChildhoodEra = '90s_golden' | '2000s_millennium' | 'mid_2000s_dawn' | 'timeless_bangla';

export interface EraMeta {
  id: ChildhoodEra;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  approxYears: string;
  descriptionBn: string;
}

export interface NostalgiaBadge {
  id: string;
  titleBn: string;
  descriptionBn: string;
  icon: string;
}

export interface DimensionScore {
  key: 'games' | 'snacks' | 'tv' | 'tech' | 'school';
  nameBn: string;
  nameEn: string;
  percentage: number;
}

export interface ChildhoodResult {
  version: number;
  archetype: ArchetypeMeta;
  era: EraMeta;
  nostalgiaScore: number; // e.g. 96
  signatureMemoryBn: string;
  badges: NostalgiaBadge[];
  dimensions: DimensionScore[];
  selectedMemoryLabelsBn: string[];
  generatedAt: string;
  id: string;
}

export interface SerializedResultPayload {
  v: number;
  a: ArchetypeId;
  e: ChildhoodEra;
  s: number;
  b: string[]; // badge ids
  m: string; // signature memory key or truncated text
  t: number; // timestamp
  d?: number[]; // optional dimension score percentages
  l?: string[]; // optional selected memory labels
}

