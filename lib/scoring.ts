import { ArchetypeId, ChildhoodEra, DimensionScore, NostalgiaBadge, AnswerReflection } from '@/types/result';
import { QuizAnswers } from '@/types/quiz';
import { QUIZ_QUESTIONS, ALL_BADGES } from './quiz-data';

export interface CalculatedScores {
  archetypeId: ArchetypeId;
  eraId: ChildhoodEra;
  nostalgiaScore: number;
  badges: NostalgiaBadge[];
  dimensions: DimensionScore[];
  signatureMemoryBn: string;
  selectedMemoryLabelsBn: string[];
  reflections: AnswerReflection[];
}

const TOPIC_TITLES: Record<string, string> = {
  q1_after_school: 'স্কুল ছুটির পর প্রথম কাজ',
  q2_school_tiffin: 'টিফিনের সেরা স্বাদ',
  q3_tv_cartoons: 'টিভি ও প্রিয় বিনোদন',
  q4_afternoon_games: 'বিকেলের প্রিয় খেলা',
  q5_first_tech: 'নস্টালজিক প্রযুক্তি স্মৃতি',
  q6_school_life: 'স্কুলজীবনের চিরচেনা দৃশ্য',
  q7_load_shedding: 'লোডশেডিংয়ের স্মরণীয় কাণ্ড',
  q8_collectible_hobby: 'শৈশবের অমূল্য সম্পদ',
  q9_eid_festivals: 'ঈদের দিনের রোমাঞ্চ',
  q10_rainy_day_football: 'ঝুম বৃষ্টির স্মৃতি',
  q11_generation_touchpoint: 'শৈশবের সোনালী আবহ',
  q12_most_missed: 'সবচেয়ে মিস করা অনুভূতি',
};

export function calculateChildhoodProfile(answers: QuizAnswers): CalculatedScores {
  // 1. Initialize archetype accumulator
  const archetypeScores: Record<ArchetypeId, number> = {
    street_legend: 0,
    cartoon_era: 0,
    tiffin_time: 0,
    early_tech: 0,
    neighborhood_adventurer: 0,
    nostalgic_allrounder: 0,
    monsoon_dreamer: 0,
    rooftop_flyer: 0,
    school_bookworm: 0,
    salami_banker: 0,
  };

  // 2. Initialize era accumulator
  const eraScores: Record<ChildhoodEra, number> = {
    '90s_golden': 0,
    '2000s_millennium': 0,
    'mid_2000s_dawn': 0,
    'timeless_bangla': 0,
  };

  // 3. Initialize dimension accumulators
  const dimensionAccumulator = {
    games: 0,
    snacks: 0,
    tv: 0,
    tech: 0,
    school: 0,
  };

  const selectedBadgesMap = new Map<string, NostalgiaBadge>();
  const selectedMemoryLabelsBn: string[] = [];
  const reflections: AnswerReflection[] = [];

  // Iterate over answers and compile weights
  for (const question of QUIZ_QUESTIONS) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;

    const option = question.options.find((opt) => opt.id === selectedOptionId);
    if (!option) continue;

    selectedMemoryLabelsBn.push(option.labelBn);

    reflections.push({
      questionId: question.id,
      category: question.category,
      topicTitleBn: TOPIC_TITLES[question.id] || question.questionBn,
      labelBn: option.labelBn,
      subtitleBn: option.subtitleBn,
      icon: option.icon,
    });

    // Accumulate Archetype weights
    if (option.archetypeWeights) {
      for (const [key, weight] of Object.entries(option.archetypeWeights)) {
        const archKey = key as ArchetypeId;
        if (archetypeScores[archKey] !== undefined && weight) {
          archetypeScores[archKey] += weight;
        }
      }
    }

    // Direct thematic boosts based on specific answers
    if (['muddy_rain_football', 'paper_boats', 'rainy_day_holiday'].includes(selectedOptionId)) {
      archetypeScores.monsoon_dreamer += 3;
    }
    if (['kite_flying', 'sparkling_marbles', 'marble_latim'].includes(selectedOptionId)) {
      archetypeScores.rooftop_flyer += 3;
    }
    if (['new_books_smell', 'stamps_feathers', 'diary_pen_ink'].includes(selectedOptionId)) {
      archetypeScores.school_bookworm += 3;
    }
    if (['salami_counting', 'firecrackers_fun', 'hiding_new_dress'].includes(selectedOptionId)) {
      archetypeScores.salami_banker += 3;
    }

    // Accumulate Era affinity
    if (option.eraAffinity && eraScores[option.eraAffinity] !== undefined) {
      eraScores[option.eraAffinity] += 2;
    }

    // Accumulate dimension scores
    if (option.dimensionScores) {
      for (const [dimKey, score] of Object.entries(option.dimensionScores)) {
        if (score && dimKey in dimensionAccumulator) {
          dimensionAccumulator[dimKey as keyof typeof dimensionAccumulator] += score;
        }
      }
    }

    // Check if this option links to a specific badge
    if (option.badgeTitleBn) {
      const foundBadge = Object.values(ALL_BADGES).find((b) => b.titleBn === option.badgeTitleBn);
      if (foundBadge) {
        selectedBadgesMap.set(foundBadge.id, foundBadge);
      }
    }
  }

  // Determine top Archetype deterministically
  let topArchetype: ArchetypeId = 'nostalgic_allrounder';
  let maxArchScore = -1;

  const archOrder: ArchetypeId[] = [
    'monsoon_dreamer',
    'rooftop_flyer',
    'school_bookworm',
    'salami_banker',
    'street_legend',
    'cartoon_era',
    'tiffin_time',
    'early_tech',
    'neighborhood_adventurer',
    'nostalgic_allrounder',
  ];

  for (const arch of archOrder) {
    if (archetypeScores[arch] > maxArchScore) {
      maxArchScore = archetypeScores[arch];
      topArchetype = arch;
    }
  }

  // If score distribution is very flat, fall back to nostalgic_allrounder
  const scoresArray = Object.values(archetypeScores);
  const highest = Math.max(...scoresArray);
  const secondHighest = [...scoresArray].sort((a, b) => b - a)[1] || 0;
  if (highest > 0 && highest - secondHighest < 2 && scoresArray.filter((s) => s > 8).length >= 4) {
    topArchetype = 'nostalgic_allrounder';
  }

  // Determine Era deterministically
  let topEra: ChildhoodEra = 'timeless_bangla';
  let maxEraScore = -1;
  const eraOrder: ChildhoodEra[] = [
    '90s_golden',
    '2000s_millennium',
    'mid_2000s_dawn',
    'timeless_bangla',
  ];

  for (const era of eraOrder) {
    if (eraScores[era] > maxEraScore) {
      maxEraScore = eraScores[era];
      topEra = era;
    }
  }

  // Calculate percentage-based dimensions (normalized to 100%)
  const maxDimVal = Math.max(1, ...Object.values(dimensionAccumulator));
  const dimensions: DimensionScore[] = [
    {
      key: 'games',
      nameBn: 'খেলাধুলা ও আড্ডা',
      nameEn: 'Street Games & Play',
      percentage: Math.min(98, Math.max(45, Math.round((dimensionAccumulator.games / maxDimVal) * 98))),
    },
    {
      key: 'snacks',
      nameBn: 'টিফিন ও খাবার',
      nameEn: 'Tiffin & Street Food',
      percentage: Math.min(98, Math.max(40, Math.round((dimensionAccumulator.snacks / maxDimVal) * 98))),
    },
    {
      key: 'tv',
      nameBn: 'টিভি ও বিনোদন',
      nameEn: 'Cartoons & Screen',
      percentage: Math.min(98, Math.max(38, Math.round((dimensionAccumulator.tv / maxDimVal) * 98))),
    },
    {
      key: 'tech',
      nameBn: 'প্রযুক্তি ও গ্যাজেট',
      nameEn: 'Early Tech & Gadgets',
      percentage: Math.min(98, Math.max(35, Math.round((dimensionAccumulator.tech / maxDimVal) * 98))),
    },
    {
      key: 'school',
      nameBn: 'স্কুল ও পরিবার',
      nameEn: 'School & Family Life',
      percentage: Math.min(98, Math.max(42, Math.round((dimensionAccumulator.school / maxDimVal) * 98))),
    },
  ];

  // Pick top 3 badges, ensuring at least 3
  const badges: NostalgiaBadge[] = Array.from(selectedBadgesMap.values());
  const fallbackBadges = Object.values(ALL_BADGES);
  for (const fb of fallbackBadges) {
    if (badges.length >= 6) break;
    if (!badges.find((b) => b.id === fb.id)) {
      badges.push(fb);
    }
  }

  // Deterministic Nostalgia Score (88% to 99% range for high-energy positive validation)
  const totalAnswerCount = Object.keys(answers).length;
  const rawSum = Object.values(dimensionAccumulator).reduce((a, b) => a + b, 0);
  const scoreBase = 88 + (rawSum % 10);
  const nostalgiaScore = Math.min(99, Math.max(88, scoreBase + Math.min(totalAnswerCount - 8, 2)));

  // Generate dynamic, personalized signature memory statement
  const signatureMemoryBn = generateHumanizedSignatureMemory(topArchetype, answers, reflections);

  return {
    archetypeId: topArchetype,
    eraId: topEra,
    nostalgiaScore,
    badges: badges.slice(0, 6),
    dimensions,
    signatureMemoryBn,
    selectedMemoryLabelsBn,
    reflections,
  };
}

function generateHumanizedSignatureMemory(
  archetype: ArchetypeId,
  answers: QuizAnswers,
  reflections: AnswerReflection[]
): string {
  // If we have reflections, weave the specific answers into a warm, literary Bangladeshi reflection
  const gameRef = reflections.find((r) => r.questionId === 'q4_afternoon_games');
  const tiffinRef = reflections.find((r) => r.questionId === 'q2_school_tiffin');
  const tvRef = reflections.find((r) => r.questionId === 'q3_tv_cartoons');
  const techRef = reflections.find((r) => r.questionId === 'q5_first_tech');
  const outageRef = reflections.find((r) => r.questionId === 'q7_load_shedding');
  const rainRef = reflections.find((r) => r.questionId === 'q10_rainy_day_football');

  // Try creating personalized answer synthesis
  if (gameRef && tiffinRef) {
    const gameText = gameRef.labelBn.split('(')[0].trim();
    const tiffinText = tiffinRef.labelBn.split('(')[0].trim();

    if (archetype === 'street_legend') {
      return `বিকেলের ${gameText}, ছুটির পর ${tiffinText} আর সূর্য ডুবে অন্ধকার না হওয়া পর্যন্ত মাঠ না ছাড়া—এই ছিল আমাদের ছোটবেলা!`;
    }
    if (archetype === 'tiffin_time') {
      return `স্কুলের টিফিনের ঘণ্টার ঢং ঢং শব্দ, ${tiffinText}-এর ভাগাভাগি আর বিকেলের ${gameText}—বন্ধুদের সাথে কাড়াকাড়ি করে খাওয়ার মজাই আলাদা ছিল!`;
    }
    if (archetype === 'monsoon_dreamer' && rainRef) {
      return `ঝুম বৃষ্টি নামলেই ${rainRef.labelBn.slice(0, 30)} আর ছুটির বিকেলে ${tiffinText}—বৃষ্টিভেজা সেই সোনালী দিনগুলোর কোনো তুলনা হয় না!`;
    }
  }

  if (tvRef && techRef) {
    const tvText = tvRef.labelBn.slice(0, 28);
    const techText = techRef.labelBn.slice(0, 32);
    if (archetype === 'cartoon_era') {
      return `ড্রয়িংরুমে বসে ${tvText} দেখার টান, অ্যান্টেনার ঝিরঝির ঠিক করা আর বন্ধুদের আড্ডা—ছোটবেলার প্রতিটি মুহূর্ত ছিল রূপকথার মতো!`;
    }
    if (archetype === 'early_tech') {
      return `${techText}, প্রযুক্তির প্রথম জাদুকরী ছোঁয়া আর বিকেলের মাঠ—অ্যানালগ আর ডিজিটালের সন্ধিক্ষণে আমরা ছিলাম সোনালী প্রজন্মের সাক্ষী!`;
    }
  }

  if (outageRef && archetype === 'neighborhood_adventurer') {
    return `হঠাৎ লোডশেডিংয়ে ${outageRef.labelBn.slice(0, 35)}, চাঁদের আলোয় আড্ডা আর পাড়ার অলিতে-গলিতে খেলে বেড়ানোর সেই স্বাধীনতা আজ বড্ড মনে পড়ে!`;
  }

  // Archetype fallbacks with natural, grounded voice
  switch (archetype) {
    case 'street_legend':
      return 'বিকেলের বন্ধুদের ডাক, শেষ বলের ছক্কা আর আজান পড়ার আগ পর্যন্ত মাঠ না ছাড়া—এই ছিল আমাদের ছোটবেলা!';
    case 'cartoon_era':
      return 'শুক্রবার সকালে টিভির সামনে মাদুর পেতে বসা, অ্যান্টেনার ঝিরঝির ঠিক করা আর বিজ্ঞাপনের বিরতিতে পানি খাওয়ার দৌড় ছিল প্রতিদিনের গল্প!';
    case 'tiffin_time':
      return 'স্কুলের টিফিনের ঘণ্টার ঢং ঢং শব্দ, গেটের ঝালমুড়ি আর বন্ধুদের সাথে এক ভাগ খাবার কাড়াকাড়ি করে খাওয়ার মধুর দিনগুলো!';
    case 'early_tech':
      return 'নটরাজ পেন্সিল দিয়ে ক্যাসেট ঘোরানো, সাইবার ক্যাফেতে Road Rash-এর রোমাঞ্চ আর প্রযুক্তির প্রথম জাদুকরী দিনগুলো!';
    case 'neighborhood_adventurer':
      return 'হঠাৎ লোডশেডিংয়ে ছাদে দলবেঁধে ভূতের গল্প, বৃষ্টির পানিতে কাগজের নৌকা আর পাড়ার অলিতে-গলিতে খেলে বেড়ানোর অপার স্বাধীনতা!';
    case 'monsoon_dreamer':
      return 'মুষলধারে বৃষ্টি নামলেই কাদাভরা মাঠে ফুটবল, খাতার পাতা ছিঁড়ে উঠোনে কাগজের নৌকা আর মায়ের হাতের গরম খিচুড়ি—এই ছিল বৃষ্টিদিনের স্বর্গ!';
    case 'rooftop_flyer':
      return 'হরলিক্সের বৈয়ামে চকচকে মার্বেল জমানো, ঘুড়ির কাটাকাটিতে আকাশ কাঁপানো আর বিকেলের রোদ মিলিয়ে যাওয়া পর্যন্ত ছাদের রোমাঞ্চ!';
    case 'school_bookworm':
      return 'বছরের প্রথম দিন নতুন ক্লাসের বইয়ের মোহনীয় ঘ্রাণ, ক্যালেন্ডারের পাতা কেটে যত্ন করে মলাট আর খাতার ভাঁজে ময়ূরের পালক রাখা!';
    case 'salami_banker':
      return 'চাঁদরাতে বালিশের পাশে নতুন জামা রেখে ঘুমানো, ঈদের সকালে সালামির কড়কড়ে নতুন নোট গুনে লুকানো আর বন্ধুদের সাথে তারাবাতির উৎসব!';
    case 'nostalgic_allrounder':
    default:
      return 'নতুন বইয়ের ঘ্রাণ, টিফিনের ভাগাভাগি, বিকেলের খেলা আর রাতের পারিবারিক জমাটি আড্ডায় মোড়ানো আমাদের সোনালী ছোটবেলা!';
  }
}

