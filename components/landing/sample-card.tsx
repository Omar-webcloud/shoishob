import React from 'react';
import Link from 'next/link';
import { Sparkles, Award } from 'lucide-react';
import { CricketBatIcon } from '@/components/common/nostalgia-motifs';

export function SampleCard() {
  return (
    <section id="sample-preview" className="py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFFFD6] text-xs font-bold text-[#253D2C] uppercase tracking-wider mb-2">
            <span>নমুনা পরিচয়পত্র · SAMPLE IDENTITY CARD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#253D2C]">
            যেমনটি হবে তোমার শৈশবের কার্ড
          </h2>
          <p className="text-sm text-[#253D2C]/75 mt-1">
            কুইজ শেষে তুমিও পাবে এমনই একটি হাই-রেজ্যুলুশন ডাউনলোডেবল ও শেয়ারযোগ্য পরিচয়পত্র!
          </p>
        </div>

        {/* Sample Card Frame */}
        <div className="relative max-w-md mx-auto">
          {/* Subtle album shadow & decorative corner tags */}
          <div className="absolute -top-3 -right-3 bg-[#68BA7F] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>নমুনা প্রিভিউ</span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#2E6F40]/25 shadow-xl relative overflow-hidden">
            {/* Top Card Header */}
            <div className="flex items-center justify-between border-b border-[#2E6F40]/15 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#2E6F40]" />
                <span className="font-extrabold text-lg text-[#253D2C] tracking-tight">
                  আমার শৈশব · SHOISHOB
                </span>
              </div>
              <div className="nostalgia-stamp text-[10px] text-[#2E6F40] bg-[#CFFFD6]/50">
                খাঁটি শৈশব · ভেরিফায়েড
              </div>
            </div>

            {/* Archetype Hero Box */}
            <div className="rounded-2xl bg-[#F0FAF3] border border-[#2E6F40]/15 p-5 text-center mb-5 relative">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#2E6F40] flex items-center justify-center text-3xl shadow-md">
                🏏
              </div>
              <span className="text-xs font-bold text-[#2E6F40] uppercase tracking-wider">
                শৈশব আর্কিটাইপ
              </span>
              <h3 className="text-2xl font-extrabold text-[#253D2C] mt-0.5">
                গলির কিংবদন্তি
              </h3>
              <p className="text-xs font-medium text-[#2E6F40] mt-1">
                The Street-Game Legend · নব্বইয়ের স্বর্ণযুগ
              </p>
            </div>

            {/* Signature Memory Quote */}
            <div className="bg-[#F7FAF7] rounded-xl p-3.5 border border-[#2E6F40]/10 mb-4 text-center">
              <p className="text-xs sm:text-sm text-[#253D2C]/90 italic leading-relaxed">
                “বিকেলের বন্ধুদের ডাক, শেষ ওভারের নাটকীয় ছক্কা আর সূর্য ডুবে অন্ধকার না হওয়া পর্যন্ত বাড়ি না ফেরা—এই ছিল আমার শৈশব!”
              </p>
            </div>

            {/* Badges showcase */}
            <div className="mb-5">
              <span className="text-[11px] font-bold text-[#253D2C]/70 block mb-2">
                অর্জিত স্মৃতি ব্যাজ:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#CFFFD6]/40 border border-[#2E6F40]/10 text-center">
                  <span className="text-lg">🏏</span>
                  <span className="text-[10px] font-bold text-[#253D2C] mt-1 leading-tight">গলির ব্যাটিং স্টার</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#CFFFD6]/40 border border-[#2E6F40]/10 text-center">
                  <span className="text-lg">📡</span>
                  <span className="text-[10px] font-bold text-[#253D2C] mt-1 leading-tight">অ্যান্টেনা মাস্টার</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#CFFFD6]/40 border border-[#2E6F40]/10 text-center">
                  <span className="text-lg">🍱</span>
                  <span className="text-[10px] font-bold text-[#253D2C] mt-1 leading-tight">টিফিন ভাগাভাগি</span>
                </div>
              </div>
            </div>

            {/* Nostalgia Score Meter */}
            <div className="bg-[#253D2C] text-white rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-[#68BA7F] uppercase tracking-wider block">
                  নস্টালজিয়া স্কোর
                </span>
                <span className="text-xl font-bold">৯৬% খাঁটি নস্টালজিয়া</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#2E6F40] flex items-center justify-center font-bold text-sm border border-[#68BA7F]">
                <Award className="w-5 h-5 text-[#CFFFD6]" />
              </div>
            </div>

            {/* Footer watermark */}
            <div className="mt-4 pt-3 border-t border-[#2E6F40]/10 flex items-center justify-between text-[11px] text-[#253D2C]/60">
              <span>ID: BDCG-EXAMPLE-90S</span>
              <span>shoishob.vercel.app</span>
            </div>
          </div>

          {/* Callout below */}
          <div className="text-center mt-6">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2E6F40] hover:text-[#253D2C] underline underline-offset-4"
            >
              <CricketBatIcon className="w-4 h-4" />
              <span>নিজের কার্ড তৈরি করতে এখানে ক্লিক করো →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
