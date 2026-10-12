import React from 'react';
import { ChildhoodResult, AnswerReflection } from '@/types/result';
import { Award } from 'lucide-react';

export interface CardMemoriesLogProps {
  result: ChildhoodResult;
}

export function CardMemoriesLog({
  result,
}: CardMemoriesLogProps) {

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

  const displayedItems = reflections.slice(0, 6);
  const tileColors = ['#FCE7B2', '#CDEBDD', '#D6E8FA', '#F8D7D1', '#E7D9F5', '#D9EBD1'];

  return (
    <div
      className="bg-[#FFF8E7] text-[#183B2B] flex flex-col justify-between border-[12px] border-[#174A32] rounded-[56px] overflow-hidden w-[1080px] h-[1350px] p-9"
      style={{
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', 'Anek Bangla', system-ui, sans-serif",
        backgroundImage: 'radial-gradient(rgba(202, 137, 37, 0.13) 2px, transparent 0)',
        backgroundSize: '28px 28px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header */}
      <div className="flex items-center gap-4 rounded-[32px] bg-[#174A32] px-6 py-5 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 rounded-full overflow-hidden border-3 border-[#F6C453] shadow-md shrink-0 bg-[#102F22]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-shoishob.png"
              alt="শৈশব লোগো"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-5xl font-black tracking-tight text-white leading-tight m-0 p-0 whitespace-nowrap">
              আমার ছোটবেলার স্মৃতি
            </h2>
          </div>
        </div>
      </div>

      {/* Center Grid of Questions and Answers */}
      <div className="my-auto py-3">
        <div className="grid grid-cols-2 gap-4">
          {displayedItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-[24px] flex flex-col justify-center shadow-md p-5 min-h-64 border-2 border-white/80"
              style={{ backgroundColor: tileColors[idx % tileColors.length] }}
            >
              <div>
                <div className="text-4xl mb-1">{item.icon}</div>
                <p className="text-4xl font-black text-[#183B2B] leading-snug m-0">
                  {item.labelBn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Score Bar */}
      <div className="rounded-[32px] bg-[#174A32] text-white p-6 flex items-center justify-between shadow-xl border-2 border-[#F6C453]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F6C453] flex items-center justify-center font-bold shrink-0">
              <Award className="w-9 h-9 text-[#174A32]" />
            </div>
            <div className="flex flex-col">
              <span className="text-6xl font-extrabold text-white block leading-none whitespace-nowrap">
                {result.nostalgiaScore}%
              </span>
              <span className="text-3xl font-bold text-[#F6C453]">{result.era.titleBn}</span>
            </div>
          </div>
      </div>
    </div>
  );
}
