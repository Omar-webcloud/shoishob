'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#F7FAF7]/95 backdrop-blur-md border-b border-[#2E6F40]/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Mark with official Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2E6F40]/30 shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center bg-[#253D2C]">
            <Image
              src="/logo-shoishob.png"
              alt="শৈশব লোগো"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-[#253D2C] leading-none">
              শৈশব
            </span>
            <span className="text-[11px] font-semibold text-[#2E6F40] tracking-wider uppercase">
              Shoishob · 🇧🇩
            </span>
          </div>
        </Link>

        {/* Right Info & CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFFFD6]/60 border border-[#2E6F40]/20 text-xs font-semibold text-[#253D2C]">
            <Sparkles className="w-3.5 h-3.5 text-[#2E6F40]" />
            <span>১০০% নিরাপদ ও গোপনীয়</span>
          </div>

          <Link
            href="/quiz"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#2E6F40] hover:bg-[#253D2C] shadow-sm hover:shadow transition-all"
          >
            আমার শৈশব দেখি
          </Link>
        </div>
      </div>
    </header>
  );
}
