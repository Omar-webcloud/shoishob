'use client';

import React from 'react';
import { X, Download, Smartphone } from 'lucide-react';

interface SaveImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  filename: string;
}

export function SaveImageDialog({
  isOpen,
  onClose,
  imageUrl,
  filename,
}: SaveImageDialogProps) {
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border-2 border-[#2E6F40]/25 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#253D2C] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#CFFFD6] text-[#2E6F40] mx-auto flex items-center justify-center mb-2">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#253D2C]">
            ছবি সংরক্ষণ করুন
          </h3>
          <p className="text-xs sm:text-sm text-[#253D2C]/75 mt-1">
            ইন-অ্যাপ বা মোবাইল ব্রাউজারে স্বয়ংক্রিয় ডাউনলোড না হলে নিচের নিয়ম অনুসরণ করুন:
          </p>
        </div>

        {/* Generated Image Preview */}
        <div className="rounded-2xl border border-[#2E6F40]/20 overflow-hidden bg-black/5 p-2 mb-4 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="শৈশব পরিচয়পত্র"
            className="w-full h-auto max-h-[50vh] object-contain rounded-xl mx-auto shadow-md"
          />
        </div>

        {/* Instructions */}
        <div className="space-y-2.5 mb-5 text-xs sm:text-sm text-[#253D2C]/90 bg-[#F0FAF3] p-4 rounded-2xl border border-[#2E6F40]/15">
          <div className="flex items-start gap-2">
            <span className="font-bold text-[#2E6F40] shrink-0">📱 মোবাইলে:</span>
            <span>ছবির ওপর আঙুল দিয়ে ২ সেকেন্ড চেপে ধরুন এবং <strong>&ldquo;Save Image&rdquo;</strong> বা <strong>&ldquo;Download Image&rdquo;</strong> নির্বাচন করুন।</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-[#2E6F40] shrink-0">💻 কম্পিউটারে:</span>
            <span>ছবির ওপর মাউসের রাইট ক্লিক করে <strong>&ldquo;Save image as...&rdquo;</strong> চাপুন।</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <a
            href={imageUrl}
            download={filename}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2E6F40] hover:bg-[#253D2C] text-white font-bold text-sm shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>সরাসরি ডাউনলোড চেষ্টা করুন</span>
          </a>
          <button
            onClick={onClose}
            type="button"
            className="py-3 px-5 rounded-xl border border-black/15 text-[#253D2C] font-semibold text-sm hover:bg-black/5 transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
}
