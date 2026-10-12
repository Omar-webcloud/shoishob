import React from 'react';
import { ChildhoodResult, AnswerReflection } from '@/types/result';
import { Sparkles, BookOpen, Award } from 'lucide-react';

interface CardMemoriesLogProps {
  result: ChildhoodResult;
  orientation?: 'portrait' | 'landscape';
  isExport?: boolean;
}

export function CardMemoriesLog({
  result,
  orientation = 'portrait',
  isExport = false,
}: CardMemoriesLogProps) {
  const isLandscape = orientation === 'landscape';

  // Fallback reflections if not present
  const reflections: AnswerReflection[] =
    result.reflections && result.reflections.length > 0
      ? result.reflections
      : [
          {
            questionId: 'q4_afternoon_games',
            category: 'games',
            topicTitleBn: 'বিকেলের প্রিয় খেলা',
            labelBn: 'গলির ক্রিকেট (এক ড্রপে আউট)',
            icon: '🏏',
          },
          {
            questionId: 'q2_school_tiffin',
            category: 'snacks',
            topicTitleBn: 'টিফিনের সেরা স্বাদ',
            labelBn: 'স্কুলের গেটের ঝালমুড়ি ও আচার',
            icon: '🌶️',
          },
          {
            questionId: 'q3_tv_cartoons',
            category: 'television',
            topicTitleBn: 'টিভি ও প্রিয় বিনোদন',
            labelBn: 'শুক্রবার সকালে আলিফ লায়লা ও বিটিভি',
            icon: '📺',
          },
          {
            questionId: 'q5_first_tech',
            category: 'technology',
            topicTitleBn: 'নস্টালজিক প্রযুক্তি',
            labelBn: 'নটরাজ পেন্সিল দিয়ে ক্যাসেট রিবাইন্ড',
            icon: '✏️',
          },
          {
            questionId: 'q7_load_shedding',
            category: 'cultural',
            topicTitleBn: 'লোডশেডিংয়ের কাণ্ড',
            labelBn: 'ছাদে দলবেঁধে ভূতের গল্প ও আড্ডা',
            icon: '🕯️',
          },
          {
            questionId: 'q10_rainy_day_football',
            category: 'games',
            topicTitleBn: 'ঝুম বৃষ্টির স্মৃতি',
            labelBn: 'কাদামাঠে বন্ধুদের সাথে ফুটবল',
            icon: '⚽',
          },
          {
            questionId: 'q8_collectible_hobby',
            category: 'toys_hobbies',
            topicTitleBn: 'ছোটবেলার সম্পদ',
            labelBn: 'রঙিন মার্বেল ও কাঁচের গুলি',
            icon: '🔮',
          },
          {
            questionId: 'q6_school_life',
            category: 'school_life',
            topicTitleBn: 'স্কুলজীবনের স্মৃতি',
            labelBn: 'নতুন ক্লাসের বইয়ের মোহনীয় ঘ্রাণ',
            icon: '📚',
          },
        ];

  // Pick top 6-8 items for clean layout
  const displayedItems = reflections.slice(0, isLandscape ? 6 : 8);

  if (isExport) {
    return (
      <div
        className={`bg-white text-[#253D2C] flex flex-col justify-between border-4 border-[#2E6F40] ${
          isLandscape ? 'w-[1200px] h-[750px] p-10' : 'w-[1080px] h-[1350px] p-12'
        }`}
        style={{
          fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', 'Anek Bangla', system-ui, sans-serif",
          backgroundImage: 'radial-gradient(rgba(46, 111, 64, 0.08) 2px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b-4 border-[#2E6F40]/20 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2E6F40] shadow-md shrink-0 bg-[#253D2C]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-shoishob.png"
                alt="শৈশব লোগো"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-3xl font-black tracking-tight block text-[#253D2C]">
                আমার ছোটবেলার স্মৃতিকথা
              </span>
              <span className="text-sm font-semibold text-[#2E6F40] tracking-wider uppercase">
                কুইজের উত্তরে প্রতিফলিত ব্যক্তিগত স্মৃতি অ্যালবাম
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#253D2C]/70 block font-semibold uppercase">
              ব্যক্তিগত প্রোফাইল
            </span>
            <span className="text-lg font-black text-[#2E6F40]">
              {result.archetype.titleBn}
            </span>
          </div>
        </div>

        {/* Center Grid of Questions and Answers */}
        <div className="my-auto py-4">
          <div className="text-center mb-6">
            <span className="text-sm font-bold text-[#2E6F40] uppercase tracking-wider block">
              কুইজে আপনার বাছাই করা স্মৃতিসমূহ
            </span>
            <h2 className="text-2xl font-black text-[#253D2C] mt-1">
              যে গল্পগুলো দিয়ে তৈরি আপনার ছোটবেলা
            </h2>
          </div>

          <div
            className={`grid ${
              isLandscape ? 'grid-cols-3 gap-4' : 'grid-cols-2 gap-4'
            }`}
          >
            {displayedItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F8FCF9] border-2 border-[#2E6F40]/20 rounded-2xl p-4 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E6F40] bg-[#CFFFD6]/50 px-2.5 py-0.5 rounded-full">
                      {item.topicTitleBn}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#253D2C] leading-snug line-clamp-2">
                    {item.labelBn}
                  </h3>
                </div>
                {item.subtitleBn && (
                  <p className="text-xs text-[#253D2C]/70 italic mt-2 line-clamp-1 border-t border-[#2E6F40]/10 pt-1.5">
                    {item.subtitleBn}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Score Bar */}
        <div>
          <div className="rounded-2xl bg-[#253D2C] text-white p-5 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2E6F40] flex items-center justify-center font-bold border border-[#68BA7F] shrink-0">
                <BookOpen className="w-6 h-6 text-[#CFFFD6]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#68BA7F] uppercase tracking-wider block">
                  যাচাইকৃত নস্টালজিয়া স্কোর
                </span>
                <span className="text-2xl font-extrabold text-white">
                  {result.nostalgiaScore}% খাঁটি ছোটবেলা
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs text-white/70 block uppercase font-medium">
                স্মৃতি যুগ
              </span>
              <span className="text-base font-bold text-[#CFFFD6]">
                {result.era.titleBn}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-[#2E6F40]/15 flex items-center justify-between text-xs font-semibold text-[#253D2C]/70">
            <span>ডায়েরি আইডি: {result.id}</span>
            <span className="flex items-center gap-1.5 text-[#2E6F40] font-bold">
              <Sparkles className="w-4 h-4" />
              <span>shoishob-bd.vercel.app</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Interactive Responsive Web Preview
  return (
    <div
      className={`relative w-full bg-white rounded-3xl border-2 border-[#2E6F40]/25 shadow-xl text-[#253D2C] ${
        isLandscape ? 'max-w-2xl p-6 sm:p-7' : 'max-w-lg p-5 sm:p-6'
      } mx-auto flex flex-col justify-between select-none transition-all`}
      style={{
        backgroundImage: 'radial-gradient(rgba(46, 111, 64, 0.06) 1.2px, transparent 0)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-2 border-[#2E6F40]/15 pb-3.5 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2E6F40]/30 shadow-xs shrink-0 bg-[#253D2C]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-shoishob.png"
              alt="শৈশব লোগো"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight block leading-tight text-[#253D2C]">
              আমার ছোটবেলার স্মৃতিকথা
            </span>
            <span className="text-[10px] font-semibold text-[#2E6F40]">
              কুইজের উত্তরে প্রতিফলিত ব্যক্তিগত স্মৃতি
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="space-y-3 mb-4">
        <div className="text-center px-1">
          <span className="text-[10px] font-bold text-[#2E6F40] uppercase tracking-wider block">
            আপনার উত্তরের ওপর ভিত্তি করে সংকলিত
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#253D2C] mt-0.5">
            {result.archetype.titleBn}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
          {displayedItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-[#F8FCF9] border border-[#2E6F40]/15 flex items-start gap-2.5"
            >
              <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[#2E6F40] block uppercase tracking-wider">
                  {item.topicTitleBn}
                </span>
                <span className="text-xs font-bold text-[#253D2C] block leading-tight mt-0.5 line-clamp-2">
                  {item.labelBn}
                </span>
                {item.subtitleBn && (
                  <span className="text-[10px] text-[#253D2C]/70 block italic mt-1 line-clamp-1">
                    {item.subtitleBn}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bar */}
      <div>
        <div className="rounded-2xl bg-[#253D2C] text-white p-3.5 flex items-center justify-between shadow-md mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2E6F40] flex items-center justify-center font-bold border border-[#68BA7F] shrink-0">
              <Award className="w-5 h-5 text-[#CFFFD6]" />
            </div>
            <div>
              <span className="text-[9px] font-semibold text-[#68BA7F] uppercase tracking-wider block">
                নস্টালজিয়া স্কোর
              </span>
              <span className="text-base sm:text-lg font-extrabold text-white">
                {result.nostalgiaScore}% খাঁটি ছোটবেলা
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[9px] text-white/60 block">স্মৃতি যুগ</span>
            <span className="text-xs font-bold text-[#CFFFD6]">{result.era.titleBn}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#2E6F40]/10 flex items-center justify-between text-[10px] text-[#253D2C]/60">
          <span>আইডি: {result.id}</span>
          <span className="flex items-center gap-1 font-semibold text-[#2E6F40]">
            <Sparkles className="w-3 h-3" />
            <span>shoishob-bd.vercel.app</span>
          </span>
        </div>
      </div>
    </div>
  );
}
