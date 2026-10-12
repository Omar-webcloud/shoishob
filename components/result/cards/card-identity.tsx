import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { Award } from 'lucide-react';

export interface CardIdentityProps {
  result: ChildhoodResult;
}

export function CardIdentity({
  result,
}: CardIdentityProps) {
  return (
    <div
      className="bg-[#FFF8E7] text-[#183B2B] flex flex-col justify-between border-[12px] border-[#174A32] w-[1080px] h-[1350px] p-9"
      style={{
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', 'Anek Bangla', system-ui, sans-serif",
        backgroundImage: 'radial-gradient(rgba(202, 137, 37, 0.14) 2px, transparent 0)',
        backgroundSize: '28px 28px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-y-3 rounded-2xl bg-[#174A32] px-6 py-5 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 rounded-full overflow-hidden border-3 border-[#F6C453] shadow-md shrink-0 bg-[#102F22]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-shoishob.png"
              alt="শৈশব লোগো"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-5xl font-black tracking-tight text-white leading-tight m-0 p-0 whitespace-nowrap">
              আমার শৈশব · SHOISHOB
            </h2>
          </div>
        </div>
        <div className="px-5 py-3 rounded-full bg-[#F6C453] shrink-0">
          <span className="text-3xl font-black text-[#183B2B] uppercase tracking-wider whitespace-normal">
            শৈশব পরিচয়পত্র
          </span>
        </div>
      </div>

      {/* Center Archetype Showcase */}
      <div className="my-auto py-2 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-3xl bg-[#E9A93B] border-4 border-white flex items-center justify-center text-6xl shadow-xl mb-3 shrink-0">
          {result.archetype.avatarIcon}
        </div>

        <div className="flex flex-col items-center gap-2 mb-4 max-w-4xl">
          <h1 className="text-7xl font-black text-[#174A32] tracking-tight leading-tight m-0 p-0">
            {result.archetype.titleBn}
          </h1>
          <p className="text-3xl font-bold text-[#9A5B13] m-0 p-0 leading-tight">
            {result.era.titleBn} · {result.era.approxYears}
          </p>
        </div>

        {/* Signature Memory Quote Box */}
        <div className="max-w-4xl w-full bg-[#DDF4E4] rounded-2xl p-5 border-2 border-[#2E6F40]/30 mb-4 shadow-md">
          <p className="text-4xl text-[#183B2B] italic font-semibold leading-snug m-0">
            “{result.signatureMemoryBn}”
          </p>
        </div>

        {/* Nostalgia Badges */}
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-3">
            {result.badges.slice(0, 3).map((badge, idx) => (
              <div
                key={badge.id}
                className="flex items-center gap-5 p-4 rounded-xl border-2 border-white/80 text-left shadow-sm"
                style={{ backgroundColor: ['#F6C453', '#9FE3C0', '#A9D5F3'][idx] }}
              >
                <span className="text-4xl shrink-0">{badge.icon}</span>
                <span className="min-w-0 text-4xl font-bold text-[#183B2B] leading-tight whitespace-normal">
                  {badge.titleBn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Score Bar */}
      <div className="rounded-2xl bg-[#174A32] text-white p-6 flex items-center justify-between shadow-xl border-2 border-[#F6C453]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F6C453] flex items-center justify-center font-bold shrink-0">
              <Award className="w-9 h-9 text-[#174A32]" />
            </div>
            <div className="flex flex-col">
              <span className="text-6xl font-extrabold text-white block leading-none whitespace-nowrap">
                {result.nostalgiaScore}%
              </span>
              <span className="text-3xl font-bold text-[#F6C453]">নস্টালজিয়া স্কোর</span>
            </div>
          </div>

      </div>
    </div>
  );
}
