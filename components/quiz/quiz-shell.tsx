'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QUIZ_QUESTIONS } from '@/lib/quiz-data';
import {
  getQuizAnswers,
  saveQuizAnswers,
  getCurrentQuizStep,
  saveCurrentQuizStep,
  saveQuizResult,
  clearAllShoishobData,
} from '@/lib/storage';
import { generateChildhoodResult } from '@/lib/result-generator';
import { QuizProgress } from './quiz-progress';
import { QuestionCard } from './question-card';
import { QuizNavigation } from './quiz-navigation';
import { QuizAnswers } from '@/types/quiz';

const categoryLabelsBn: Record<string, string> = {
  school_life: 'স্কুলজীবন ও স্মৃতি',
  snacks: 'টিফিন ও খাবার',
  television: 'কার্টুন ও বিটিভি',
  games: 'বিকেলের খেলাধুলা',
  technology: 'প্রযুক্তি ও যন্ত্র',
  cultural: 'পাড়া ও উৎসব',
  toys_hobbies: 'শৈশবের সংগ্রহ',
  habits: 'স্মৃতি ও অনুভূতি',
};

export function QuizShell() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Load persisted progress on mount
  useEffect(() => {
    const savedAnswers = getQuizAnswers();
    const savedStep = getCurrentQuizStep();

    setAnswers(savedAnswers);
    if (savedStep >= 0 && savedStep < QUIZ_QUESTIONS.length) {
      setCurrentStep(savedStep);
    }
    setIsLoaded(true);
  }, []);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  // Option selection
  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: optionId,
    };
    setAnswers(updatedAnswers);
    saveQuizAnswers(updatedAnswers);
  };

  // Previous navigation
  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      saveCurrentQuizStep(prevStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Next / Submit navigation
  const handleNext = () => {
    if (!currentQuestion) return;

    const hasAnswered = !!answers[currentQuestion.id];
    if (!hasAnswered) return;

    if (currentStep < totalQuestions - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveCurrentQuizStep(nextStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all questions! Generate result
      setIsSubmitting(true);
      try {
        const result = generateChildhoodResult(answers);
        saveQuizResult(result);
        router.push('/result');
      } catch (err) {
        console.error('Failed to generate result:', err);
        setIsSubmitting(false);
      }
    }
  };

  // Restart quiz
  const handleRestart = () => {
    if (window.confirm('তুমি কি কুইজটি নতুন করে শুরু করতে চাও? আগের উত্তরগুলো মুছে যাবে।')) {
      clearAllShoishobData();
      setAnswers({});
      setCurrentStep(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isLoaded || !currentQuestion) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#2E6F40]/30 border-t-[#2E6F40] rounded-full animate-spin mb-3" />
        <p className="text-sm text-[#253D2C]/70">স্মৃতির খাতা খোলা হচ্ছে...</p>
      </div>
    );
  }

  const selectedOptionId = answers[currentQuestion.id];
  const isOptionSelected = !!selectedOptionId;
  const isLastQuestion = currentStep === totalQuestions - 1;
  const categoryLabel = categoryLabelsBn[currentQuestion.category] || 'শৈশবের স্মৃতি';

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Progress & Category */}
      <QuizProgress
        currentIndex={currentStep}
        totalQuestions={totalQuestions}
        categoryLabelBn={categoryLabel}
        onRestart={handleRestart}
      />

      {/* Main Question Card container */}
      <div className="tactile-card p-6 sm:p-8 bg-white">
        <QuestionCard
          question={currentQuestion}
          selectedOptionId={selectedOptionId}
          onSelectOption={handleSelectOption}
        />

        {/* Navigation Buttons */}
        <QuizNavigation
          hasPrevious={currentStep > 0}
          hasNext={currentStep < totalQuestions - 1}
          isLastQuestion={isLastQuestion}
          isOptionSelected={isOptionSelected}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
