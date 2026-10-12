'use client';

import React from 'react';
import { Download, Share2, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import { ExportFormat } from '@/lib/export-image';

interface DownloadControlsProps {
  onExport: (format: ExportFormat) => void;
  onWebShare: () => void;
  onOpenInExternalBrowser?: () => void;
  isExporting: boolean;
  canWebShare: boolean;
  isInApp: boolean;
  inAppPlatform: string | null;
  statusMessage: { type: 'success' | 'error' | 'info'; text: string } | null;
}

export function DownloadControls({
  onExport,
  onWebShare,
  onOpenInExternalBrowser,
  isExporting,
  canWebShare,
  isInApp,
  statusMessage,
}: DownloadControlsProps) {
  return (
    <div className="w-full space-y-3">
      {/* Sleek minimal in-app browser banner */}
      {isInApp && onOpenInExternalBrowser && (
        <div className="px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="truncate">ফেসবুকে ডাউনলোডে সমস্যা হলে ব্রাউজারে খুলুন</span>
          </div>
          <button
            type="button"
            onClick={onOpenInExternalBrowser}
            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2E6F40] text-white text-[11px] font-semibold hover:bg-[#253D2C] transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3 h-3" />
            <span>ব্রাউজারে খুলুন</span>
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 rounded-xl bg-[#F0FAF3] border border-[#2E6F40]/15 px-3.5 py-3">
        <span className="flex h-10 w-8 shrink-0 items-center justify-center rounded-md border-2 border-[#2E6F40]/40 bg-white text-[#2E6F40]">
          <span className="h-5 w-3 rounded-sm border-2 border-current" />
        </span>
        <div className="min-w-0">
          <p className="m-0 text-sm font-bold text-[#253D2C]">পোর্ট্রেট ছবি · 1080 × 1350</p>
          <p className="m-0 text-xs text-[#253D2C]/70">ফোনে দেখা ও শেয়ার করার জন্য সাজানো</p>
        </div>
      </div>

      {/* Primary Download Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onExport('png')}
          disabled={isExporting}
          className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2E6F40] hover:bg-[#253D2C] text-white font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          {isExporting ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>PNG ডাউনলোড</span>
        </button>

        <button
          type="button"
          onClick={() => onExport('jpg')}
          disabled={isExporting}
          className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-[#F0FAF3] text-[#253D2C] font-bold text-xs sm:text-sm border border-[#2E6F40]/30 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
        >
          {isExporting ? (
            <span className="w-4 h-4 border-2 border-[#253D2C]/30 border-t-[#253D2C] rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>JPG ডাউনলোড</span>
        </button>
      </div>

      {/* Direct Phone Share Button */}
      {canWebShare && (
        <button
          type="button"
          onClick={onWebShare}
          disabled={isExporting}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#CFFFD6]/60 text-[#253D2C] hover:bg-[#CFFFD6] font-semibold text-xs border border-[#2E6F40]/20 transition-all cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-[#2E6F40]" />
          <span>ফোনে শেয়ার বা সেভ করুন</span>
        </button>
      )}

      {/* Status Feedback Notice */}
      {statusMessage && (
        <div
          className={`p-2.5 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-150 ${
            statusMessage.type === 'success'
              ? 'bg-green-50 text-green-900 border border-green-200'
              : statusMessage.type === 'error'
              ? 'bg-red-50 text-red-900 border border-red-200'
              : 'bg-blue-50 text-blue-900 border border-blue-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}
    </div>
  );
}
