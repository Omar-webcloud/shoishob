import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { Sparkles, Trophy } from 'lucide-react';

export interface CardBadgesProps {
  result: ChildhoodResult;
  orientation?: 'portrait' | 'landscape';
}

export function CardBadges({
  result,
  orientation = 'portrait',
}: CardBadgesProps) {
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
              অর্জিত স্মৃতিচিহ্ন ও ব্যাজ
            </h2>
            <p className="text-sm font-bold text-[#2E6F40] tracking-wider uppercase m-0 p-0 whitespace-nowrap">
              কুইজের উত্তরে আনলক করা শৈশব ট্রফি
            </p>
          </div>
        </div>
        <div className="text-right flex flex-col gap-0.5 shrink-0">
          <span className="text-xs text-[#253D2C]/70 block font-semibold uppercase">
            স্মৃতি আর্কিটাইপ
          </span>
          <span className="text-base font-black text-[#2E6F40] block leading-tight whitespace-nowrap">
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
          <h2 className="text-2xl font-black text-[#253D2C] mt-1 m-0 p-0">
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
              <h3 className="text-base font-bold text-[#253D2C] m-0 p-0">
                {badge.titleBn}
              </h3>
              <p className="text-xs text-[#253D2C]/75 mt-1 leading-relaxed m-0 p-0">
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
            <div className="w-13 h-13 rounded-xl bg-[#2E6F40] flex items-center justify-center font-bold border border-[#68BA7F] shrink-0">
              <Trophy className="w-7 h-7 text-[#CFFFD6]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-[#68BA7F] uppercase tracking-wider block">
                মোট আনলক করা স্মৃতিচিহ্ন
              </span>
              <span className="text-2xl font-extrabold text-white block leading-none whitespace-nowrap mt-0.5">
                {result.badges.length}টি ব্যাজ অর্জিত · {result.nostalgiaScore}% খাঁটি
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
          <span className="truncate">কালেকশন আইডি: {result.id}</span>
          <span className="flex items-center gap-1.5 text-[#2E6F40] font-bold shrink-0">
            <Sparkles className="w-4 h-4" />
            <span>shoishob-bd.vercel.app</span>
          </span>
        </div>
      </div>
    </div>
  );
}
