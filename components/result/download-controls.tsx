'use client';

import React from 'react';
import { Download, Share2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ExportFormat, CardOrientation } from '@/lib/export-image';

interface DownloadControlsProps {
  onExport: (format: ExportFormat) => void;
  onWebShare: () => void;
  isExporting: boolean;
  canWebShare: boolean;
  isInApp: boolean;
  inAppPlatform: string | null;
  orientation: CardOrientation;
  onChangeOrientation: (orientation: CardOrientation) => void;
  statusMessage: { type: 'success' | 'error' | 'info'; text: string } | null;
}

export function DownloadControls({
  onExport,
  onWebShare,
  isExporting,
  canWebShare,
  isInApp,
  orientation,
  onChangeOrientation,
  statusMessage,
}: DownloadControlsProps) {
  return (
    <div className="w-full space-y-4">
      {/* Friendly in-app browser notice without developer jargons */}
      {isInApp && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">বিশেষ পরামর্শ:</span>{' '}
            ফেসবুক বা ইনস্টাগ্রাম ব্রাউজারে সরাসরি ডাউনলোড আটকে গেলে নিচের <strong>&ldquo;ছবি সংরক্ষণ করুন&rdquo;</strong> অপশন থেকে ছবিতে চেপে ধরে সহজে সেভ করে নিন।
          </div>
        </div>
      )}

      {/* Orientation Selector */}
      <div className="flex items-center justify-between p-2 rounded-2xl bg-white border border-[#2E6F40]/15 text-xs font-semibold">
        <span className="text-[#253D2C] px-2">কার্ড ফরম্যাট:</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onChangeOrientation('portrait')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              orientation === 'portrait'
                ? 'bg-[#2E6F40] text-white shadow-xs'
                : 'text-[#253D2C]/70 hover:bg-black/5'
            }`}
          >
            পোর্ট্রেট (1080×1350)
          </button>
          <button
            type="button"
            onClick={() => onChangeOrientation('landscape')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              orientation === 'landscape'
                ? 'bg-[#2E6F40] text-white shadow-xs'
                : 'text-[#253D2C]/70 hover:bg-black/5'
            }`}
          >
            ল্যান্ডস্কেপ (1200×750)
          </button>
        </div>
      </div>

      {/* Primary Download Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onExport('png')}
          disabled={isExporting}
          className="inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-[#2E6F40] hover:bg-[#253D2C] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
        >
          {isExporting ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>PNG ডাউনলোড (হাই-কোয়ালিটি)</span>
        </button>

        <button
          type="button"
          onClick={() => onExport('jpg')}
          disabled={isExporting}
          className="inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-white hover:bg-[#CFFFD6]/40 text-[#253D2C] font-bold text-sm border-2 border-[#2E6F40]/30 shadow-xs hover:shadow transition-all disabled:opacity-50 cursor-pointer"
        >
          {isExporting ? (
            <span className="w-4 h-4 border-2 border-[#253D2C]/30 border-t-[#253D2C] rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>JPG ডাউনলোড (৯৫% অপ্টিমাইজড)</span>
        </button>
      </div>

      {/* Direct Phone Share Button without jargon */}
      {canWebShare && (
        <button
          type="button"
          onClick={onWebShare}
          disabled={isExporting}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#CFFFD6] text-[#253D2C] hover:bg-[#A9D5B4] font-bold text-sm border border-[#2E6F40]/20 shadow-xs transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#2E6F40]" />
          <span>সরাসরি ফোনে শেয়ার করুন</span>
        </button>
      )}

      {/* Status Feedback Notice */}
      {statusMessage && (
        <div
          className={`p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 animate-in fade-in duration-150 ${
            statusMessage.type === 'success'
              ? 'bg-green-50 text-green-900 border border-green-200'
              : statusMessage.type === 'error'
              ? 'bg-red-50 text-red-900 border border-red-200'
              : 'bg-blue-50 text-blue-900 border border-blue-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}
    </div>
  );
}
