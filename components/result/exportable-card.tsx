import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { Award, Sparkles } from 'lucide-react';

interface ExportableCardProps {
  result: ChildhoodResult;
  orientation?: 'portrait' | 'landscape';
}

export const ExportableCard = React.forwardRef<HTMLDivElement, ExportableCardProps>(
  ({ result, orientation = 'portrait' }, ref) => {
    const isLandscape = orientation === 'landscape';

    return (
      <div
        ref={ref}
        className={`bg-[#FFFFFF] text-[#253D2C] flex flex-col justify-between border-4 border-[#2E6F40] ${
          isLandscape
            ? 'w-[1200px] h-[750px] p-12'
            : 'w-[1080px] h-[1350px] p-14'
        }`}
        style={{
          fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', 'Anek Bangla', system-ui, sans-serif",
          backgroundImage:
            'radial-gradient(rgba(46, 111, 64, 0.08) 2px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      >
        {/* Top Header with official Shoishob Logo */}
        <div className="flex items-center justify-between border-b-4 border-[#2E6F40]/20 pb-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-[#2E6F40] shadow-md shrink-0 bg-[#253D2C]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-shoishob.png"
                alt="শৈশব লোগো"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-4xl font-black tracking-tight block text-[#253D2C]">
                আমার শৈশব · SHOISHOB
              </span>
            </div>
          </div>
        </div>

        {/* Center Archetype Showcase */}
        <div className="my-auto py-6 flex flex-col items-center text-center">
          {/* Avatar Icon */}
          <div className="w-36 h-36 rounded-3xl bg-[#2E6F40] border-4 border-[#CFFFD6] flex items-center justify-center text-7xl shadow-xl mb-6">
            {result.archetype.avatarIcon}
          </div>

          <span className="text-xl font-bold text-[#2E6F40] uppercase tracking-widest block mb-2">
            শৈশব আর্কিটাইপ
          </span>
          <h1 className="text-6xl font-black text-[#253D2C] tracking-tight mb-3">
            {result.archetype.titleBn}
          </h1>
          <p className="text-2xl font-bold text-[#2E6F40] mb-8">
            {result.archetype.titleEn} · {result.era.titleBn} ({result.era.approxYears})
          </p>

          {/* Signature Memory Quote Box */}
          <div className="max-w-3xl w-full bg-[#F3FAF5] rounded-3xl p-8 border-2 border-[#2E6F40]/20 mb-10 shadow-sm">
            <p className="text-2xl text-[#253D2C]/90 italic font-medium leading-relaxed">
              “{result.signatureMemoryBn}”
            </p>
          </div>

          {/* Nostalgia Badges Showcase */}
          <div className="w-full max-w-3xl">
            <span className="text-base font-bold text-[#253D2C]/70 block mb-3 uppercase tracking-wider">
              স্বাক্ষরিত স্মৃতির ব্যাজ:
            </span>
            <div className="grid grid-cols-3 gap-5">
              {result.badges.slice(0, 3).map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center p-4 rounded-2xl bg-[#CFFFD6]/40 border-2 border-[#2E6F40]/20 text-center"
                >
                  <span className="text-4xl">{badge.icon}</span>
                  <span className="text-base font-bold text-[#253D2C] mt-2">
                    {badge.titleBn}
                  </span>
                  <span className="text-xs text-[#253D2C]/70 mt-1 line-clamp-1">
                    {badge.descriptionBn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Score & Verification Bar */}
        <div>
          <div className="rounded-3xl bg-[#253D2C] text-white p-7 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#2E6F40] flex items-center justify-center font-bold text-2xl border-2 border-[#68BA7F] shrink-0">
                <Award className="w-9 h-9 text-[#CFFFD6]" />
              </div>
              <div>
                <span className="text-sm font-bold text-[#68BA7F] uppercase tracking-wider block">
                  নস্টালজিয়া স্কোর
                </span>
                <span className="text-3xl font-extrabold text-white">
                  {result.nostalgiaScore}% খাঁটি শৈশব
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-sm text-white/70 block uppercase font-medium">
                স্মৃতি যুগ
              </span>
              <span className="text-xl font-bold text-[#CFFFD6]">
                {result.era.titleBn}
              </span>
            </div>
          </div>

          {/* Bottom Stamp & Link */}
          <div className="mt-6 pt-4 border-t-2 border-[#2E6F40]/15 flex items-center justify-between text-base font-semibold text-[#253D2C]/70">
            <span>পরিচয়পত্র আইডি: {result.id}</span>
            <span className="flex items-center gap-2 text-[#2E6F40] font-bold text-lg">
              <Sparkles className="w-5 h-5" />
              <span>shoishob-bd.vercel.app</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
);

ExportableCard.displayName = 'ExportableCard';
