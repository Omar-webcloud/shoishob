'use client';

import { X, Image as ImageIcon } from 'lucide-react';
import { InstagramIcon } from '@/components/common/nostalgia-motifs';

interface StoryGuideDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadFirst: () => void;
}

export function StoryGuideDialog({
  isOpen,
  onClose,
  onDownloadFirst,
}: StoryGuideDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-[#2E6F40]/25">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#253D2C] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white mx-auto flex items-center justify-center mb-3 shadow-md">
            <InstagramIcon className="w-7 h-7" color="#FFFFFF" />
          </div>
          <h3 className="text-xl font-bold text-[#253D2C]">
            Instagram Story-তে শেয়ার গাইড
          </h3>
          <p className="text-xs sm:text-sm text-[#253D2C]/75 mt-1">
            ইনস্টাগ্রাম স্টোরিতে আপনার শৈশব কার্ড পোস্ট করার ৩টি সহজ ধাপ:
          </p>
        </div>

        {/* Step by Step */}
        <div className="space-y-3.5 mb-6 text-xs sm:text-sm text-[#253D2C]/90">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#F0FAF3] border border-[#2E6F40]/15">
            <span className="w-6 h-6 rounded-full bg-[#2E6F40] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              ১
            </span>
            <div>
              <span className="font-bold block text-[#253D2C]">ছবি সেভ বা ডাউনলোড করুন</span>
              <span className="text-[#253D2C]/75 text-xs">
                প্রথমে নিচের বাটন দিয়ে কার্ডটির হাই-রেজ্যুলুশন ছবি আপনার ফোনে সেভ করে নিন।
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#F0FAF3] border border-[#2E6F40]/15">
            <span className="w-6 h-6 rounded-full bg-[#2E6F40] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              ২
            </span>
            <div>
              <span className="font-bold block text-[#253D2C]">Instagram অ্যাপ ওপেন করুন</span>
              <span className="text-[#253D2C]/75 text-xs">
                ইনস্টাগ্রাম খুলে <strong>&ldquo;Your Story&rdquo;</strong>-এ যান এবং সেভ করা ছবিটি সিলেক্ট করুন।
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#F0FAF3] border border-[#2E6F40]/15">
            <span className="w-6 h-6 rounded-full bg-[#2E6F40] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              ৩
            </span>
            <div>
              <span className="font-bold block text-[#253D2C]">লিংক স্টিকার ও বন্ধুদের ট্যাগ</span>
              <span className="text-[#253D2C]/75 text-xs">
                স্টিকারে <strong>shoishob.vercel.app</strong> লিংক যুক্ত করে বন্ধুদের চ্যালেঞ্জ করুন!
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              onDownloadFirst();
              onClose();
            }}
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2E6F40] hover:bg-[#253D2C] text-white font-bold text-sm shadow-sm transition-all"
          >
            <ImageIcon className="w-4 h-4" />
            <span>কার্ড ডাউনলোড করে প্রস্তুত হও</span>
          </button>
          <button
            onClick={onClose}
            type="button"
            className="w-full py-2.5 rounded-xl border border-black/15 text-[#253D2C] font-semibold text-xs hover:bg-black/5"
          >
            বুঝেছি, ধন্যবাদ
          </button>
        </div>
      </div>
    </div>
  );
}
