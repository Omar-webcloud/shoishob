'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { clearAllShoishobData } from '@/lib/storage';
import { ShieldCheck, Trash2, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const router = useRouter();
  const [cleared, setCleared] = useState(false);

  const handleClearData = () => {
    if (window.confirm('আপনি কি শৈশবের সব সংরক্ষিত উত্তর ও ফলাফল মুছে ফেলতে চান?')) {
      clearAllShoishobData();
      setCleared(true);
      setTimeout(() => {
        setCleared(false);
        router.push('/');
      }, 1200);
    }
  };

  return (
    <footer className="w-full mt-auto border-t border-[#2E6F40]/15 bg-white/70 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[#2E6F40]/30 shrink-0">
              <Image
                src="/logo-shoishob.png"
                alt="শৈশব লোগো"
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg font-bold text-[#253D2C]">শৈশব (Shoishob)</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#CFFFD6] text-[#253D2C] font-semibold">
              বাংলা নস্টালজিয়া
            </span>
          </div>
          <p className="text-xs text-[#253D2C]/75 mt-1 max-w-sm">
            “আপনার ছোটবেলার গল্পটা কেমন ছিল?” — বাংলাদেশের শৈশব ও স্মৃতির ব্যক্তিগত পরিচয় জেনারেটর।
          </p>
        </div>

        {/* Privacy & Clear Data */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#253D2C]/80">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7FAF7] border border-[#2E6F40]/10">
            <ShieldCheck className="w-4 h-4 text-[#2E6F40]" />
            <span>আপনার স্মৃতি সম্পূর্ণ নিরাপদ ও গোপনীয়</span>
          </div>

          <button
            onClick={handleClearData}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-700 hover:bg-red-50 border border-red-200 transition-colors"
          >
            {cleared ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>ডেটা মুছে ফেলা হয়েছে!</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>আমার ডেটা মুছুন</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-[#2E6F40]/10 text-center text-xs text-[#253D2C]/60 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© ২০২৬ শৈশব (Shoishob). Designed with ❤️ for Bangladeshi Nostalgia.</p>
        <p className="flex items-center gap-2">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>·</span>
          <Link href="/quiz" className="hover:underline">কুইজ</Link>
          <span>·</span>
          <span>Version 1.0 (MVP)</span>
        </p>
      </div>
    </footer>
  );
}
