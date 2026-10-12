import React from 'react';
import { ShieldCheck, HardDrive, Lock, HeartHandshake } from 'lucide-react';

export function PrivacyBanner() {
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto rounded-3xl bg-[#253D2C] text-white p-6 sm:p-8 relative overflow-hidden shadow-lg">
        {/* Background decorative tint */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2E6F40]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#68BA7F]/20 text-[#CFFFD6] text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-[#68BA7F]" />
              <span>নিরাপদ ও ব্যক্তিগত · ১০০% প্রাইভেট</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              তোমার স্মৃতি কেবলই তোমার!
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              শৈশব ব্যবহারের জন্য কোনো অ্যাকাউন্ট বা পাসওয়ার্ডের প্রয়োজন নেই। তোমার উত্তর ও ফলাফল শুধুমাত্র তোমার ব্রাউজারের লোকালে থাকে—কোনো সার্ভারে পাঠানো বা সংরক্ষণ করা হয় না।
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#CFFFD6]">
              <HardDrive className="w-4 h-4 shrink-0 text-[#68BA7F]" />
              <span>ডিভাইস মেমোরি</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#CFFFD6]">
              <Lock className="w-4 h-4 shrink-0 text-[#68BA7F]" />
              <span>নো সাইন-আপ</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#CFFFD6] col-span-2">
              <HeartHandshake className="w-4 h-4 shrink-0 text-[#68BA7F]" />
              <span>যেকোনো সময় এক ক্লিকে ডেটা মোছা সম্ভব</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
