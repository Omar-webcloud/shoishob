import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { QuizShell } from '@/components/quiz/quiz-shell';

export const metadata: Metadata = {
  title: 'শৈশব কুইজ · আপনার ছোটবেলার গল্পটা কেমন ছিল?',
  description: '১০-১২টি সহজ স্মৃতিভিত্তিক প্রশ্নের উত্তর দিয়ে জেনে নিন আপনার শৈশবের রূপকথা ও ব্যক্তিগত পরিচয়।',
};

export default function QuizPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <QuizShell />
      </main>
      <Footer />
    </div>
  );
}
