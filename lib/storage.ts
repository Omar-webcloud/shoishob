import { QuizAnswers } from '@/types/quiz';
import { ChildhoodResult } from '@/types/result';

export const STORAGE_KEYS = {
  ANSWERS: 'bdcg_answers_v1',
  RESULT: 'bdcg_result_v1',
  PREFERENCES: 'bdcg_preferences_v1',
  SCHEMA_VERSION: 'bdcg_schema_version',
  CURRENT_STEP: 'bdcg_step_v1',
} as const;

export const CURRENT_SCHEMA_VERSION = '1.0';

export interface UserPreferences {
  language: 'bn' | 'en';
  preferredExportFormat: 'png' | 'jpg';
  preferredCardOrientation: 'portrait' | 'landscape';
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'bn',
  preferredExportFormat: 'png',
  preferredCardOrientation: 'portrait',
};

// In-memory fallback if localStorage is disabled or throws QuotaExceededError in incognito
const memoryStore: Record<string, string> = {};

function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__bdcg_storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function saveToStorage<T>(key: string, value: T): boolean {
  try {
    const serialized = JSON.stringify(value);
    memoryStore[key] = serialized;

    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(key, serialized);
      window.localStorage.setItem(STORAGE_KEYS.SCHEMA_VERSION, CURRENT_SCHEMA_VERSION);
      return true;
    }
    return false;
  } catch (err) {
    console.warn(`[Shoishob Storage] Failed to save key "${key}":`, err);
    return false;
  }
}

export function getFromStorage<T>(key: string, fallback: T): T {
  try {
    let raw: string | null = null;
    if (isLocalStorageAvailable()) {
      raw = window.localStorage.getItem(key);
    }
    if (!raw && key in memoryStore) {
      raw = memoryStore[key];
    }
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[Shoishob Storage] Failed to read key "${key}":`, err);
    return fallback;
  }
}

export function removeFromStorage(key: string): void {
  delete memoryStore[key];
  try {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(key);
    }
  } catch (err) {
    console.warn(`[Shoishob Storage] Failed to remove key "${key}":`, err);
  }
}

export function clearAllShoishobData(): void {
  Object.values(STORAGE_KEYS).forEach((k) => {
    delete memoryStore[k];
  });
  try {
    if (isLocalStorageAvailable()) {
      Object.values(STORAGE_KEYS).forEach((k) => {
        window.localStorage.removeItem(k);
      });
    }
  } catch (err) {
    console.warn('[Shoishob Storage] Failed to clear storage:', err);
  }
}

// Specialized helpers
export function saveQuizAnswers(answers: QuizAnswers): void {
  saveToStorage(STORAGE_KEYS.ANSWERS, answers);
}

export function getQuizAnswers(): QuizAnswers {
  return getFromStorage<QuizAnswers>(STORAGE_KEYS.ANSWERS, {});
}

export function saveCurrentQuizStep(step: number): void {
  saveToStorage(STORAGE_KEYS.CURRENT_STEP, step);
}

export function getCurrentQuizStep(): number {
  return getFromStorage<number>(STORAGE_KEYS.CURRENT_STEP, 0);
}

export function saveQuizResult(result: ChildhoodResult): void {
  saveToStorage(STORAGE_KEYS.RESULT, result);
}

export function getQuizResult(): ChildhoodResult | null {
  return getFromStorage<ChildhoodResult | null>(STORAGE_KEYS.RESULT, null);
}

export function saveUserPreferences(prefs: Partial<UserPreferences>): void {
  const current = getUserPreferences();
  saveToStorage(STORAGE_KEYS.PREFERENCES, { ...current, ...prefs });
}

export function getUserPreferences(): UserPreferences {
  return getFromStorage<UserPreferences>(STORAGE_KEYS.PREFERENCES, DEFAULT_PREFERENCES);
}
