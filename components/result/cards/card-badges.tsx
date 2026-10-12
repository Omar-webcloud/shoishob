import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { Sparkles, Trophy } from 'lucide-react';

interface CardBadgesProps {
  result: ChildhoodResult;
  orientation?: 'portrait' | 'landscape';
  isExport?: boolean;
}

export function CardBadges({
  result,
  orientation = 'portrait',
  isExport = false,
}: CardBadgesProps) {
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
        <div className="flex items-center justify-between border-b-4 border-[#2E6F40]/20 pb-5">
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
                অর্জিত স্মৃতিচিহ্ন ও ব্যাজ
              </span>
              <span className="text-sm font-semibold text-[#2E6F40] tracking-wider uppercase">
                কুইজের উত্তরে আনলক করা শৈশব ট্রফি
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#253D2C]/70 block font-semibold uppercase">
              স্মৃতি আর্কিটাইপ
            </span>
            <span className="text-lg font-black text-[#2E6F40]">
              {result.archetype.titleBn}
            </span>
          </div>
        </div>

        {/* Center Grid of Badges */}
        <div className="my-auto py-4">
          <div className="text-center mb-6">
            <span className="text-sm font-bold text-[#2E6F40] uppercase tracking-wider block">
              আপনার স্মৃতি ভল্ট
            </span>
            <h2 className="text-2xl font-black text-[#253D2C] mt-1">
              যে স্মৃতির ব্যাজগুলো অর্জন করেছেন আপনি
            </h2>
          </div>

          <div
            className={`grid ${
              isLandscape ? 'grid-cols-3 gap-4' : 'grid-cols-2 gap-4'
            }`}
          >
            {result.badges.slice(0, 6).map((badge) => (
              <div
                key={badge.id}
                className="bg-[#F8FCF9] border-2 border-[#2E6F40]/20 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs"
              >
                <span className="text-4xl mb-2">{badge.icon}</span>
                <h3 className="text-base font-bold text-[#253D2C]">
                  {badge.titleBn}
                </h3>
                <p className="text-xs text-[#253D2C]/75 mt-1 leading-relaxed">
                  {badge.descriptionBn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Score Bar */}
        <div>
          <div className="rounded-2xl bg-[#253D2C] text-white p-5 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2E6F40] flex items-center justify-center font-bold border border-[#68BA7F] shrink-0">
                <Trophy className="w-6 h-6 text-[#CFFFD6]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#68BA7F] uppercase tracking-wider block">
                  মোট আনলক করা স্মৃতিচিহ্ন
                </span>
                <span className="text-2xl font-extrabold text-white">
                  {result.badges.length}টি ব্যাজ অর্জিত · {result.nostalgiaScore}% খাঁটি
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
            <span>কালেকশন আইডি: {result.id}</span>
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
      {/* Top Header */}
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
              অর্জিত স্মৃতিচিহ্ন ও ব্যাজ
            </span>
            <span className="text-[10px] font-semibold text-[#2E6F40]">
              কুইজের উত্তরে আনলক করা বিশেষ ব্যাজ
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="space-y-3 mb-4">
        <div className="text-center px-1">
          <span className="text-[10px] font-bold text-[#2E6F40] uppercase tracking-wider block">
            আপনার স্মৃতি ভল্ট
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#253D2C] mt-0.5">
            {result.archetype.titleBn}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {result.badges.slice(0, 6).map((badge) => (
            <div
              key={badge.id}
              className="p-3 rounded-2xl bg-[#F8FCF9] border border-[#2E6F40]/15 flex flex-col items-center text-center"
            >
              <span className="text-2xl mb-1">{badge.icon}</span>
              <span className="text-xs font-bold text-[#253D2C] leading-snug line-clamp-1">
                {badge.titleBn}
              </span>
              <span className="text-[10px] text-[#253D2C]/70 mt-0.5 line-clamp-1">
                {badge.descriptionBn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bar */}
      <div>
        <div className="rounded-2xl bg-[#253D2C] text-white p-3.5 flex items-center justify-between shadow-md mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2E6F40] flex items-center justify-center font-bold border border-[#68BA7F] shrink-0">
              <Trophy className="w-5 h-5 text-[#CFFFD6]" />
            </div>
            <div>
              <span className="text-[9px] font-semibold text-[#68BA7F] uppercase tracking-wider block">
                আনলক করা ব্যাজ
              </span>
              <span className="text-base sm:text-lg font-extrabold text-white">
                {result.badges.length}টি ব্যাজ · {result.nostalgiaScore}% খাঁটি
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[9px] text-white/60 block">স্মৃতি যুগ</span>
            <span className="text-xs font-bold text-[#CFFFD6]">{result.era.titleBn}</span>
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
