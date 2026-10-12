'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#F7FAF7]/95 backdrop-blur-md border-b border-[#2E6F40]/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Mark with official Logo */}
        <Link href="/" className="flex items-center group" aria-label="হোমপেজ">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#2E6F40]/30 shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center bg-[#253D2C]">
            <Image
              src="/logo-shoishob.png"
              alt="শৈশব"
              width={44}
              height={44}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </Link>

        {/* Right Info & CTA */}
        <div className="flex items-center gap-3">
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
