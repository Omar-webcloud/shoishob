import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { Award, Sparkles } from 'lucide-react';

interface CardIdentityProps {
  result: ChildhoodResult;
  orientation?: 'portrait' | 'landscape';
  isExport?: boolean;
}

export function CardIdentity({
  result,
  orientation = 'portrait',
  isExport = false,
}: CardIdentityProps) {
  const isLandscape = orientation === 'landscape';

  if (isExport) {
    return (
      <div
        className={`bg-white text-[#253D2C] flex flex-col justify-between border-4 border-[#2E6F40] ${
          isLandscape ? 'w-[1200px] h-[750px] p-10' : 'w-[1080px] h-[1350px] p-12'
        }`}
        style={{
          fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', 'Anek Bangla', system-ui, sans-serif",
          backgroundImage: 'radial-gradient(rgba(46, 111, 64, 0.08) 2px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b-4 border-[#2E6F40]/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2E6F40] shadow-md shrink-0 bg-[#253D2C]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-shoishob.png"
                alt="শৈশব লোগো"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-3xl font-black tracking-tight block text-[#253D2C]">
                আমার শৈশব · SHOISHOB
              </span>
              <span className="text-sm font-semibold text-[#2E6F40] tracking-wider uppercase">
                বাংলাদেশি শৈশব পরিচয়পত্র
              </span>
            </div>
          </div>
        </div>

        {/* Center Archetype Showcase */}
        <div className="my-auto py-4 flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-3xl bg-[#2E6F40] border-4 border-[#CFFFD6] flex items-center justify-center text-6xl shadow-xl mb-4">
            {result.archetype.avatarIcon}
          </div>

          <span className="text-base font-bold text-[#2E6F40] uppercase tracking-widest block mb-1">
            শৈশব আর্কিটাইপ
          </span>
          <h1 className="text-5xl font-black text-[#253D2C] tracking-tight mb-2">
            {result.archetype.titleBn}
          </h1>
          <p className="text-xl font-bold text-[#2E6F40] mb-5">
            {result.archetype.titleEn} · {result.era.titleBn} ({result.era.approxYears})
          </p>

          {/* Signature Memory Quote Box */}
          <div className="max-w-2xl w-full bg-[#F3FAF5] rounded-2xl p-6 border-2 border-[#2E6F40]/20 mb-6 shadow-xs">
            <p className="text-lg text-[#253D2C]/90 italic font-medium leading-relaxed">
              “{result.signatureMemoryBn}”
            </p>
          </div>

          {/* Nostalgia Badges */}
          <div className="w-full max-w-2xl">
            <span className="text-xs font-bold text-[#253D2C]/70 block mb-2 uppercase tracking-wider">
              স্বাক্ষরিত স্মৃতির ব্যাজ:
            </span>
            <div className="grid grid-cols-3 gap-3">
              {result.badges.slice(0, 3).map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center p-3 rounded-xl bg-[#CFFFD6]/40 border border-[#2E6F40]/20 text-center"
                >
                  <span className="text-3xl">{badge.icon}</span>
                  <span className="text-xs font-bold text-[#253D2C] mt-1.5 line-clamp-1">
                    {badge.titleBn}
                  </span>
                  <span className="text-[10px] text-[#253D2C]/70 mt-0.5 line-clamp-1">
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
              <div className="w-12 h-12 rounded-xl bg-[#2E6F40] flex items-center justify-center font-bold border border-[#68BA7F] shrink-0">
                <Award className="w-7 h-7 text-[#CFFFD6]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#68BA7F] uppercase tracking-wider block">
                  নস্টালজিয়া স্কোর
                </span>
                <span className="text-2xl font-extrabold text-white">
                  {result.nostalgiaScore}% খাঁটি শৈশব
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs text-white/70 block uppercase font-medium">
                স্মৃতি যুগ
              </span>
              <span className="text-base font-bold text-[#CFFFD6]">
                {result.era.titleBn}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-[#2E6F40]/15 flex items-center justify-between text-xs font-semibold text-[#253D2C]/70">
            <span>পরিচয়পত্র আইডি: {result.id}</span>
            <span className="flex items-center gap-1.5 text-[#2E6F40] font-bold">
              <Sparkles className="w-4 h-4" />
              <span>shoishob-bd.vercel.app</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Interactive Responsive Web Preview
  return (
    <div
      className={`relative w-full bg-white rounded-3xl border-2 border-[#2E6F40]/25 shadow-xl text-[#253D2C] ${
        isLandscape ? 'max-w-2xl p-6 sm:p-7' : 'max-w-lg p-5 sm:p-6'
      } mx-auto flex flex-col justify-between select-none transition-all`}
      style={{
        backgroundImage: 'radial-gradient(rgba(46, 111, 64, 0.06) 1.2px, transparent 0)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b-2 border-[#2E6F40]/15 pb-3.5 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2E6F40]/30 shadow-xs shrink-0 bg-[#253D2C]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-shoishob.png"
              alt="শৈশব লোগো"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight block leading-tight text-[#253D2C]">
              আমার শৈশব · SHOISHOB
            </span>
            <span className="text-[10px] font-semibold text-[#2E6F40]">
              বাংলাদেশি শৈশব পরিচয়পত্র
            </span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="space-y-3.5 mb-4">
        <div className="rounded-2xl bg-[#F0FAF3] border border-[#2E6F40]/15 p-4 text-center relative">
          <div className="w-16 h-16 mx-auto mb-2 rounded-2xl bg-[#2E6F40] flex items-center justify-center text-3xl shadow-md border-2 border-[#CFFFD6]">
            {result.archetype.avatarIcon}
          </div>

          <span className="text-[10px] font-bold text-[#2E6F40] uppercase tracking-wider block">
            শৈশব আর্কিটাইপ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#253D2C] mt-0.5 tracking-tight">
            {result.archetype.titleBn}
          </h2>
          <p className="text-xs font-semibold text-[#2E6F40] mt-0.5">
            {result.archetype.titleEn} · {result.era.titleBn}
          </p>
        </div>

        {/* Signature Memory Quote */}
        <div className="bg-[#F7FAF7] rounded-xl p-3.5 border border-[#2E6F40]/10 text-center">
          <p className="text-xs sm:text-sm text-[#253D2C]/90 italic leading-relaxed">
            “{result.signatureMemoryBn}”
          </p>
        </div>

        {/* Badges Row */}
        <div>
          <span className="text-[10px] font-bold text-[#253D2C]/70 block mb-1.5 uppercase tracking-wider">
            স্বাক্ষরিত স্মৃতির ব্যাজ:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {result.badges.slice(0, 3).map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#CFFFD6]/40 border border-[#2E6F40]/15 text-center min-h-[64px]"
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-[10px] font-bold text-[#253D2C] mt-0.5 leading-snug line-clamp-1">
                  {badge.titleBn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div>
        <div className="rounded-2xl bg-[#253D2C] text-white p-3.5 flex items-center justify-between shadow-md mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2E6F40] flex items-center justify-center font-bold border border-[#68BA7F] shrink-0">
              <Award className="w-5 h-5 text-[#CFFFD6]" />
            </div>
            <div>
              <span className="text-[9px] font-semibold text-[#68BA7F] uppercase tracking-wider block">
                নস্টালজিয়া স্কোর
              </span>
              <span className="text-base sm:text-lg font-extrabold text-white">
                {result.nostalgiaScore}% খাঁটি শৈশব
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[9px] text-white/60 block">আনুমানিক যুগ</span>
            <span className="text-xs font-bold text-[#CFFFD6]">{result.era.approxYears}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#2E6F40]/10 flex items-center justify-between text-[10px] text-[#253D2C]/60">
          <span>আইডি: {result.id}</span>
          <span className="flex items-center gap-1 font-semibold text-[#2E6F40]">
            <Sparkles className="w-3 h-3" />
            <span>shoishob-bd.vercel.app</span>
          </span>
        </div>
      </div>
    </div>
  );
}
