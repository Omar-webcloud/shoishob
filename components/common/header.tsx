'use client';

import React from 'react';
import Link from 'next/link';
import { PaperBoatIcon } from './nostalgia-motifs';

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#F7FAF7]/90 backdrop-blur-md border-b border-[#2E6F40]/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#2E6F40] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <PaperBoatIcon className="w-6 h-6" color="#FFFFFF" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#253D2C] leading-none">
              শৈশব
            </span>
            <span className="text-[11px] font-medium text-[#2E6F40] tracking-wider uppercase">
              Shoishob · 🇧🇩
            </span>
          </div>
        </Link>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFFFD6]/50 border border-[#2E6F40]/20 text-xs font-medium text-[#253D2C]">
            <span className="w-2 h-2 rounded-full bg-[#2E6F40] animate-pulse" />
            কোনো সাইন-আপ নেই · ডিভাইস মেমোরি
          </div>

          <Link
            href="/quiz"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#2E6F40] hover:bg-[#253D2C] shadow-sm hover:shadow transition-all"
          >
            কুইজ শুরু
          </Link>
        </div>
      </div>
    </header>
  );
}
