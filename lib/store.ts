import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { QuizAnswers } from '@/types/quiz';
import { ChildhoodResult } from '@/types/result';
import { QUIZ_QUESTIONS, ARCHETYPES_DATA, ERAS_DATA } from './quiz-data';
import { generateChildhoodResult } from './result-generator';
import { saveQuizResult, getQuizResult, clearAllShoishobData } from './storage';

interface QuizState {
  answers: QuizAnswers;
  currentStep: number;
  result: ChildhoodResult | null;
  hasHydrated: boolean;

  // Actions
  setAnswer: (questionId: string, optionId: string) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  generateAndSaveResult: () => ChildhoodResult;
  resetQuiz: () => void;
  clearAll: () => void;
  setHasHydrated: (val: boolean) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      answers: {},
      currentStep: 0,
      result: null,
      hasHydrated: false,

      setAnswer: (questionId: string, optionId: string) => {
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: optionId,
          },
        }));
      },

      setStep: (step: number) => {
        const clamped = Math.max(0, Math.min(step, QUIZ_QUESTIONS.length - 1));
        set({ currentStep: clamped });
      },

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < QUIZ_QUESTIONS.length - 1) {
          set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
          set({ currentStep: currentStep - 1 });
        }
      },

      generateAndSaveResult: () => {
        const { answers } = get();
        const freshResult = generateChildhoodResult(answers);
        set({ result: freshResult });
        saveQuizResult(freshResult);
        return freshResult;
      },

      resetQuiz: () => {
        clearAllShoishobData();
        set({
          answers: {},
          currentStep: 0,
          result: null,
        });
      },

      clearAll: () => {
        clearAllShoishobData();
        set({
          answers: {},
          currentStep: 0,
          result: null,
        });
      },

      setHasHydrated: (val: boolean) => {
        set({ hasHydrated: val });
      },
    }),
    {
      name: 'bdcg_store_v1',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return window.localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);

          // If no result in store state, try legacy storage
          if (!state.result) {
            const legacy = getQuizResult();
            if (legacy) {
              state.result = legacy;
            }
          }

          // Re-hydrate saved result with latest archetype and era definitions
          if (state.result && state.result.archetype) {
            const arch = ARCHETYPES_DATA[state.result.archetype.id];
            const era = ERAS_DATA[state.result.era.id];

            const sanitizeText = (txt: string) => {
              if (!txt) return '';
              return txt
                .replace(/তোমার/g, 'আপনার')
                .replace(/তুমি/g, 'আপনি')
                .replace(/তোমাকে/g, 'আপনাকে')
                .replace(/তোমাদের/g, 'আপনাদের')
                .replace(/তোমরা/g, 'আপনারা')
                .replace(/তোমায়/g, 'আপনাকে')
                .replace(/প্রস্তুত হও/g, 'প্রস্তুত হোন')
                .replace(/খুলে দেখো/g, 'খুলে দেখুন');
            };

            state.result = {
              ...state.result,
              archetype: arch || state.result.archetype,
              era: era || state.result.era,
              signatureMemoryBn: sanitizeText(state.result.signatureMemoryBn || (arch ? arch.taglineBn : '')),
              selectedMemoryLabelsBn: (state.result.selectedMemoryLabelsBn || []).map(sanitizeText),
            };
          }
        }
      },
    }
  )
);
