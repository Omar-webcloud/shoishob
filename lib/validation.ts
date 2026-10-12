import { ArchetypeId, ChildhoodEra, SerializedResultPayload } from '@/types/result';

const VALID_ARCHETYPES: ArchetypeId[] = [
  'street_legend',
  'cartoon_era',
  'tiffin_time',
  'early_tech',
  'neighborhood_adventurer',
  'nostalgic_allrounder',
];

const VALID_ERAS: ChildhoodEra[] = [
  '90s_golden',
  '2000s_millennium',
  'mid_2000s_dawn',
  'timeless_bangla',
];

export function validateResultPayload(obj: unknown): SerializedResultPayload | null {
  if (!obj || typeof obj !== 'object') return null;

  const candidate = obj as Record<string, unknown>;

  // Check version
  if (candidate.v !== 1) return null;

  // Check archetype
  if (typeof candidate.a !== 'string' || !VALID_ARCHETYPES.includes(candidate.a as ArchetypeId)) {
    return null;
  }

  // Check era
  if (typeof candidate.e !== 'string' || !VALID_ERAS.includes(candidate.e as ChildhoodEra)) {
    return null;
  }

  // Check nostalgia score (integer 0-100)
  if (typeof candidate.s !== 'number' || candidate.s < 0 || candidate.s > 100) {
    return null;
  }

  // Check badges
  if (!Array.isArray(candidate.b) || candidate.b.length > 5) {
    return null;
  }

  // Check timestamp
  if (typeof candidate.t !== 'number' || isNaN(candidate.t)) {
    return null;
  }

  // Sanitize signature memory
  const memory = typeof candidate.m === 'string' ? candidate.m.slice(0, 200) : '';

  // Optional dimension percentages
  let dimensions: number[] | undefined;
  if (Array.isArray(candidate.d) && candidate.d.length === 5) {
    dimensions = candidate.d.map((val) =>
      typeof val === 'number' && !isNaN(val) ? Math.min(100, Math.max(0, Math.round(val))) : 90
    );
  }

  // Optional labels
  let labels: string[] | undefined;
  if (Array.isArray(candidate.l)) {
    labels = candidate.l
      .filter((lbl): lbl is string => typeof lbl === 'string')
      .slice(0, 5)
      .map((lbl) => lbl.slice(0, 50));
  }

  return {
    v: 1,
    a: candidate.a as ArchetypeId,
    e: candidate.e as ChildhoodEra,
    s: Math.round(candidate.s),
    b: candidate.b.filter((b) => typeof b === 'string').map((b) => b.slice(0, 30)),
    m: memory,
    t: candidate.t,
    d: dimensions,
    l: labels,
  };
}
