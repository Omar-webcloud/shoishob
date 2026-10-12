'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUIZ_QUESTIONS } from '@/lib/quiz-data';
import { useQuizStore } from '@/lib/store';
import { QuizProgress } from './quiz-progress';
import { QuestionCard } from './question-card';
import { QuizNavigation } from './quiz-navigation';

import { ConfirmDialog } from '@/components/common/confirm-dialog';

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
  const {
    answers,
    currentStep,
    setAnswer,
    nextStep,
    prevStep,
    generateAndSaveResult,
    resetQuiz,
  } = useQuizStore();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState<boolean>(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  // Option selection
  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    setAnswer(currentQuestion.id, optionId);
  };

  // Previous navigation
  const handlePrevious = () => {
    if (currentStep > 0) {
      prevStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Next / Submit navigation
  const handleNext = () => {
    if (!currentQuestion) return;

    const hasAnswered = !!answers[currentQuestion.id];
    if (!hasAnswered) return;

    if (currentStep < totalQuestions - 1) {
      nextStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all questions! Generate result
      setIsSubmitting(true);
      try {
        generateAndSaveResult();
        router.push('/result');
      } catch (err) {
        console.error('Failed to generate result:', err);
        setIsSubmitting(false);
      }
    }
  };

  // Restart quiz modal confirmation
  const handleConfirmRestart = () => {
    resetQuiz();
    setIsRestartModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentQuestion) {
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
        onRestart={() => setIsRestartModalOpen(true)}
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

      {/* Restart Quiz Confirmation Modal */}
      <ConfirmDialog
        isOpen={isRestartModalOpen}
        onClose={() => setIsRestartModalOpen(false)}
        onConfirm={handleConfirmRestart}
        title="কুইজ রিস্টার্ট করতে চান?"
        description="কুইজটি প্রথম থেকে শুরু হবে এবং বর্তমান উত্তরগুলো মুছে যাবে। আপনি নতুন করে পছন্দের উত্তরগুলো বাছাই করতে পারবেন।"
        confirmText="হ্যাঁ, রিস্টার্ট করুন"
        cancelText="বাতিল"
        variant="primary"
      />
    </div>
  );
}
