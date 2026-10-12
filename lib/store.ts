import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { QuizAnswers } from '@/types/quiz';
import { ChildhoodResult } from '@/types/result';
import { QUIZ_QUESTIONS, ARCHETYPES_DATA, ERAS_DATA } from './quiz-data';
import { generateChildhoodResult } from './result-generator';
import { clearAllShoishobData } from './storage';

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
        return freshResult;
      },

      resetQuiz: () => {
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

          // Re-hydrate saved result with latest archetype and era definitions
          if (state.result && state.result.archetype) {
            const arch = ARCHETYPES_DATA[state.result.archetype.id];
            const era = ERAS_DATA[state.result.era.id];
            if (arch || era) {
              state.result = {
                ...state.result,
                archetype: arch || state.result.archetype,
                era: era || state.result.era,
              };
            }
          }
        }
      },
    }
  )
);
