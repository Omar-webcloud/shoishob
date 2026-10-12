import React from 'react';
import { ChildhoodResult, AnswerReflection } from '@/types/result';
import { Sparkles, BookOpen, Award } from 'lucide-react';

export interface CardMemoriesLogProps {
  result: ChildhoodResult;
  orientation?: 'portrait' | 'landscape';
}

export function CardMemoriesLog({
  result,
  orientation = 'portrait',
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

  // Pick top 6 items for spacious, elegant presentation
  const displayedItems = reflections.slice(0, 6);

  return (
    <div
      className={`bg-white text-[#253D2C] flex flex-col justify-between border-4 border-[#2E6F40] ${
        isLandscape ? 'w-[1200px] h-[750px] p-8' : 'w-[1080px] h-[1350px] p-12'
      }`}
      style={{
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', 'Anek Bangla', system-ui, sans-serif",
        backgroundImage: 'radial-gradient(rgba(46, 111, 64, 0.08) 2px, transparent 0)',
        backgroundSize: '32px 32px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-4 border-[#2E6F40]/20 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 rounded-full overflow-hidden border-3 border-[#2E6F40] shadow-md shrink-0 bg-[#253D2C]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-shoishob.png"
              alt="শৈশব লোগো"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black tracking-tight text-[#253D2C] leading-none m-0 p-0 whitespace-nowrap">
              আমার ছোটবেলার স্মৃতিকথা
            </h2>
            <p className="text-sm font-bold text-[#2E6F40] tracking-wider uppercase m-0 p-0 whitespace-nowrap">
              কুইজের উত্তরে প্রতিফলিত ব্যক্তিগত স্মৃতি অ্যালবাম
            </p>
          </div>
        </div>
        <div className="text-right flex flex-col gap-0.5 shrink-0">
          <span className="text-xs text-[#253D2C]/70 block font-semibold uppercase">
            ব্যক্তিগত প্রোফাইল
          </span>
          <span className="text-base font-black text-[#2E6F40] block leading-tight whitespace-nowrap">
            {result.archetype.titleBn}
          </span>
        </div>
      </div>

      {/* Center Grid of Questions and Answers */}
      <div className="my-auto py-3">
        <div className="text-center mb-5">
          <span className="text-xs font-bold text-[#2E6F40] uppercase tracking-wider block">
            কুইজে আপনার বাছাই করা স্মৃতিসমূহ
          </span>
          <h2 className="text-2xl font-black text-[#253D2C] mt-0.5 m-0 p-0">
            যে গল্পগুলো দিয়ে তৈরি আপনার ছোটবেলা
          </h2>
        </div>

        <div
          className={`grid ${
            isLandscape ? 'grid-cols-3 gap-4' : 'grid-cols-2 gap-5'
          }`}
        >
          {displayedItems.map((item, idx) => (
            <div
              key={idx}
              className={`bg-[#F8FCF9] border-2 border-[#2E6F40]/20 rounded-2xl flex flex-col justify-between shadow-xs ${
                isLandscape ? 'p-3.5' : 'p-5'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-bold text-[#2E6F40] uppercase tracking-wider">
                    {item.topicTitleBn}
                  </span>
                </div>
                <p className="text-base font-black text-[#253D2C] leading-snug m-0">
                  {item.labelBn}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#2E6F40]/10 flex items-center justify-between text-[11px] text-[#253D2C]/60">
                <span className="flex items-center gap-1 font-semibold text-[#2E6F40]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>স্মৃতি #{idx + 1}</span>
                </span>
                <span className="italic">স্বাক্ষরিত সত্য</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Score Bar */}
      <div>
        <div className="rounded-2xl bg-[#253D2C] text-white p-5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-xl bg-[#2E6F40] flex items-center justify-center font-bold border border-[#68BA7F] shrink-0">
              <Award className="w-7 h-7 text-[#CFFFD6]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-[#68BA7F] uppercase tracking-wider block">
                নস্টালজিয়া স্কোর ও প্রজন্ম
              </span>
              <span className="text-2xl font-extrabold text-white block leading-none whitespace-nowrap mt-0.5">
                {result.nostalgiaScore}% খাঁটি · {result.era.approxYears}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0 flex flex-col gap-0.5">
            <span className="text-xs text-white/70 block uppercase font-medium">
              স্মৃতি যুগ
            </span>
            <span className="text-base font-bold text-[#CFFFD6] block leading-none whitespace-nowrap mt-0.5">
              {result.era.titleBn}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t-2 border-[#2E6F40]/15 flex items-center justify-between text-xs font-semibold text-[#253D2C]/70">
          <span className="truncate">ডায়েরি আইডি: {result.id}</span>
          <span className="flex items-center gap-1.5 text-[#2E6F40] font-bold shrink-0">
            <Sparkles className="w-4 h-4" />
            <span>shoishob-bd.vercel.app</span>
          </span>
        </div>
      </div>
    </div>
  );
}
