import React from 'react';
import { ShieldCheck, Lock, HeartHandshake, Sparkles } from 'lucide-react';

export function PrivacyBanner() {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto rounded-3xl bg-[#253D2C] text-white p-6 sm:p-8 relative overflow-hidden shadow-lg">
        {/* Background decorative tint */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2E6F40]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#68BA7F]/20 text-[#CFFFD6] text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-[#68BA7F]" />
              <span>নিরাপদ ও ব্যক্তিগত স্মৃতি</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              আপনার স্মৃতি কেবলই আপনার!
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              শৈশব ব্যবহারের জন্য কোনো অ্যাকাউন্ট বা পাসওয়ার্ডের প্রয়োজন নেই। আপনার উত্তর ও ফলাফল সম্পূর্ণ নিরাপদ এবং অন্য কোথাও পাঠানো হয় না।
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#CFFFD6]">
              <Lock className="w-4 h-4 shrink-0 text-[#68BA7F]" />
              <span>সম্পূর্ণ গোপনীয়</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#CFFFD6]">
              <Sparkles className="w-4 h-4 shrink-0 text-[#68BA7F]" />
              <span>তাত্ক্ষণিক শুরু</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#CFFFD6] col-span-2">
              <HeartHandshake className="w-4 h-4 shrink-0 text-[#68BA7F]" />
              <span>যেকোনো সময় এক ক্লিকে ডেটা মোছার সুবিধা</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
