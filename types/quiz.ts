import { ChildhoodEra } from './result';

export type QuestionCategory =
  | 'snacks'
  | 'television'
  | 'games'
  | 'toys_hobbies'
  | 'school_life'
  | 'technology'
  | 'cultural'
  | 'habits';

export interface QuizOption {
  id: string;
  labelBn: string;
  labelEn: string;
  subtitleBn?: string;
  icon: string; // Emoji or SVG key
  archetypeWeights: {
    street_legend?: number;
    cartoon_era?: number;
    tiffin_time?: number;
    early_tech?: number;
    neighborhood_adventurer?: number;
    nostalgic_allrounder?: number;
    monsoon_dreamer?: number;
    rooftop_flyer?: number;
    school_bookworm?: number;
    salami_banker?: number;
  };
  eraAffinity?: ChildhoodEra;
  dimensionScores?: {
    games?: number;
    snacks?: number;
    tv?: number;
    tech?: number;
    school?: number;
  };
  badgeTitleBn?: string;
}

export interface QuizQuestion {
  id: string;
  category: QuestionCategory;
  order: number;
  isOptional?: boolean;
  questionBn: string;
  questionEn: string;
  hintBn?: string;
  options: QuizOption[];
}

export type QuizAnswers = Record<string, string>; // questionId -> optionId

export interface QuizProgress {
  currentQuestionIndex: number;
  answers: QuizAnswers;
  isCompleted: boolean;
  lastUpdated: number;
}
