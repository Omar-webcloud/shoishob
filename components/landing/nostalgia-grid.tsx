import React from 'react';
import {
  CricketBatIcon,
  VintageTvIcon,
  SchoolBellIcon,
  CassetteIcon,
  KiteIcon,
  MarblesIcon,
} from '@/components/common/nostalgia-motifs';

export function NostalgiaGrid() {
  const themes = [
    {
      title: 'স্কুলের টিফিন ও ছোটবেলার স্বাদ',
      desc: 'ঝালমুড়ি, বরফের গোলা, কাঁচা আমের আচার আর গোল টিফিন বক্সের পরোটা-ভাজির সুবাস।',
      icon: <SchoolBellIcon className="w-8 h-8" color="#2E6F40" />,
      tag: 'খাবার ও টিফিন',
    },
    {
      title: 'কার্টুন ও শুক্রবারের টেলিভিশন',
      desc: 'মীনা, সিসিমপুর, টম অ্যান্ড জেরি আর শুক্রবারের আলিফ লায়লা দেখতে পাড়া এক হওয়ার দিন।',
      icon: <VintageTvIcon className="w-8 h-8" color="#2E6F40" />,
      tag: 'বিটিভি ও কার্টুন',
    },
    {
      title: 'বিকেলের গলির খেলাধুলা',
      desc: 'গলির ক্রিকেট, মার্বেল, লাটিম, গোল্লাছুট আর বৃষ্টিতে কাদা মেখে ফুটবল খেলার আনন্দ।',
      icon: <CricketBatIcon className="w-8 h-8" color="#2E6F40" />,
      tag: 'খেলাধুলা',
    },
    {
      title: 'অ্যানালগ শৈশব ও প্রযুক্তির বিস্ময়',
      desc: 'পেনসিলে ক্যাসেট ঘোরানো, অ্যান্টেনা নাড়ানো, সাইবার ক্যাফে আর নকিয়া ফোনের স্নেক গেম।',
      icon: <CassetteIcon className="w-8 h-8" color="#2E6F40" />,
      tag: 'প্রযুক্তি ও ক্যাসেট',
    },
    {
      title: 'লোডশেডিং ও ভূতের গল্প',
      desc: 'হঠাৎ লোডশেডিংয়ে ছাদে মাদুর পেতে আড্ডা, হারিকেনের আলো আর গা ছমছমে গল্প।',
      icon: <KiteIcon className="w-8 h-8" color="#2E6F40" />,
      tag: 'পাড়ার আড্ডা',
    },
    {
      title: 'রঙিন মার্বেল ও সংগ্রহের শখ',
      desc: 'কাঁচের মার্বেল, চুইংগামের স্টিকার, বোতলের ক্যাপ আর নতুন ক্লাসের বইয়ের মলাট লাগানো।',
      icon: <MarblesIcon className="w-8 h-8" color="#2E6F40" />,
      tag: 'শৈশবের শখ',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white/60 border-y border-[#2E6F40]/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#2E6F40] uppercase tracking-wider block mb-1">
            বাংলাদেশের শৈশব সংকলন
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#253D2C]">
            স্মৃতির খাতা খুলে দেখো
          </h2>
          <p className="text-sm text-[#253D2C]/75 mt-2">
            যে স্মৃতিগুলো দিয়ে তৈরি হয়েছে আমাদের সবার বেড়ে ওঠার রূপকথা
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {themes.map((t, idx) => (
            <div
              key={idx}
              className="tactile-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#CFFFD6]/60 flex items-center justify-center mb-4">
                  {t.icon}
                </div>
                <span className="text-[11px] font-bold text-[#2E6F40] uppercase tracking-wider block mb-1">
                  {t.tag}
                </span>
                <h3 className="text-lg font-bold text-[#253D2C] mb-2">
                  {t.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#253D2C]/75 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
