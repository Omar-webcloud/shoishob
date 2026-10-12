'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { ChildhoodResult } from '@/types/result';
import { getQuizResult, clearAllShoishobData } from '@/lib/storage';
import {
  ExportFormat,
  CardOrientation,
  detectInAppBrowser,
  generateCardBlob,
  triggerDirectDownload,
  triggerNativeFileShare,
} from '@/lib/export-image';
import { IdentityCard } from './identity-card';
import { ExportableCard } from './exportable-card';
import { DownloadControls } from './download-controls';
import { ShareActions } from './share-actions';
import { ScoreBreakdown } from './score-breakdown';
import { SaveImageDialog } from './save-image-dialog';
import { StoryGuideDialog } from './story-guide-dialog';
import { RotateCcw, Sparkles, Trash2, ArrowLeft } from 'lucide-react';

interface ResultShellProps {
  initialResult?: ChildhoodResult | null;
}

export function ResultShell({ initialResult }: ResultShellProps) {
  const router = useRouter();
  const [result] = useState<ChildhoodResult | null>(() => initialResult || getQuizResult());
  const [orientation, setOrientation] = useState<CardOrientation>('portrait');
  const [isExporting, setIsExporting] = useState(false);
  const [canWebShare] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' && 'share' in navigator && 'canShare' in navigator;
  });
  const [inAppInfo] = useState(() => detectInAppBrowser());
  const isInApp = inAppInfo.isInApp;
  const inAppPlatform = inAppInfo.platform;

  // Status message state
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  // Dialogs
  const [saveModal, setSaveModal] = useState<{
    isOpen: boolean;
    imageUrl: string | null;
    filename: string;
  }>({
    isOpen: false,
    imageUrl: null,
    filename: '',
  });
  const [storyGuideOpen, setStoryGuideOpen] = useState(false);

  // Ref to the hidden fixed-dimension exportable card element
  const exportCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2E6F40', '#68BA7F', '#CFFFD6', '#E28743'],
      });
    } catch {
      // Ignore confetti errors if canvas unavailable
    }
  }, []);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (saveModal.imageUrl) {
        URL.revokeObjectURL(saveModal.imageUrl);
      }
    };
  }, [saveModal.imageUrl]);

  const showStatus = (type: 'success' | 'error' | 'info', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  };

  // Main Image Export Handler (Tier 1 -> Tier 3)
  const handleExport = async (format: ExportFormat) => {
    if (!result || !exportCardRef.current || isExporting) return;

    setIsExporting(true);
    setStatusMessage(null);

    const filename = `bangladesh-childhood-${result.archetype.id}.${format}`;

    try {
      const blob = await generateCardBlob(exportCardRef.current, format);
      const url = URL.createObjectURL(blob);

      // In in-app browsers, direct anchor downloads often get blocked silently
      if (isInApp) {
        setSaveModal({
          isOpen: true,
          imageUrl: url,
          filename,
        });
        showStatus('info', 'ইন-অ্যাপ ব্রাউজারের কারণে সেভ স্ক্রিন খুলে দেওয়া হয়েছে।');
        setIsExporting(false);
        return;
      }

      // Tier 1: Try direct anchor download
      const success = triggerDirectDownload(blob, filename);

      if (success) {
        showStatus('success', `${format.toUpperCase()} ফাইল ডাউনলোড শুরু হয়েছে!`);
      } else {
        // Fallback to Tier 3 Save modal
        setSaveModal({
          isOpen: true,
          imageUrl: url,
          filename,
        });
      }
    } catch (err) {
      console.error('[Shoishob Export Error]', err);
      showStatus('error', 'ছবি রেন্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  // Tier 2: Native Web Share File Handler
  const handleWebShare = async () => {
    if (!result || !exportCardRef.current || isExporting) return;

    setIsExporting(true);
    const filename = `bangladesh-childhood-${result.archetype.id}.png`;

    try {
      const blob = await generateCardBlob(exportCardRef.current, 'png');
      const shared = await triggerNativeFileShare(
        blob,
        filename,
        `আমার শৈশব: ${result.archetype.titleBn}`
      );

      if (shared) {
        showStatus('success', 'নেটিভ শেয়ার সফল হয়েছে!');
      } else {
        // Fallback to Tier 3 modal
        const url = URL.createObjectURL(blob);
        setSaveModal({
          isOpen: true,
          imageUrl: url,
          filename,
        });
      }
    } catch (err) {
      console.error('[Shoishob WebShare Error]', err);
      showStatus('error', 'শেয়ার করতে সমস্যা হয়েছে।');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRetake = () => {
    if (window.confirm('আপনি কি আবার কুইজ দিতে চান?')) {
      router.push('/quiz');
    }
  };

  const handleClearData = () => {
    if (window.confirm('আপনি কি সমস্ত সংরক্ষিত শৈশব ডেটা মুছে ফেলতে চান?')) {
      clearAllShoishobData();
      router.push('/');
    }
  };

  // If no result found in localStorage, invite user to take the quiz
  if (!result) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 text-center tactile-card bg-white">
        <div className="w-14 h-14 rounded-2xl bg-[#CFFFD6] text-3xl mx-auto flex items-center justify-center mb-4">
          ✨
        </div>
        <h2 className="text-2xl font-bold text-[#253D2C] mb-2">
          কোনো সংরক্ষিত শৈশব পাওয়া যায়নি!
        </h2>
        <p className="text-sm text-[#253D2C]/75 mb-6">
          আপনি এখনো কুইজে অংশ নেননি। মাত্র ২ মিনিট সময় দিয়ে নিজের শৈশব পরিচয় আবিষ্কার করুন!
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#2E6F40] text-white font-bold text-sm shadow-md hover:bg-[#253D2C] transition-all"
        >
          আমার শৈশব দেখি
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Top Banner & Archetype Announcement */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CFFFD6] text-xs sm:text-sm font-bold text-[#253D2C] uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-[#2E6F40]" />
          <span>আপনার শৈশব পরিচয়পত্র তৈরি হয়েছে!</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#253D2C] tracking-tight">
          আপনি ছিলেন <span className="text-[#2E6F40]">&ldquo;{result.archetype.titleBn}&rdquo;</span>
        </h1>
        <p className="text-sm sm:text-base text-[#253D2C]/80 max-w-xl mx-auto">
          {result.archetype.taglineBn}
        </p>
      </div>

      {/* Main Identity Card Preview */}
      <div className="w-full">
        <IdentityCard result={result} orientation={orientation} />
      </div>

      {/* Download and Export Controls */}
      <div className="tactile-card p-6 sm:p-7 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#253D2C]">
            পরিচয়পত্র সংরক্ষণ ও ডাউনলোড
          </h3>
          <span className="text-xs font-bold text-[#2E6F40] bg-[#CFFFD6] px-2.5 py-1 rounded-full">
            হাই-রেজ্যুলুশন এক্সপোর্ট
          </span>
        </div>

        <DownloadControls
          onExport={handleExport}
          onWebShare={handleWebShare}
          isExporting={isExporting}
          canWebShare={canWebShare}
          isInApp={isInApp}
          inAppPlatform={inAppPlatform}
          orientation={orientation}
          onChangeOrientation={(o) => setOrientation(o)}
          statusMessage={statusMessage}
        />
      </div>

      {/* Social Viral Sharing Section */}
      <ShareActions
        result={result}
        onOpenStoryGuide={() => setStoryGuideOpen(true)}
      />

      {/* Detailed Nostalgia Profile & Dimension Breakdown */}
      <ScoreBreakdown result={result} />

      {/* Secondary Bottom Navigation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#2E6F40]/15 text-xs sm:text-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#253D2C]/80 hover:text-[#2E6F40] font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমপেজে ফিরে যান</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRetake}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#2E6F40]/20 text-[#253D2C] hover:bg-black/5 font-semibold transition-all"
          >
            <RotateCcw className="w-4 h-4 text-[#2E6F40]" />
            <span>আবার কুইজ দিন</span>
          </button>

          <button
            type="button"
            onClick={handleClearData}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-red-700 hover:bg-red-50 border border-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>ডেটা মুছুন</span>
          </button>
        </div>
      </div>

      {/* HIDDEN OFF-SCREEN FIXED-DIMENSION EXPORT CONTAINER */}
      {/* Fixed output dimensions 1080x1350 / 1200x750 independent of viewport */}
      <div
        style={{
          position: 'fixed',
          left: '-99999px',
          top: '-99999px',
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: -100,
        }}
        aria-hidden="true"
      >
        <ExportableCard
          ref={exportCardRef}
          result={result}
          orientation={orientation}
        />
      </div>

      {/* Modals */}
      <SaveImageDialog
        isOpen={saveModal.isOpen}
        imageUrl={saveModal.imageUrl}
        filename={saveModal.filename}
        onClose={() =>
          setSaveModal({ isOpen: false, imageUrl: null, filename: '' })
        }
      />

      <StoryGuideDialog
        isOpen={storyGuideOpen}
        onClose={() => setStoryGuideOpen(false)}
        onDownloadFirst={() => handleExport('png')}
      />
    </div>
  );
}
