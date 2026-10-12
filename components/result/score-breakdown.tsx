import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface ScoreBreakdownProps {
  result: ChildhoodResult;
}

export function ScoreBreakdown({ result }: ScoreBreakdownProps) {
  return (
    <div className="w-full space-y-6">
      {/* Archetype In-depth Description */}
      <div className="tactile-card p-6 sm:p-7 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-[#2E6F40]" />
          <h3 className="text-xl font-bold text-[#253D2C]">
            তোমার শৈশবের বিস্তারিত গল্প
          </h3>
        </div>
        <p className="text-sm sm:text-base text-[#253D2C]/85 leading-relaxed mb-5">
          {result.archetype.descriptionBn}
        </p>

        {/* Signature Traits */}
        <div className="border-t border-[#2E6F40]/10 pt-4">
          <span className="text-xs font-bold text-[#2E6F40] uppercase tracking-wider block mb-3">
            তোমার সবচেয়ে চেনা বৈশিষ্ট্যসমূহ:
          </span>
          <div className="space-y-2">
            {result.archetype.signatureTraitsBn.map((trait, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#253D2C]/85">
                <CheckCircle2 className="w-4 h-4 text-[#2E6F40] shrink-0 mt-0.5" />
                <span>{trait}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nostalgia Dimensions Breakdown */}
      <div className="tactile-card p-6 sm:p-7 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#253D2C]">
            স্মৃতির মাত্রা বিশ্লেষণ (Nostalgia Profile)
          </h3>
          <span className="text-xs font-bold text-[#2E6F40] px-2.5 py-1 rounded-full bg-[#CFFFD6]">
            {result.nostalgiaScore}% খাঁটি শৈশব
          </span>
        </div>

        <div className="space-y-4">
          {result.dimensions.map((dim) => (
            <div key={dim.key} className="space-y-1.5">
              <div className="flex justify-between text-xs sm:text-sm font-semibold">
                <span className="text-[#253D2C]">{dim.nameBn}</span>
                <span className="text-[#2E6F40] font-bold">{dim.percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden p-0.5 border border-[#2E6F40]/10">
                <div
                  className="h-full bg-gradient-to-r from-[#68BA7F] to-[#2E6F40] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${dim.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
