import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { Award, Sparkles } from 'lucide-react';

export interface CardIdentityProps {
  result: ChildhoodResult;
  orientation?: 'portrait' | 'landscape';
}

export function CardIdentity({
  result,
  orientation = 'portrait',
}: CardIdentityProps) {
  const isLandscape = orientation === 'landscape';

  return (
    <div
      className={`bg-white text-[#253D2C] flex flex-col justify-between border-4 border-[#2E6F40] ${
        isLandscape ? 'w-[1200px] h-[750px] p-10' : 'w-[1080px] h-[1350px] p-12'
      }`}
      style={{
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', 'Anek Bangla', system-ui, sans-serif",
        backgroundImage: 'radial-gradient(rgba(46, 111, 64, 0.08) 2px, transparent 0)',
        backgroundSize: '32px 32px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-4 border-[#2E6F40]/25 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 rounded-full overflow-hidden border-3 border-[#2E6F40] shadow-md shrink-0 bg-[#253D2C]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-shoishob.png"
              alt="শৈশব লোগো"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black tracking-tight text-[#253D2C] leading-none m-0 p-0 whitespace-nowrap">
              আমার শৈশব · SHOISHOB
            </h2>
            <p className="text-sm font-bold text-[#2E6F40] tracking-wider uppercase m-0 p-0 whitespace-nowrap">
              বাংলাদেশি শৈশব পরিচয়পত্র
            </p>
          </div>
        </div>
        <div className="px-4 py-2 rounded-full bg-[#CFFFD6] border border-[#2E6F40]/30 shrink-0">
          <span className="text-xs font-black text-[#253D2C] uppercase tracking-wider whitespace-nowrap">
            অফিশিয়াল পরিচয়পত্র
          </span>
        </div>
      </div>

      {/* Center Archetype Showcase */}
      <div className="my-auto py-4 flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-3xl bg-[#2E6F40] border-4 border-[#CFFFD6] flex items-center justify-center text-6xl shadow-xl mb-4 shrink-0">
          {result.archetype.avatarIcon}
        </div>

        <div className="flex flex-col items-center gap-1.5 mb-5 max-w-3xl">
          <span className="text-sm font-bold text-[#2E6F40] uppercase tracking-widest block">
            শৈশব আর্কিটাইপ
          </span>
          <h1 className="text-4xl font-black text-[#253D2C] tracking-tight leading-snug m-0 p-0">
            {result.archetype.titleBn}
          </h1>
          <p className="text-lg font-bold text-[#2E6F40] m-0 p-0 leading-normal">
            {result.archetype.titleEn} · {result.era.titleBn} ({result.era.approxYears})
          </p>
        </div>

        {/* Signature Memory Quote Box */}
        <div className="max-w-2xl w-full bg-[#F3FAF5] rounded-2xl p-5 border-2 border-[#2E6F40]/20 mb-5 shadow-xs">
          <p className="text-lg text-[#253D2C]/90 italic font-medium leading-relaxed m-0">
            “{result.signatureMemoryBn}”
          </p>
        </div>

        {/* Nostalgia Badges */}
        <div className="w-full max-w-2xl">
          <span className="text-xs font-bold text-[#253D2C]/70 block mb-2.5 uppercase tracking-wider">
            স্বাক্ষরিত স্মৃতির ব্যাজ:
          </span>
          <div className="grid grid-cols-3 gap-3.5">
            {result.badges.slice(0, 3).map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center p-3.5 rounded-xl bg-[#CFFFD6]/40 border border-[#2E6F40]/20 text-center"
              >
                <span className="text-3xl mb-1">{badge.icon}</span>
                <span className="text-xs font-bold text-[#253D2C] truncate block w-full">
                  {badge.titleBn}
                </span>
                <span className="text-[11px] text-[#253D2C]/70 mt-1 truncate block w-full">
                  {badge.descriptionBn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Score Bar */}
      <div>
        <div className="rounded-2xl bg-[#253D2C] text-white p-5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-xl bg-[#2E6F40] flex items-center justify-center font-bold border border-[#68BA7F] shrink-0">
              <Award className="w-7 h-7 text-[#CFFFD6]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-[#68BA7F] uppercase tracking-wider block">
                নস্টালজিয়া স্কোর
              </span>
              <span className="text-2xl font-extrabold text-white block leading-none whitespace-nowrap mt-0.5">
                {result.nostalgiaScore}% খাঁটি শৈশব
              </span>
            </div>
          </div>

          <div className="text-right shrink-0 flex flex-col gap-0.5">
            <span className="text-xs text-white/70 block uppercase font-medium">
              স্মৃতি যুগ
            </span>
            <span className="text-base font-bold text-[#CFFFD6] block leading-none whitespace-nowrap mt-0.5">
              {result.era.titleBn}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t-2 border-[#2E6F40]/15 flex items-center justify-between text-xs font-semibold text-[#253D2C]/70">
          <span className="truncate">পরিচয়পত্র আইডি: {result.id}</span>
          <span className="flex items-center gap-1.5 text-[#2E6F40] font-bold shrink-0">
            <Sparkles className="w-4 h-4" />
            <span>shoishob-bd.vercel.app</span>
          </span>
        </div>
      </div>
    </div>
  );
}
