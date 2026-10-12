import React from 'react';
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
        <ResultShell />
      </main>
      <Footer />
    </div>
  );
}
