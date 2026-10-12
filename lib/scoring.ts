import { ArchetypeId, ChildhoodEra, DimensionScore, NostalgiaBadge } from '@/types/result';
import { QuizAnswers } from '@/types/quiz';
import { QUIZ_QUESTIONS, ARCHETYPES_DATA, ERAS_DATA, ALL_BADGES } from './quiz-data';

export interface CalculatedScores {
  archetypeId: ArchetypeId;
  eraId: ChildhoodEra;
  nostalgiaScore: number;
  badges: NostalgiaBadge[];
  dimensions: DimensionScore[];
  signatureMemoryBn: string;
  selectedMemoryLabelsBn: string[];
}

export function calculateChildhoodProfile(answers: QuizAnswers): CalculatedScores {
  // 1. Initialize archetype accumulator
  const archetypeScores: Record<ArchetypeId, number> = {
    street_legend: 0,
    cartoon_era: 0,
    tiffin_time: 0,
    early_tech: 0,
    neighborhood_adventurer: 0,
    nostalgic_allrounder: 0,
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

  // Iterate over answers and compile weights
  for (const question of QUIZ_QUESTIONS) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;

    const option = question.options.find((opt) => opt.id === selectedOptionId);
    if (!option) continue;

    selectedMemoryLabelsBn.push(option.labelBn);

    // Accumulate Archetype weights
    if (option.archetypeWeights) {
      for (const [key, weight] of Object.entries(option.archetypeWeights)) {
        const archKey = key as ArchetypeId;
        if (archetypeScores[archKey] !== undefined && weight) {
          archetypeScores[archKey] += weight;
        }
      }
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
  if (highest > 0 && highest - secondHighest < 2 && scoresArray.filter((s) => s > 10).length >= 3) {
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
    if (badges.length >= 3) break;
    if (!badges.find((b) => b.id === fb.id)) {
      badges.push(fb);
    }
  }

  // Deterministic Nostalgia Score (88% to 99% range for high-energy positive validation)
  const totalAnswerCount = Object.keys(answers).length;
  const rawSum = Object.values(dimensionAccumulator).reduce((a, b) => a + b, 0);
  const scoreBase = 88 + (rawSum % 10);
  const nostalgiaScore = Math.min(99, Math.max(88, scoreBase + Math.min(totalAnswerCount - 8, 2)));

  // Generate signature memory statement
  const signatureMemoryBn = generateSignatureMemory(topArchetype, topEra, answers);

  return {
    archetypeId: topArchetype,
    eraId: topEra,
    nostalgiaScore,
    badges: badges.slice(0, 3),
    dimensions,
    signatureMemoryBn,
    selectedMemoryLabelsBn,
  };
}

function generateSignatureMemory(
  archetype: ArchetypeId,
  era: ChildhoodEra,
  answers: QuizAnswers
): string {
  switch (archetype) {
    case 'street_legend':
      return 'বিকেলের বন্ধুদের ডাক, শেষ ওভারের নাটকীয় ছক্কা আর সূর্য ডুবে অন্ধকার না হওয়া পর্যন্ত বাড়ি না ফেরা—এই ছিল আমার শৈশব!';
    case 'cartoon_era':
      return 'শুক্রবার সকালে টিভির সামনে মাদুর পেতে বসা, অ্যান্টেনার ঝিরঝির ঠিক করা আর বিজ্ঞাপনের বিরতিতে পানি খাওয়ার দৌড় ছিল প্রতিদিনের জীবন!';
    case 'tiffin_time':
      return 'স্কুলের টিফিনের ঘণ্টার ঢং ঢং শব্দ, গেটের ঝালমুড়ির ঠোঙা আর বন্ধুদের সাথে এক ভাগ খাবার কাড়াকাড়ি করে খাওয়ার মধুর দিন!';
    case 'early_tech':
      return 'নটরাজ পেনসিল দিয়ে ক্যাসেট রিবাইন্ড করা, সাইবার ক্যাফেতে Road Rash-এর রোমাঞ্চ আর প্রযুক্তির প্রথম জাদুকরী সন্ধিক্ষণ!';
    case 'neighborhood_adventurer':
      return 'হঠাৎ লোডশেডিংয়ে ছাদে দলবেঁধে ভূতের গল্প, বৃষ্টির পানিতে কাগজের নৌকা আর পাড়ার সব অলিতে-গলিতে খেলে বেড়ানোর অপার স্বাধীনতা!';
    case 'nostalgic_allrounder':
    default:
      return 'নতুন বইয়ের ঘ্রাণ, টিফিনের ভাগাভাগি, বিকেলের খেলা আর রাতের পারিবারিক জমাটি আড্ডায় মোড়ানো এক খাঁটি বাংলাদেশি শৈশব!';
  }
}
