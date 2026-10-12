import { ChildhoodResult, SerializedResultPayload } from '@/types/result';
import { validateResultPayload } from './validation';
import { ARCHETYPES_DATA, ERAS_DATA, ALL_BADGES } from './quiz-data';

// Encode result to URL-safe base64 string
export function encodeResultToShareQuery(result: ChildhoodResult): string {
  try {
    const payload: SerializedResultPayload = {
      v: 1,
      a: result.archetype.id,
      e: result.era.id,
      s: result.nostalgiaScore,
      b: (result.badges || []).map((b) => b.id),
      m: (result.signatureMemoryBn || '').slice(0, 150),
      t: Date.now(),
      d: (result.dimensions || []).map((d) => d.percentage),
      l: (result.selectedMemoryLabelsBn || []).slice(0, 5),
    };

    const json = JSON.stringify(payload);
    // Base64 encode safely in browser
    if (typeof window !== 'undefined' && 'btoa' in window) {
      return encodeURIComponent(btoa(encodeURIComponent(json)));
    }
    return encodeURIComponent(Buffer.from(json).toString('base64url'));
  } catch (err) {
    console.warn('[Shoishob Share] Encoding error:', err);
    return '';
  }
}

// Decode URL query parameter back to a valid ChildhoodResult
export function decodeShareQueryToResult(encoded: string): ChildhoodResult | null {
  try {
    if (!encoded || encoded.length > 2000) return null; // Reject oversized payloads

    let jsonStr = '';
    const decodedUri = decodeURIComponent(encoded);

    if (typeof window !== 'undefined' && 'atob' in window) {
      jsonStr = decodeURIComponent(atob(decodedUri));
    } else {
      jsonStr = Buffer.from(decodedUri, 'base64url').toString('utf-8');
    }

    const parsed = JSON.parse(jsonStr);
    const validated = validateResultPayload(parsed);
    if (!validated) return null;

    const archetype = ARCHETYPES_DATA[validated.a] || ARCHETYPES_DATA['nostalgic_allrounder'];
    const era = ERAS_DATA[validated.e] || ERAS_DATA['timeless_bangla'];
    const badges = validated.b.map((id) => ALL_BADGES[id] || ALL_BADGES['antenna_master']);

    const dimPercentages = validated.d || [92, 88, 94, 85, 90];
    const dimensions = [
      { key: 'games' as const, nameBn: 'খেলাধুলা ও আড্ডা', nameEn: 'Street Games', percentage: dimPercentages[0] ?? 92 },
      { key: 'snacks' as const, nameBn: 'টিফিন ও খাবার', nameEn: 'Tiffin & Snacks', percentage: dimPercentages[1] ?? 88 },
      { key: 'tv' as const, nameBn: 'টিভি ও বিনোদন', nameEn: 'Cartoons & Screen', percentage: dimPercentages[2] ?? 94 },
      { key: 'tech' as const, nameBn: 'প্রযুক্তি ও গ্যাজেট', nameEn: 'Early Tech', percentage: dimPercentages[3] ?? 85 },
      { key: 'school' as const, nameBn: 'স্কুল ও পরিবার', nameEn: 'School Life', percentage: dimPercentages[4] ?? 90 },
    ];

    const defaultReflections = [
      {
        questionId: 'q4_afternoon_games',
        category: 'games',
        topicTitleBn: 'বিকেলের প্রিয় খেলা',
        labelBn: archetype.id === 'cartoon_era' ? 'ঘরের টেট্রিস ও লুডু খেলা' : 'গলির ক্রিকেট ও বিকেলের মাঠ',
        icon: '🏏',
      },
      {
        questionId: 'q2_school_tiffin',
        category: 'snacks',
        topicTitleBn: 'টিফিনের সেরা স্বাদ',
        labelBn: 'স্কুলগেটের ঝালমুড়ি ও টক আচার',
        icon: '🌶️',
      },
      {
        questionId: 'q3_tv_cartoons',
        category: 'television',
        topicTitleBn: 'টিভি ও প্রিয় বিনোদন',
        labelBn: 'শুক্রবার সকালের আলিফ লায়লা ও বিটিভি',
        icon: '📺',
      },
      {
        questionId: 'q5_first_tech',
        category: 'technology',
        topicTitleBn: 'নস্টালজিক প্রযুক্তি স্মৃতি',
        labelBn: 'নটরাজ পেনসিলে ক্যাসেটের ফিতা রিওয়াইন্ড',
        icon: '✏️',
      },
      {
        questionId: 'q7_load_shedding',
        category: 'cultural',
        topicTitleBn: 'লোডশেডিংয়ের স্মরণীয় কাণ্ড',
        labelBn: 'ছাদে দলবেঁধে আড্ডা ও গা ছমছমে ভূতের গল্প',
        icon: '🕯️',
      },
      {
        questionId: 'q10_rainy_day_football',
        category: 'games',
        topicTitleBn: 'ঝুম বৃষ্টির স্মৃতি',
        labelBn: 'কাদামাঠে বন্ধুদের সাথে খালি পায়ে ফুটবল',
        icon: '⚽',
      },
    ];

    return {
      version: 1,
      id: `BDCG-SHARED-${validated.t.toString().slice(-4)}`,
      archetype,
      era,
      nostalgiaScore: validated.s,
      signatureMemoryBn: validated.m || archetype.taglineBn,
      badges,
      dimensions,
      selectedMemoryLabelsBn: validated.l || [archetype.titleBn, era.titleBn],
      generatedAt: new Date(validated.t).toISOString(),
      reflections: defaultReflections,
    };
  } catch (err) {
    console.warn('[Shoishob Share] Decoding error:', err);
    return null;
  }
}

export function getShareUrl(result: ChildhoodResult): string {
  if (typeof window === 'undefined') return 'https://shoishob-bd.vercel.app';
  const encoded = encodeResultToShareQuery(result);
  return `${window.location.origin}/share?v=1&data=${encoded}`;
}

export function getWhatsAppShareLink(result: ChildhoodResult): string {
  const url = getShareUrl(result);
  const text = `আমার শৈশবের পরিচয়পত্র তৈরি করেছি শৈশব-এ! আমি "${result.archetype.titleBn}" (${result.nostalgiaScore}% খাঁটি নস্টালজিয়া) 🇧🇩✨\n\nআপনার ছোটবেলার গল্পটা কেমন ছিল? দেখে নিন এখানে:`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text}\n${url}`)}`;
}

export function getFacebookShareLink(result: ChildhoodResult): string {
  const url = getShareUrl(result);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}
