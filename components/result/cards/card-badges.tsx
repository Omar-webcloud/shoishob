import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { Trophy } from 'lucide-react';

export interface CardBadgesProps {
  result: ChildhoodResult;
}

const tileColors = ['#F6C453', '#9FE3C0', '#A9D5F3', '#F3B7A9', '#D3B7EE', '#C8E2A0'];

export function CardBadges({ result }: CardBadgesProps) {
  return (
    <div
      className="bg-[#FFF8E7] text-[#183B2B] flex flex-col justify-between border-[12px] border-[#174A32] rounded-[56px] overflow-hidden w-[1080px] h-[1350px] p-9"
      style={{
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', 'Anek Bangla', system-ui, sans-serif",
        backgroundImage: 'radial-gradient(rgba(202, 137, 37, 0.13) 2px, transparent 0)',
        backgroundSize: '28px 28px',
        boxSizing: 'border-box',
      }}
    >
      <header className="flex items-center gap-4 rounded-[32px] bg-[#174A32] px-6 py-5 shadow-lg">
        <div className="w-18 h-18 rounded-full overflow-hidden border-3 border-[#F6C453] shrink-0 bg-[#102F22]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-shoishob.png" alt="" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-6xl font-black tracking-tight text-white leading-tight m-0 p-0">
          আমার শৈশবের ব্যাজ
        </h1>
      </header>

      <div className="my-auto py-5">
        <div className="grid grid-cols-2 gap-4">
          {result.badges.slice(0, 6).map((badge, idx) => (
            <div
              key={badge.id}
              className="border-2 border-white/90 rounded-[24px] p-5 flex flex-col items-center justify-center text-center shadow-md min-h-56"
              style={{ backgroundColor: tileColors[idx % tileColors.length] }}
            >
              <span className="text-5xl mb-2">{badge.icon}</span>
              <h2 className="text-4xl font-bold text-[#183B2B] leading-tight m-0 p-0">
                {badge.titleBn}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <footer className="rounded-[32px] bg-[#174A32] text-white p-6 flex items-center gap-5 shadow-xl border-2 border-[#F6C453]">
        <div className="w-16 h-16 rounded-2xl bg-[#F6C453] flex items-center justify-center shrink-0">
          <Trophy className="w-9 h-9 text-[#174A32]" />
        </div>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-5xl font-extrabold leading-tight">{result.badges.length}টি ব্যাজ</span>
          <span className="text-4xl font-bold text-[#F6C453]">{result.nostalgiaScore}% নস্টালজিয়া</span>
        </div>
      </footer>
    </div>
  );
}
