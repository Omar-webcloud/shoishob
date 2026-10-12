'use client';

import React, { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { decodeShareQueryToResult } from '@/lib/share';
import { IdentityCard } from '@/components/result/identity-card';
import { ScoreBreakdown } from '@/components/result/score-breakdown';
import { Sparkles, ArrowRight, AlertTriangle } from 'lucide-react';

function ShareContent() {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const v = searchParams.get('v');

  const result = useMemo(() => {
    if (!data || v !== '1') return null;
    return decodeShareQueryToResult(data);
  }, [data, v]);

  if (!result) {
    return (
      <div className="max-w-md mx-auto my-14 p-8 text-center tactile-card bg-white space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-[#253D2C]">
          শেয়ার লিংকটি অকার্যকর বা পরিবর্তিত
        </h2>
        <p className="text-sm text-[#253D2C]/75 leading-relaxed">
          শেয়ার করা লিংকের ডেটা সঠিক নয় অথবা লিঙ্কটি অসম্পূর্ণ। চিন্তার কোনো কারণ নেই, আপনি নিজেই এখনই ২ মিনিটে আপনার শৈশব কার্ড তৈরি করে নিতে পারেন!
        </p>
        <div className="pt-2">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#2E6F40] text-white font-bold text-sm shadow-md hover:bg-[#253D2C] transition-all"
          >
            <span>আমার শৈশব দেখি</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Shared Header Message */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CFFFD6] text-xs sm:text-sm font-bold text-[#253D2C] uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-[#2E6F40]" />
          <span>বন্ধুর শৈশব পরিচয়পত্র</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#253D2C] tracking-tight">
          সে ছিল <span className="text-[#2E6F40]">&ldquo;{result.archetype.titleBn}&rdquo;</span>!
        </h1>
        <p className="text-sm sm:text-base text-[#253D2C]/80 max-w-lg mx-auto">
          {result.archetype.taglineBn}
        </p>
      </div>

      {/* Identity Card Display */}
      <div className="w-full">
        <IdentityCard result={result} />
      </div>

      {/* Challenge Call to Action Banner */}
      <div className="tactile-card p-6 sm:p-8 bg-gradient-to-br from-[#F0FAF3] to-[#E7FCEB] border-2 border-[#2E6F40]/30 text-center space-y-4">
        <span className="text-xs font-bold text-[#2E6F40] uppercase tracking-wider block">
          আপনার পালা · YOUR TURN
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#253D2C]">
          আপনার শৈশবটা কোন যুগের ছিল?
        </h2>
        <p className="text-sm text-[#253D2C]/80 max-w-md mx-auto">
          বিকেলের গলির ক্রিকেট, স্কুলের টিফিনের পরোটা নাকি টিভির কার্টুন? ১০টি সহজ প্রশ্নে জেনে নিন আপনার নিজস্ব স্মৃতি পরিচয়!
        </p>
        <div>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#2E6F40] hover:bg-[#253D2C] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            <span>আমার শৈশব দেখি</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Archetype Narrative Details */}
      <ScoreBreakdown result={result} />
    </div>
  );
}

export default function SharePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-3 border-[#2E6F40]/30 border-t-[#2E6F40] rounded-full animate-spin mb-3" />
              <p className="text-sm text-[#253D2C]/70">কার্ড লোড হচ্ছে...</p>
            </div>
          }
        >
          <ShareContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
