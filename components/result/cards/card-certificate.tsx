import React from 'react';
import { ChildhoodResult } from '@/types/result';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export interface CardCertificateProps {
  result: ChildhoodResult;
}

export function CardCertificate({ result }: CardCertificateProps) {
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
      <header className="flex items-center gap-5 rounded-[32px] bg-[#174A32] px-6 py-5 shadow-lg">
        <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-[#F6C453] shrink-0 bg-[#102F22]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-shoishob.png" alt="" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-6xl font-black text-white leading-tight m-0 p-0">শৈশব সনদপত্র</h1>
      </header>

      <main className="my-auto py-5 space-y-6">
        <section className="rounded-[36px] bg-[#F6C453] border-4 border-white p-7 text-center shadow-lg">
          <h2 className="text-7xl font-black text-[#174A32] leading-tight m-0 p-0">
            {result.archetype.titleBn}
          </h2>
          <p className="text-3xl font-bold text-[#71430F] mt-3 m-0 p-0">
            {result.era.titleBn} · {result.era.approxYears}
          </p>
        </section>

        <section className="rounded-[32px] bg-white border-2 border-[#174A32]/20 p-5 shadow-md">
          <div className="grid grid-cols-2 gap-3">
            {result.dimensions.map((dim, idx) => (
              <div
                key={dim.key}
                className="flex items-center justify-between gap-3 p-4 rounded-[20px] border border-white"
                style={{ backgroundColor: ['#DDF4E4', '#D6E8FA', '#FCE7B2', '#F8D7D1', '#E7D9F5'][idx % 5] }}
              >
                <span className="font-bold text-3xl text-[#183B2B] flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-7 h-7 text-[#174A32] shrink-0" />
                  <span className="truncate">{dim.nameBn}</span>
                </span>
                <span className="font-black text-3xl text-[#174A32] shrink-0">{dim.percentage}%</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="rounded-[32px] bg-[#174A32] text-white px-7 py-5 flex items-center justify-between shadow-xl border-2 border-[#F6C453]">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-14 h-14 text-[#F6C453] shrink-0" />
          <span className="text-4xl font-bold text-[#F6C453]">খাঁটি শৈশব</span>
        </div>
        <span className="text-6xl font-black">{result.nostalgiaScore}%</span>
      </footer>
    </div>
  );
}
