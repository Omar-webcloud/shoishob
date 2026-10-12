'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { clearAllShoishobData } from '@/lib/storage';
import { useQuizStore } from '@/lib/store';
import { ShieldCheck, Trash2, CheckCircle2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/common/confirm-dialog';

export function Footer() {
  const router = useRouter();
  const clearAll = useQuizStore((s) => s.clearAll);
  const [cleared, setCleared] = useState(false);
  const [isErasureModalOpen, setIsErasureModalOpen] = useState(false);

  const handleConfirmErasure = () => {
    clearAll();
    clearAllShoishobData();
    setCleared(true);
    setTimeout(() => {
      setCleared(false);
      setIsErasureModalOpen(false);
      window.location.href = '/';
    }, 1200);
  };

  return (
    <footer className="w-full mt-auto border-t border-[#2E6F40]/15 bg-white/70 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[#2E6F40]/30 shrink-0">
              <Image
                src="/logo-shoishob.png"
                alt="শৈশব লোগো"
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg font-bold text-[#253D2C]">শৈশব (Shoishob)</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#CFFFD6] text-[#253D2C] font-semibold">
              বাংলা নস্টালজিয়া
            </span>
          </div>
          <p className="text-xs text-[#253D2C]/75 mt-1 max-w-sm">
            “আপনার ছোটবেলার গল্পটা কেমন ছিল?” বাংলাদেশের সোনালী শৈশব ও নস্টালজিয়ার স্মৃতিময় পরিচয়।
          </p>
        </div>

        {/* Privacy & Clear Data */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#253D2C]/80">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7FAF7] border border-[#2E6F40]/10">
            <ShieldCheck className="w-4 h-4 text-[#2E6F40]" />
            <span>আপনার স্মৃতি সম্পূর্ণ নিরাপদ ও গোপনীয়</span>
          </div>

          <button
            onClick={() => setIsErasureModalOpen(true)}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-700 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer shadow-2xs"
          >
            <Trash2 className="w-4 h-4" />
            <span>আমার ডেটা মুছুন</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-[#2E6F40]/10 text-center text-xs text-[#253D2C]/60 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© ২০২৬ শৈশব (Shoishob)</p>
        <p className="flex items-center gap-2">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>·</span>
          <Link href="/quiz" className="hover:underline">কুইজ</Link>
          <span>·</span>
          <span>Version 1.0 (MVP)</span>
        </p>
      </div>

      {/* Data Erasure Confirmation Modal */}
      <ConfirmDialog
        isOpen={isErasureModalOpen}
        onClose={() => setIsErasureModalOpen(false)}
        onConfirm={handleConfirmErasure}
        title="সমস্ত সংরক্ষিত ডেটা মুছে ফেলতে চান?"
        description="আপনার সংরক্ষিত সমস্ত শৈশব স্মৃতি ও পরিচয়পত্রের ফলাফল ব্রাউজারের মেমোরি থেকে স্থায়ীভাবে মুছে যাবে। এই কাজ আর ফিরিয়ে আনা যাবে না।"
        confirmText="হ্যাঁ, সব ডেটা মুছুন"
        cancelText="বাতিল"
        variant="danger"
        isSuccess={cleared}
        successMessage="সব ডেটা সফলভাবে মুছে ফেলা হয়েছে!"
      />
    </footer>
  );
}
