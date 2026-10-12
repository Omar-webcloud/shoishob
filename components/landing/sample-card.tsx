'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Award, ArrowRight } from 'lucide-react';

export function SampleCard() {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFFFD6] text-xs font-bold text-[#253D2C] uppercase tracking-wider mb-2">
            <span>নমুনা পরিচয়পত্র · SAMPLE IDENTITY CARD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#253D2C]">
            যেমনটি হবে আপনার শৈশবের কার্ড
          </h2>
          <p className="text-sm text-[#253D2C]/75 mt-1">
            কুইজ শেষে আপনিও পাবেন এমনই একটি হাই-রেজ্যুলুশন ডাউনলোডেবল ও শেয়ারযোগ্য পরিচয়পত্র!
          </p>
        </div>

        {/* Sample Card Frame */}
        <div className="relative max-w-lg mx-auto">
          {/* Decorative badge */}
          <div className="absolute -top-3 -right-2 sm:-right-3 bg-[#68BA7F] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>নমুনা প্রিভিউ</span>
          </div>

          <div
            className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#2E6F40]/25 shadow-xl relative text-[#253D2C]"
            style={{
              backgroundImage: 'radial-gradient(rgba(46, 111, 64, 0.05) 1.2px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Top Card Header */}
            <div className="flex items-center justify-between border-b-2 border-[#2E6F40]/15 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#2E6F40]/30 shadow-xs shrink-0 bg-[#253D2C]">
                  <Image
                    src="/logo-shoishob.png"
                    alt="শৈশব লোগো"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-extrabold text-base sm:text-lg text-[#253D2C] tracking-tight block leading-tight">
                    আমার শৈশব · SHOISHOB
                  </span>
                </div>
              </div>
            </div>

            {/* Archetype Hero Box */}
            <div className="rounded-2xl bg-[#F0FAF3] border border-[#2E6F40]/15 p-5 text-center mb-4 relative">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#2E6F40] flex items-center justify-center text-3xl shadow-md border-2 border-[#CFFFD6]">
                🏏
              </div>
              <span className="text-[11px] font-bold text-[#2E6F40] uppercase tracking-wider block">
                শৈশব আর্কিটাইপ
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#253D2C] mt-0.5">
                গলির কিংবদন্তি
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#2E6F40] mt-0.5">
                The Street-Game Legend · নব্বইয়ের স্বর্ণযুগ
              </p>
            </div>

            {/* Signature Memory Quote */}
            <div className="bg-[#F7FAF7] rounded-xl p-4 border border-[#2E6F40]/10 mb-4 text-center">
              <p className="text-xs sm:text-sm text-[#253D2C]/90 italic leading-relaxed">
                “বিকেলের বন্ধুদের ডাক, শেষ ওভারের নাটকীয় ছক্কা আর সূর্য ডুবে অন্ধকার না হওয়া পর্যন্ত বাড়ি না ফেরা। এই ছিল আমার শৈশব!”
              </p>
            </div>

            {/* Badges showcase */}
            <div className="mb-5">
              <span className="text-[10px] font-bold text-[#253D2C]/70 block mb-2 uppercase tracking-wider">
                স্বাক্ষরিত স্মৃতির ব্যাজ:
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                <div className="flex flex-col items-center p-2.5 rounded-xl bg-[#CFFFD6]/40 border border-[#2E6F40]/15 text-center">
                  <span className="text-xl">🏏</span>
                  <span className="text-[11px] font-bold text-[#253D2C] mt-1 leading-tight line-clamp-1">
                    গলির ব্যাটিং স্টার
                  </span>
                </div>
                <div className="flex flex-col items-center p-2.5 rounded-xl bg-[#CFFFD6]/40 border border-[#2E6F40]/15 text-center">
                  <span className="text-xl">📡</span>
                  <span className="text-[11px] font-bold text-[#253D2C] mt-1 leading-tight line-clamp-1">
                    অ্যান্টেনা মাস্টার
                  </span>
                </div>
                <div className="flex flex-col items-center p-2.5 rounded-xl bg-[#CFFFD6]/40 border border-[#2E6F40]/15 text-center">
                  <span className="text-xl">🍱</span>
                  <span className="text-[11px] font-bold text-[#253D2C] mt-1 leading-tight line-clamp-1">
                    টিফিন ভাগাভাগি
                  </span>
                </div>
              </div>
            </div>

            {/* Nostalgia Score Meter */}
            <div className="rounded-2xl bg-[#253D2C] text-white p-4 flex items-center justify-between shadow-md mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2E6F40] flex items-center justify-center font-bold text-sm border border-[#68BA7F]">
                  <Award className="w-5 h-5 text-[#CFFFD6]" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-[#68BA7F] uppercase tracking-wider block">
                    নস্টালজিয়া স্কোর
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-white">
                    ৯৬% খাঁটি শৈশব
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-white/60 block">আনুমানিক যুগ</span>
                <span className="text-xs font-bold text-[#CFFFD6]">১৯৯০ - ১৯৯৯</span>
              </div>
            </div>

            {/* Footer watermark */}
            <div className="pt-2 border-t border-[#2E6F40]/10 flex items-center justify-between text-[11px] text-[#253D2C]/60">
              <span>আইডি: BDCG-EXAMPLE-90S</span>
              <span className="font-semibold text-[#2E6F40]">shoishob-bd.vercel.app</span>
            </div>
          </div>

          {/* Callout button below */}
          <div className="text-center mt-6">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E6F40] hover:bg-[#253D2C] text-white font-bold text-sm shadow-md transition-all group"
            >
              <span>আমার শৈশব দেখি</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
