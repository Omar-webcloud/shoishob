'use client';

import React from 'react';
import { X, Download, ExternalLink, Share2 } from 'lucide-react';

interface SaveImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  filename: string;
  isInApp?: boolean;
  onTriggerExternalBrowser?: () => void;
  onTriggerSystemShare?: () => void;
}

export function SaveImageDialog({
  isOpen,
  onClose,
  imageUrl,
  filename,
  isInApp = false,
  onTriggerExternalBrowser,
  onTriggerSystemShare,
}: SaveImageDialogProps) {
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#2E6F40]/25 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#253D2C] transition-colors cursor-pointer"
          aria-label="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-3">
          <h3 className="text-lg font-bold text-[#253D2C]">
            ছবি সংরক্ষণ করুন
          </h3>
          <p className="text-xs text-[#253D2C]/70 mt-0.5">
            ছবিটি ফোনে সেভ করতে চেপে ধরে রাখুন অথবা নিচের বোতাম ব্যবহার করুন।
          </p>
        </div>

        {/* Generated Image Preview */}
        <div className="rounded-2xl border border-[#2E6F40]/20 overflow-hidden bg-black/5 p-2 mb-3.5 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="শৈশব কার্ড"
            className="w-full h-auto max-h-[46vh] object-contain rounded-xl mx-auto shadow-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {isInApp && onTriggerExternalBrowser ? (
            <button
              type="button"
              onClick={onTriggerExternalBrowser}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2E6F40] hover:bg-[#253D2C] text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>ব্রাউজারে খুলুন ও ডাউনলোড করুন</span>
            </button>
          ) : (
            <a
              href={imageUrl}
              download={filename}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2E6F40] hover:bg-[#253D2C] text-white font-bold text-xs sm:text-sm shadow-xs transition-all text-center"
            >
              <Download className="w-4 h-4" />
              <span>ছবি ডাউনলোড করুন</span>
            </a>
          )}

          {onTriggerSystemShare && (
            <button
              type="button"
              onClick={onTriggerSystemShare}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#CFFFD6] hover:bg-[#A9D5B4] text-[#253D2C] font-semibold text-xs border border-[#2E6F40]/20 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#2E6F40]" />
              <span>সরাসরি শেয়ার করুন</span>
            </button>
          )}

          <button
            onClick={onClose}
            type="button"
            className="py-2.5 px-4 rounded-xl border border-black/10 text-[#253D2C]/80 font-semibold text-xs hover:bg-black/5 transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
}
