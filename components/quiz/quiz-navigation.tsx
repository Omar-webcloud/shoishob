'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface QuizNavigationProps {
  hasPrevious: boolean;
  hasNext: boolean;
  isLastQuestion: boolean;
  isOptionSelected: boolean;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
}

export function QuizNavigation({
  hasPrevious,
  isLastQuestion,
  isOptionSelected,
  onPrevious,
  onNext,
  isSubmitting = false,
}: QuizNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-[#2E6F40]/15">
      {/* Previous Button */}
      {hasPrevious ? (
        <button
          type="button"
          onClick={onPrevious}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#2E6F40]/25 text-[#253D2C] hover:bg-black/5 font-semibold text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>পূর্ববর্তী</span>
        </button>
      ) : (
        <div /> // Spacer
      )}

      {/* Next or Finish Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={!isOptionSelected || isSubmitting}
        className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-sm transition-all ${
          isOptionSelected && !isSubmitting
            ? 'bg-[#2E6F40] text-white hover:bg-[#253D2C] hover:shadow-md cursor-pointer'
            : 'bg-black/10 text-black/40 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>স্মৃতি গোছানো হচ্ছে...</span>
          </>
        ) : isLastQuestion ? (
          <>
            <span>আমার শৈশব দেখুন</span>
            <Sparkles className="w-4 h-4 text-[#CFFFD6]" />
          </>
        ) : (
          <>
            <span>পরবর্তী</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
