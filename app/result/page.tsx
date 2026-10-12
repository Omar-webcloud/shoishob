import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { ResultShell } from '@/components/result/result-shell';

export const metadata: Metadata = {
  title: 'আমার শৈশব পরিচয়পত্র · শৈশব (Shoishob)',
  description: 'আমার শৈশব আর্কিটাইপ ও নস্টালজিয়া স্কোর প্রকাশিত হয়েছে! কার্ড ডাউনলোড করুন ও দেখুন আপনার শৈশব কেমন ছিল।',
};

export default function ResultPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="flex-1 flex flex-col items-center">
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-3 border-[#2E6F40]/30 border-t-[#2E6F40] rounded-full animate-spin mb-3" />
              <p className="text-sm text-[#253D2C]/70">ফলাফল লোড হচ্ছে...</p>
            </div>
          }
        >
          <ResultShell />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
