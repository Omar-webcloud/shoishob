import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface CardCertificateProps {
  result: ChildhoodResult;
  orientation?: 'portrait' | 'landscape';
}

export function CardCertificate({
  result,
  orientation = 'portrait',
}: CardCertificateProps) {
  const isLandscape = orientation === 'landscape';

  return (
    <div
      className={`bg-[#FCFDFB] text-[#253D2C] flex flex-col justify-between border-8 border-double border-[#2E6F40] ${
        isLandscape ? 'w-[1200px] h-[750px] p-10' : 'w-[1080px] h-[1350px] p-12'
      }`}
      style={{
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', 'Anek Bangla', system-ui, sans-serif",
        backgroundImage: 'radial-gradient(rgba(46, 111, 64, 0.05) 2px, transparent 0)',
        backgroundSize: '28px 28px',
        boxSizing: 'border-box',
      }}
    >
      {/* Certificate Header */}
      <div className="text-center border-b-4 border-[#2E6F40]/25 pb-5">
        <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-[#2E6F40] shadow-md mx-auto mb-2 bg-[#253D2C]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-shoishob.png"
            alt="শৈশব লোগো"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-bold text-[#2E6F40] tracking-widest uppercase block whitespace-nowrap">
            বাংলাদেশ শৈশব সংরক্ষণ কর্তৃপক্ষ · আর্কাইভ সনদ
          </span>
          <h1 className="text-4xl font-black text-[#253D2C] tracking-tight m-0 p-0 whitespace-nowrap">
            খাঁটি শৈশব সনদপত্র
          </h1>
          <p className="text-xs text-[#253D2C]/70 tracking-widest uppercase m-0 p-0 whitespace-nowrap">
            CERTIFICATE OF AUTHENTIC CHILDHOOD NOSTALGIA
          </p>
        </div>
      </div>

      {/* Certificate Main Body */}
      <div className="my-auto py-4 text-center max-w-3xl mx-auto space-y-6">
        <p className="text-lg text-[#253D2C]/85 leading-relaxed font-medium">
          যথাযথ কুইজ যাচাই ও স্মৃতি রোমন্থন শেষে আনুষ্ঠানিকভাবে প্রত্যয়ন করা যাইতেছে যে, উপরোক্ত স্মৃতিধারী ব্যক্তি ৯০ ও ২০০০ দশকের সোনালী শৈশব ঐতিহ্যের এক পরম অংশীদার।
        </p>

        {/* Conferred Title Ribbon */}
        <div className="bg-[#F0FAF3] border-3 border-[#2E6F40] rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-[#2E6F40] uppercase tracking-wider block mb-1">
            প্রদত্ত শৈশব উপাধি:
          </span>
          <h2 className="text-3xl font-black text-[#253D2C] m-0 p-0">
            {result.archetype.titleBn}
          </h2>
          <p className="text-sm font-semibold text-[#2E6F40] mt-1.5 m-0 p-0">
            {result.archetype.titleEn} · {result.era.titleBn} ({result.era.approxYears})
          </p>
        </div>

        {/* Dimension Scores Table */}
        <div className="bg-white border-2 border-[#2E6F40]/20 rounded-2xl p-4 text-left">
          <span className="text-xs font-bold text-[#253D2C]/70 block mb-2.5 text-center uppercase tracking-wider">
            মূল্যায়িত স্মৃতি ডাইমেনশন:
          </span>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {result.dimensions.map((dim) => (
              <div
                key={dim.key}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FCF9] border border-[#2E6F40]/10"
              >
                <span className="font-semibold text-[#253D2C] flex items-center gap-1.5 truncate">
                  <CheckCircle2 className="w-4 h-4 text-[#2E6F40] shrink-0" />
                  <span className="truncate">{dim.nameBn}</span>
                </span>
                <span className="font-bold text-[#2E6F40] shrink-0 ml-2">{dim.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Footer with Seals */}
      <div>
        <div className="flex items-center justify-between border-t-4 border-[#2E6F40]/20 pt-4 text-xs">
          <div className="text-left flex flex-col gap-1">
            <span className="text-xs text-[#253D2C]/60 block uppercase font-medium">
              সনদপত্র নম্বর
            </span>
            <span className="font-bold text-sm text-[#253D2C] block font-mono">
              {result.id}
            </span>
            <span className="text-xs text-[#2E6F40] font-semibold block">
              ইস্যু তারিখ: {new Date().toLocaleDateString('bn-BD')}
            </span>
          </div>

          {/* Official Vintage Seal */}
          <div className="w-24 h-24 rounded-full border-4 border-dashed border-[#2E6F40] flex flex-col items-center justify-center p-1.5 text-center bg-[#CFFFD6]/50 shadow-xs shrink-0 gap-1">
            <ShieldCheck className="w-7 h-7 text-[#2E6F40] shrink-0" />
            <span className="text-xs font-black text-[#253D2C] uppercase leading-none whitespace-nowrap">
              {result.nostalgiaScore}% খাঁটি
            </span>
            <span className="text-[9px] text-[#2E6F40] font-bold leading-none">যাচাইকৃত</span>
          </div>

          <div className="text-right flex flex-col gap-1">
            <span className="text-xs text-[#253D2C]/60 block uppercase font-medium">
              অনলাইন যাচাই লিংক
            </span>
            <span className="font-bold text-sm text-[#2E6F40] flex items-center gap-1.5 justify-end">
              <Sparkles className="w-4 h-4" />
              <span>shoishob-bd.vercel.app</span>
            </span>
            <span className="text-xs text-[#253D2C]/70 block italic">
              আমার শৈশব আর্কাইভ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
