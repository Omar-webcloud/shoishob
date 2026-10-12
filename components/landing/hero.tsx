'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, ShieldCheck, Heart } from 'lucide-react';
import { CricketBatIcon, KiteIcon, CassetteIcon } from '@/components/common/nostalgia-motifs';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14">
      {/* Decorative background motifs */}
      <div className="absolute top-6 left-4 sm:left-12 opacity-15 pointer-events-none transform -rotate-12">
        <KiteIcon className="w-20 h-20 text-[#2E6F40]" color="#2E6F40" />
      </div>
      <div className="absolute bottom-4 right-4 sm:right-16 opacity-15 pointer-events-none transform rotate-12">
        <CricketBatIcon className="w-24 h-24 text-[#2E6F40]" color="#2E6F40" />
      </div>
      <div className="absolute top-1/2 right-6 opacity-10 pointer-events-none hidden md:block">
        <CassetteIcon className="w-20 h-20 text-[#2E6F40]" color="#2E6F40" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Logo Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#2E6F40]/20 shadow-xs mb-6">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#2E6F40]/30 shrink-0">
            <Image
              src="/logo-shoishob.png"
              alt="শৈশব লোগো"
              width={28}
              height={28}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#253D2C]">
            বাংলাদেশের শৈশব · নস্টালজিয়া আইডেন্টিটি জেনারেটর
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#253D2C] tracking-tight leading-[1.18] sm:leading-[1.15] mb-5">
          আপনার ছোটবেলার গল্পটা <br className="hidden sm:inline" />
          <span className="text-[#2E6F40] relative inline-block">
            কেমন ছিল?
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[#68BA7F]/40"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="6" fill="none" />
            </svg>
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-[#253D2C]/85 max-w-2xl mx-auto leading-relaxed mb-8">
          “Your childhood was a whole era. Let&apos;s find yours.” <br />
          বিকেলের গলির ক্রিকেট, স্কুলের টিফিনের ঘণ্টা, শুক্রবারের বিটিভি কার্টুন আর লোডশেডিংয়ে ছাদে ভূতের গল্প—১০টি সহজ প্রশ্নে আবিষ্কার করুন আপনার ব্যক্তিগত শৈশব পরিচয়পত্র!
        </p>

        {/* Single Main Primary CTA - No "নমুনা কার্ড দেখুন" */}
        <div className="flex items-center justify-center mb-8">
          <Link
            href="/quiz"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-2xl bg-[#2E6F40] hover:bg-[#253D2C] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all group"
          >
            <span>আমার শৈশব দেখি</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Quick Info Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#253D2C]/80 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#2E6F40]" />
            <span>মাত্র ২-৩ মিনিট সময় লাগবে</span>
          </div>
          <span className="hidden sm:inline text-[#2E6F40]/30">•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2E6F40]" />
            <span>কোনো অ্যাকাউন্ট বা সাইন-আপ নেই</span>
          </div>
          <span className="hidden sm:inline text-[#2E6F40]/30">•</span>
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#2E6F40]" />
            <span>১০০% খাঁটি বাংলাদেশি স্মৃতি</span>
          </div>
        </div>
      </div>
    </section>
  );
}
