'use client';

import React, { useState } from 'react';
import { ChildhoodResult } from '@/types/result';
import {
  getWhatsAppShareLink,
  getFacebookShareLink,
  getShareUrl,
} from '@/lib/share';
import {
  Share2,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { FacebookIcon, InstagramIcon } from '@/components/common/nostalgia-motifs';

interface ShareActionsProps {
  result: ChildhoodResult;
  onOpenStoryGuide: () => void;
}

export function ShareActions({ result, onOpenStoryGuide }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = getShareUrl(result);
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const url = getShareUrl(result);
      prompt('নিচের লিংকটি কপি করে বন্ধুদের পাঠান:', url);
    }
  };

  const whatsappUrl = getWhatsAppShareLink(result);
  const facebookUrl = getFacebookShareLink(result);

  return (
    <div className="w-full tactile-card p-6 sm:p-7 bg-white space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-[#2E6F40]" />
          <h3 className="text-xl font-bold text-[#253D2C]">
            বন্ধুদের সাথে শেয়ার ও চ্যালেঞ্জ
          </h3>
        </div>
        <span className="text-xs font-bold text-[#2E6F40] px-2.5 py-1 rounded-full bg-[#CFFFD6]">
          ভাইরাল লুপ
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#253D2C]/80 leading-relaxed">
        তোমার শৈশব পরিচয় দেখে তোমার বন্ধুদেরও শৈশব আর্কিটাইপ জানতে চাও? সরাসরি লিংক শেয়ার করে তাদের চ্যালেঞ্জ করো!
      </p>

      {/* Share Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#E7F8EE] hover:bg-[#D1F2DD] border border-[#25D366]/30 text-[#075E54] transition-all group"
        >
          <MessageCircle className="w-6 h-6 text-[#25D366] group-hover:scale-110 transition-transform mb-1.5" />
          <span className="text-xs font-bold">হোয়াটসঅ্যাপ</span>
        </a>

        {/* Facebook */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#EBF3FF] hover:bg-[#D6E6FF] border border-[#1877F2]/30 text-[#1877F2] transition-all group"
        >
          <FacebookIcon className="w-6 h-6 text-[#1877F2] group-hover:scale-110 transition-transform mb-1.5" />
          <span className="text-xs font-bold">ফেসবুক</span>
        </a>

        {/* Instagram Story Guide */}
        <button
          type="button"
          onClick={onOpenStoryGuide}
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#FDF0F5] hover:bg-[#FADCE6] border border-[#E1306C]/30 text-[#C13584] transition-all group cursor-pointer"
        >
          <InstagramIcon className="w-6 h-6 text-[#E1306C] group-hover:scale-110 transition-transform mb-1.5" />
          <span className="text-xs font-bold">ইনস্টা স্টোরি</span>
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#F7FAF7] hover:bg-[#EBF2EA] border border-[#2E6F40]/25 text-[#253D2C] transition-all group cursor-pointer"
        >
          {copied ? (
            <Check className="w-6 h-6 text-green-600 mb-1.5" />
          ) : (
            <Copy className="w-6 h-6 text-[#2E6F40] group-hover:scale-110 transition-transform mb-1.5" />
          )}
          <span className="text-xs font-bold">
            {copied ? 'কপি হয়েছে!' : 'লিংক কপি'}
          </span>
        </button>
      </div>

      {/* Challenge Friends Banner */}
      <div className="p-4 rounded-2xl bg-[#F0FAF3] border border-[#2E6F40]/15 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-[#2E6F40] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-[#253D2C]">
            “তোমার শৈশব কোন যুগের ছিল?” — বন্ধুদের জিজ্ঞাসা করো!
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopyLink}
          className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl bg-[#2E6F40] text-white hover:bg-[#253D2C] transition-colors"
        >
          চ্যালেঞ্জ লিংক
        </button>
      </div>
    </div>
  );
}
