'use client';

import React from 'react';
import { QuizQuestion } from '@/types/quiz';
import { CheckCircle2, Circle } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

export function QuestionCard({
  question,
  selectedOptionId,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <div className="w-full">
      {/* Question Header */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#253D2C] leading-snug">
          {question.questionBn}
        </h2>
        {question.hintBn && (
          <p className="text-sm text-[#253D2C]/75 mt-2 italic">
            {question.hintBn}
          </p>
        )}
      </div>

      {/* Answer Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectOption(option.id)}
              className={`tactile-option text-left p-4 sm:p-5 flex items-start justify-between gap-3 min-h-[82px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#2E6F40] ${
                isSelected ? 'selected' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span className="text-2xl sm:text-3xl shrink-0 p-1.5 rounded-xl bg-black/5 flex items-center justify-center">
                  {option.icon}
                </span>

                <div className="flex flex-col">
                  <span className="font-bold text-sm sm:text-base text-[#253D2C] leading-snug">
                    {option.labelBn}
                  </span>
                  {option.subtitleBn && (
                    <span className="text-xs text-[#253D2C]/70 mt-1 leading-normal">
                      {option.subtitleBn}
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0 mt-0.5">
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-[#2E6F40] fill-[#CFFFD6]" />
                ) : (
                  <Circle className="w-5 h-5 text-black/20" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
