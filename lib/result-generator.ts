import { QuizAnswers } from '@/types/quiz';
import { ChildhoodResult } from '@/types/result';
import { calculateChildhoodProfile } from './scoring';
import { ARCHETYPES_DATA, ERAS_DATA } from './quiz-data';

export const RESULT_SCHEMA_VERSION = 1;

export function generateChildhoodResult(answers: QuizAnswers): ChildhoodResult {
  const calculated = calculateChildhoodProfile(answers);
  const archetype = ARCHETYPES_DATA[calculated.archetypeId] || ARCHETYPES_DATA['nostalgic_allrounder'];
  const era = ERAS_DATA[calculated.eraId] || ERAS_DATA['timeless_bangla'];

  // Deterministic result ID based on answers hash
  const hashKey = Object.entries(answers)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');

  let hash = 0;
  for (let i = 0; i < hashKey.length; i++) {
    hash = (hash << 5) - hash + hashKey.charCodeAt(i);
    hash |= 0;
  }
  const idSuffix = Math.abs(hash).toString(36).slice(0, 6).toUpperCase();
  const id = `BDCG-${idSuffix || '2026'}`;

  return {
    version: RESULT_SCHEMA_VERSION,
    id,
    archetype,
    era,
    nostalgiaScore: calculated.nostalgiaScore,
    signatureMemoryBn: calculated.signatureMemoryBn,
    badges: calculated.badges,
    dimensions: calculated.dimensions,
    selectedMemoryLabelsBn: calculated.selectedMemoryLabelsBn,
    generatedAt: new Date().toISOString(),
    reflections: calculated.reflections,
    answers,
  };
}
