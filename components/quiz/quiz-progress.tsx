'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';

interface QuizProgressProps {
  currentIndex: number;
  totalQuestions: number;
  categoryLabelBn: string;
  onRestart: () => void;
}

export function QuizProgress({
  currentIndex,
  totalQuestions,
  categoryLabelBn,
  onRestart,
}: QuizProgressProps) {
  const percentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Convert numbers to Bengali digits
  const toBnNum = (n: number) => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return n.toString().split('').map((d) => bnDigits[parseInt(d, 10)] ?? d).join('');
  };

  return (
    <div className="w-full mb-6 sm:mb-8">
      {/* Top Meta row */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#CFFFD6] text-[#253D2C] border border-[#2E6F40]/15">
            প্রশ্ন {toBnNum(currentIndex + 1)} / {toBnNum(totalQuestions)}
          </span>
          <span className="text-[#2E6F40] hidden sm:inline">• {categoryLabelBn}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#253D2C]/75">{toBnNum(percentage)}% সম্পন্ন</span>
          <button
            onClick={onRestart}
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/5 hover:bg-red-50 text-xs font-semibold text-[#253D2C]/85 hover:text-red-700 border border-black/10 hover:border-red-200 transition-all cursor-pointer shadow-2xs"
            title="নতুন করে কুইজ শুরু করুন"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#2E6F40]" />
            <span>রিস্টার্ট</span>
          </button>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden p-0.5 border border-[#2E6F40]/10">
        <div
          className="h-full bg-gradient-to-r from-[#68BA7F] to-[#2E6F40] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
