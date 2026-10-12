import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CardCertificateProps {
  result: ChildhoodResult;
  orientation?: 'portrait' | 'landscape';
  isExport?: boolean;
}

export function CardCertificate({
  result,
  orientation = 'portrait',
  isExport = false,
}: CardCertificateProps) {
  const isLandscape = orientation === 'landscape';

  if (isExport) {
    return (
      <div
        className={`bg-[#FCFDFB] text-[#253D2C] flex flex-col justify-between border-8 border-double border-[#2E6F40] ${
          isLandscape ? 'w-[1200px] h-[750px] p-10' : 'w-[1080px] h-[1350px] p-12'
        }`}
        style={{
          fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', 'Anek Bangla', system-ui, sans-serif",
          backgroundImage: 'radial-gradient(rgba(46, 111, 64, 0.05) 2px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      >
        {/* Certificate Header */}
        <div className="text-center border-b-4 border-[#2E6F40]/25 pb-5">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2E6F40] shadow-md mx-auto mb-2 bg-[#253D2C]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-shoishob.png"
              alt="শৈশব লোগো"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs font-bold text-[#2E6F40] tracking-widest uppercase block">
            বাংলাদেশ শৈশব সংরক্ষণ কর্তৃপক্ষ · আর্কাইভ সনদ
          </span>
          <h1 className="text-4xl font-black text-[#253D2C] tracking-tight mt-1">
            খাঁটি শৈশব সনদপত্র
          </h1>
          <p className="text-xs text-[#253D2C]/70 tracking-widest uppercase mt-0.5">
            CERTIFICATE OF AUTHENTIC CHILDHOOD NOSTALGIA
          </p>
        </div>

        {/* Certificate Main Body */}
        <div className="my-auto py-4 text-center max-w-3xl mx-auto space-y-5">
          <p className="text-base text-[#253D2C]/80 leading-relaxed font-medium">
            যথাযথ কুইজ যাচাই ও স্মৃতি রোমন্থন শেষে আনুষ্ঠানিকভাবে প্রত্যয়ন করা যাইতেছে যে, উপরোক্ত স্মৃতিধারী ব্যক্তি ৯০ ও ২০০০ দশকের সোনালী শৈশব ঐতিহ্যের এক পরম অংশীদার।
          </p>

          {/* Conferred Title Ribbon */}
          <div className="bg-[#F0FAF3] border-3 border-[#2E6F40] rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-bold text-[#2E6F40] uppercase tracking-wider block mb-1">
              প্রদত্ত শৈশব উপাধি:
            </span>
            <h2 className="text-3xl font-black text-[#253D2C]">
              {result.archetype.titleBn}
            </h2>
            <p className="text-sm font-semibold text-[#2E6F40] mt-1">
              {result.archetype.titleEn} · {result.era.titleBn} ({result.era.approxYears})
            </p>
          </div>

          {/* Dimension Scores Table */}
          <div className="bg-white border-2 border-[#2E6F40]/20 rounded-2xl p-4 text-left">
            <span className="text-xs font-bold text-[#253D2C]/70 block mb-2 text-center uppercase tracking-wider">
              মূল্যায়িত স্মৃতি ডাইমেনশন:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {result.dimensions.map((dim) => (
                <div
                  key={dim.key}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#F8FCF9] border border-[#2E6F40]/10"
                >
                  <span className="font-semibold text-[#253D2C] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6F40]" />
                    <span>{dim.nameBn}</span>
                  </span>
                  <span className="font-bold text-[#2E6F40]">{dim.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate Footer with Seals */}
        <div>
          <div className="flex items-center justify-between border-t-4 border-[#2E6F40]/20 pt-4 text-xs">
            <div className="text-left space-y-1">
              <span className="text-[10px] text-[#253D2C]/60 block uppercase font-medium">
                সনদপত্র নম্বর
              </span>
              <span className="font-bold text-sm text-[#253D2C] block font-mono">
                {result.id}
              </span>
              <span className="text-[10px] text-[#2E6F40] font-semibold block">
                ইস্যু তারিখ: {new Date().toLocaleDateString('bn-BD')}
              </span>
            </div>

            {/* Official Vintage Seal */}
            <div className="w-24 h-24 rounded-full border-4 border-dashed border-[#2E6F40] flex flex-col items-center justify-center p-2 text-center bg-[#CFFFD6]/50 shadow-xs shrink-0 gap-1">
              <ShieldCheck className="w-7 h-7 text-[#2E6F40] shrink-0" />
              <span className="text-[11px] font-black text-[#253D2C] uppercase leading-none whitespace-nowrap">
                {result.nostalgiaScore}% খাঁটি
              </span>
              <span className="text-[8px] text-[#2E6F40] font-bold leading-none">যাচাইকৃত</span>
            </div>

            <div className="text-right space-y-1">
              <span className="text-[10px] text-[#253D2C]/60 block uppercase font-medium">
                অনলাইন যাচাই লিংক
              </span>
              <span className="font-bold text-xs text-[#2E6F40] flex items-center gap-1 justify-end">
                <Sparkles className="w-3 h-3" />
                <span>shoishob-bd.vercel.app</span>
              </span>
              <span className="text-[10px] text-[#253D2C]/70 block italic">
                আমার শৈশব আর্কাইভ
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Interactive Responsive Web Preview
  return (
    <div
      className={`relative w-full bg-[#FCFDFB] rounded-3xl border-4 border-double border-[#2E6F40]/40 shadow-xl text-[#253D2C] ${
        isLandscape ? 'max-w-2xl p-6 sm:p-7' : 'max-w-lg p-5 sm:p-6'
      } mx-auto flex flex-col justify-between select-none transition-all`}
      style={{
        backgroundImage: 'radial-gradient(rgba(46, 111, 64, 0.05) 1.2px, transparent 0)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Top Header */}
      <div className="text-center border-b-2 border-[#2E6F40]/20 pb-3 mb-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2E6F40] shadow-xs mx-auto mb-1.5 bg-[#253D2C]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-shoishob.png"
            alt="শৈশব লোগো"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[9px] font-bold text-[#2E6F40] tracking-wider uppercase block">
          বাংলাদেশ শৈশব সংরক্ষণ কর্তৃপক্ষ
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-[#253D2C] tracking-tight mt-0.5">
          খাঁটি শৈশব সনদপত্র
        </h2>
        <span className="text-[9px] text-[#253D2C]/60 uppercase tracking-widest block">
          CERTIFICATE OF AUTHENTIC CHILDHOOD NOSTALGIA
        </span>
      </div>

      {/* Main Body */}
      <div className="space-y-3 mb-3 text-center">
        <p className="text-xs text-[#253D2C]/80 leading-relaxed font-medium">
          কুইজ যাচাই শেষে আনুষ্ঠানিকভাবে প্রত্যয়ন করা যাইতেছে যে, উপরোক্ত স্মৃতিধারী ব্যক্তি ৯০ ও ২০০০ দশকের সোনালী শৈশব ঐতিহ্যের এক খাঁটি অংশীদার।
        </p>

        {/* Conferred Title Ribbon */}
        <div className="bg-[#F0FAF3] border-2 border-[#2E6F40]/40 rounded-2xl p-3.5 shadow-xs">
          <span className="text-[9px] font-bold text-[#2E6F40] uppercase tracking-wider block">
            প্রদত্ত শৈশব উপাধি:
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#253D2C] mt-0.5">
            {result.archetype.titleBn}
          </h3>
          <p className="text-xs font-semibold text-[#2E6F40] mt-0.5">
            {result.archetype.titleEn} · {result.era.titleBn}
          </p>
        </div>

        {/* Dimension Scores Table */}
        <div className="bg-white border border-[#2E6F40]/20 rounded-xl p-3 text-left">
          <span className="text-[9px] font-bold text-[#253D2C]/70 block mb-1.5 text-center uppercase tracking-wider">
            স্মৃতি ডাইমেনশন মূল্যায়ন:
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            {result.dimensions.map((dim) => (
              <div
                key={dim.key}
                className="flex items-center justify-between p-1.5 rounded-lg bg-[#F8FCF9] border border-[#2E6F40]/10"
              >
                <span className="font-semibold text-[#253D2C] truncate">
                  {dim.nameBn}
                </span>
                <span className="font-bold text-[#2E6F40] shrink-0 ml-1">
                  {dim.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Seal */}
      <div className="border-t-2 border-[#2E6F40]/15 pt-2.5 flex items-center justify-between text-[10px]">
        <div>
          <span className="text-[#253D2C]/60 block">সনদ নম্বর</span>
          <span className="font-mono font-bold text-[#253D2C]">{result.id}</span>
        </div>

        <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#2E6F40] flex flex-col items-center justify-center px-1 py-1 text-center bg-[#CFFFD6]/60 shrink-0 shadow-xs gap-0.5">
          <ShieldCheck className="w-4 h-4 text-[#2E6F40] shrink-0" />
          <span className="text-[8px] sm:text-[9px] font-black text-[#253D2C] leading-none whitespace-nowrap">
            {result.nostalgiaScore}% খাঁটি
          </span>
          <span className="text-[7px] text-[#2E6F40] font-bold leading-none">
            যাচাইকৃত
          </span>
        </div>

        <div className="text-right">
          <span className="text-[#253D2C]/60 block">যাচাইকৃত পোর্টাল</span>
          <span className="font-bold text-[#2E6F40]">shoishob-bd.vercel.app</span>
        </div>
      </div>
    </div>
  );
}
