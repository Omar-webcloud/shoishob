import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { Award, Sparkles } from 'lucide-react';
import { PaperBoatIcon } from '@/components/common/nostalgia-motifs';

interface IdentityCardProps {
  result: ChildhoodResult;
  orientation?: 'portrait' | 'landscape';
}

export function IdentityCard({ result, orientation = 'portrait' }: IdentityCardProps) {
  const isLandscape = orientation === 'landscape';

  return (
    <div
      className={`relative w-full bg-white rounded-3xl border-2 border-[#2E6F40]/25 shadow-2xl text-[#253D2C] ${
        isLandscape ? 'max-w-2xl p-6 sm:p-7' : 'max-w-md p-5 sm:p-6'
      } mx-auto flex flex-col justify-between select-none`}
      style={{
        backgroundImage: 'radial-gradient(rgba(46, 111, 64, 0.05) 1.2px, transparent 0)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Outer Card Top Bar */}
      <div className="flex items-center justify-between border-b-2 border-[#2E6F40]/15 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2E6F40] flex items-center justify-center text-white shadow-xs">
            <PaperBoatIcon className="w-5 h-5" color="#FFFFFF" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight block leading-tight">
              আমার শৈশব · SHOISHOB
            </span>
            <span className="text-[10px] uppercase font-bold text-[#2E6F40] tracking-wider block">
              বাংলাদেশি শৈশব পরিচয়পত্র
            </span>
          </div>
        </div>

        <div className="nostalgia-stamp text-[10px] sm:text-[11px] text-[#2E6F40] bg-[#CFFFD6]/50">
          খাঁটি নস্টালজিয়া · অনুমোদিত
        </div>
      </div>

      {/* Main Body */}
      <div className="my-auto py-2 flex flex-col justify-center">
        {/* Archetype Showcase */}
        <div className="rounded-2xl bg-[#F0FAF3] border border-[#2E6F40]/15 p-4 sm:p-5 text-center relative mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2.5 rounded-2xl bg-[#2E6F40] flex items-center justify-center text-3xl sm:text-4xl shadow-md border-2 border-[#CFFFD6]">
            {result.archetype.avatarIcon}
          </div>

          <span className="text-[11px] font-bold text-[#2E6F40] uppercase tracking-wider block">
            শৈশব আর্কিটাইপ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#253D2C] mt-0.5 tracking-tight">
            {result.archetype.titleBn}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#2E6F40] mt-0.5">
            {result.archetype.titleEn} · {result.era.titleBn}
          </p>
        </div>

        {/* Signature Memory Quote */}
        <div className="bg-[#F7FAF7] rounded-xl p-3 sm:p-4 border border-[#2E6F40]/10 text-center mb-4">
          <p className="text-xs sm:text-sm text-[#253D2C]/90 italic leading-relaxed">
            “{result.signatureMemoryBn}”
          </p>
        </div>

        {/* Badges Row */}
        <div className="mb-3">
          <span className="text-[10px] font-bold text-[#253D2C]/70 block mb-1.5 uppercase tracking-wider">
            স্বাক্ষরিত স্মৃতির ব্যাজ:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {result.badges.slice(0, 3).map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center p-2 rounded-xl bg-[#CFFFD6]/40 border border-[#2E6F40]/15 text-center"
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-[10px] font-bold text-[#253D2C] mt-1 leading-tight line-clamp-1">
                  {badge.titleBn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Bar: Nostalgia Score & ID */}
      <div>
        <div className="rounded-2xl bg-[#253D2C] text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E6F40] flex items-center justify-center font-bold text-sm border border-[#68BA7F]">
              <Award className="w-5 h-5 text-[#CFFFD6]" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#68BA7F] uppercase tracking-wider block">
                নস্টালজিয়া স্কোর
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-white">
                {result.nostalgiaScore}% খাঁটি শৈশব
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-white/60 block">আনুমানিক যুগ</span>
            <span className="text-xs font-bold text-[#CFFFD6]">{result.era.approxYears}</span>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-3 pt-2.5 border-t border-[#2E6F40]/10 flex items-center justify-between text-[10px] text-[#253D2C]/60">
          <span>আইডি: {result.id}</span>
          <span className="flex items-center gap-1 font-semibold text-[#2E6F40]">
            <Sparkles className="w-3 h-3" />
            <span>shoishob.vercel.app</span>
          </span>
        </div>
      </div>
    </div>
  );
}
