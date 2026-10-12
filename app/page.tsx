import React from 'react';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { Hero } from '@/components/landing/hero';
import { SampleCard } from '@/components/landing/sample-card';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="flex-1">
        <Hero />
        <SampleCard />
      </main>
      <Footer />
    </div>
  );
}
