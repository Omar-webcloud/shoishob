'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { ChildhoodResult } from '@/types/result';
import { getQuizResult, saveQuizResult, clearAllShoishobData } from '@/lib/storage';
import { useQuizStore } from '@/lib/store';
import {
  ExportFormat,
  CardOrientation,
  detectInAppBrowser,
  getMobileOs,
  generateCardBlob,
  triggerDirectDownload,
  triggerNativeFileShare,
  triggerOpenInExternalBrowser,
} from '@/lib/export-image';
import { encodeResultToShareQuery, decodeShareQueryToResult } from '@/lib/share';
import { IdentityCard } from './identity-card';
import { ExportableCard } from './exportable-card';
import { DownloadControls } from './download-controls';
import { ShareActions } from './share-actions';
import { ScoreBreakdown } from './score-breakdown';
import { SaveImageDialog } from './save-image-dialog';
import { StoryGuideDialog } from './story-guide-dialog';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { RotateCcw, Sparkles, Trash2, ArrowLeft } from 'lucide-react';

interface ResultShellProps {
  initialResult?: ChildhoodResult | null;
}

export function ResultShell({ initialResult }: ResultShellProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeResult = useQuizStore((s) => s.result);
  const clearAll = useQuizStore((s) => s.clearAll);

  const queryData = searchParams.get('data');
  const autoDownloadParam = searchParams.get('autodownload');
  const downloadFormatParam = (searchParams.get('download') as ExportFormat) || 'png';

  // Decode from URL query if present (preserves result across external browser handoff)
  const queryResult = useMemo(() => {
    if (!queryData) return null;
    const decoded = decodeShareQueryToResult(queryData);
    if (decoded) {
      saveQuizResult(decoded);
      return decoded;
    }
    return null;
  }, [queryData]);

  const result: ChildhoodResult | null =
    initialResult ||
    storeResult ||
    queryResult ||
    getQuizResult();

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
  const [isRetakeModalOpen, setIsRetakeModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isClearSuccess, setIsClearSuccess] = useState(false);

  // Ref to the hidden fixed-dimension exportable card element
  const exportCardRef = useRef<HTMLDivElement>(null);
  const hasAutoDownloadedRef = useRef(false);

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

  const showStatus = useCallback((type: 'success' | 'error' | 'info', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  }, []);

  // Redirect to system browser (Chrome/Safari) with data & auto-download parameters
  const handleRedirectToSystemDownload = useCallback((format: ExportFormat = 'png') => {
    if (!result) return;
    const encoded = encodeResultToShareQuery(result);
    const targetUrl = `${window.location.origin}/result?data=${encoded}&download=${format}&autodownload=1`;

    showStatus(
      'info',
      'ফেসবুক ব্রাউজার থেকে সিস্টেম ব্রাউজারে রিডাইরেক্ট করে স্বয়ংক্রিয় ডাউনলোড শুরু হচ্ছে...'
    );

    triggerOpenInExternalBrowser(targetUrl);
  }, [result, showStatus]);

  const handleOpenInSystemBrowser = useCallback(() => {
    handleRedirectToSystemDownload('png');
  }, [handleRedirectToSystemDownload]);

  // Main Image Export Handler
  const handleExport = useCallback(async (format: ExportFormat, isAutoDownload = false) => {
    if (!result) return;

    // In in-app browsers (Facebook, Instagram, Messenger), direct anchor downloads are blocked.
    // If user clicks download while in in-app browser, automatically redirect to system browser!
    if (isInApp && !isAutoDownload) {
      const os = getMobileOs();
      // On iOS Facebook, attempt native Web Share if available (allows 1-tap "Save Image" to Photos)
      if (os === 'ios' && inAppPlatform === 'facebook' && canWebShare && exportCardRef.current) {
        setIsExporting(true);
        try {
          const blob = await generateCardBlob(exportCardRef.current, format);
          const filename = `bangladesh-childhood-${result.archetype.id}.${format}`;
          const shared = await triggerNativeFileShare(
            blob,
            filename,
            `আমার শৈশব: ${result.archetype.titleBn}`
          );
          if (shared) {
            showStatus('success', 'ছবিটি সেভ বা শেয়ার করার উইন্ডো খোলা হয়েছে!');
            setIsExporting(false);
            return;
          }
        } catch {
          // Fall through to external browser redirect
        } finally {
          setIsExporting(false);
        }
      }

      handleRedirectToSystemDownload(format);
      return;
    }

    if (!exportCardRef.current || isExporting) return;

    setIsExporting(true);
    setStatusMessage(null);

    const filename = `bangladesh-childhood-${result.archetype.id}.${format}`;

    try {
      const blob = await generateCardBlob(exportCardRef.current, format);
      const url = URL.createObjectURL(blob);

      // Tier 1: Try direct anchor download (works in Chrome / Safari / Firefox)
      const success = triggerDirectDownload(blob, filename);

      if (success) {
        showStatus('success', `${format.toUpperCase()} ফাইল সরাসরি আপনার সিস্টেমে ডাউনলোড হয়েছে!`);
      } else {
        // Fallback to Tier 2 (WebShare) or Tier 3 (Save modal)
        if (canWebShare) {
          try {
            const shared = await triggerNativeFileShare(
              blob,
              filename,
              `আমার শৈশব: ${result.archetype.titleBn}`
            );
            if (shared) {
              showStatus('success', 'সিস্টেম ডাউনলোড / শেয়ার উইন্ডো খোলা হয়েছে!');
              setIsExporting(false);
              return;
            }
          } catch {
            // continue to save modal
          }
        }

        // Tier 3: Save modal
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
  }, [result, isInApp, inAppPlatform, canWebShare, isExporting, handleRedirectToSystemDownload, showStatus]);

  // Auto-download listener when redirected into system browser with autodownload=1
  useEffect(() => {
    if (autoDownloadParam !== '1' || !result || hasAutoDownloadedRef.current) {
      return;
    }

    hasAutoDownloadedRef.current = true;

    // Clean up query parameters so user doesn't get repeated downloads on refresh
    try {
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('autodownload');
      cleanUrl.searchParams.delete('download');
      window.history.replaceState({}, '', cleanUrl.toString());
    } catch {
      // ignore
    }

    // Allow DOM to settle and custom Bangla fonts to load properly before capture
    const timer = setTimeout(async () => {
      showStatus('info', 'সিস্টেম ব্রাউজারে স্বয়ংক্রিয় ডাউনলোড শুরু হচ্ছে...');
      await handleExport(downloadFormatParam, true);
    }, 700);

    return () => clearTimeout(timer);
  }, [autoDownloadParam, result, downloadFormatParam, handleExport, showStatus]);

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

  const handleConfirmRetake = () => {
    setIsRetakeModalOpen(false);
    clearAll();
    router.push('/quiz');
  };

  const handleConfirmClear = () => {
    clearAll();
    clearAllShoishobData();
    setIsClearSuccess(true);
    setTimeout(() => {
      setIsClearSuccess(false);
      setIsClearModalOpen(false);
      router.push('/');
    }, 1200);
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
        </div>

        <DownloadControls
          onExport={handleExport}
          onWebShare={handleWebShare}
          onOpenInExternalBrowser={handleOpenInSystemBrowser}
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
            onClick={() => setIsRetakeModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#2E6F40]/20 text-[#253D2C] hover:bg-black/5 font-semibold transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#2E6F40]" />
            <span>আবার কুইজ দিন</span>
          </button>

          <button
            type="button"
            onClick={() => setIsClearModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-red-700 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>আমার ডেটা মুছুন</span>
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
        isInApp={isInApp}
        onTriggerExternalBrowser={handleOpenInSystemBrowser}
        onTriggerSystemShare={handleWebShare}
        onClose={() =>
          setSaveModal({ isOpen: false, imageUrl: null, filename: '' })
        }
      />

      <StoryGuideDialog
        isOpen={storyGuideOpen}
        onClose={() => setStoryGuideOpen(false)}
        onDownloadFirst={() => handleExport('png')}
      />

      {/* Retake Quiz Modal */}
      <ConfirmDialog
        isOpen={isRetakeModalOpen}
        onClose={() => setIsRetakeModalOpen(false)}
        onConfirm={handleConfirmRetake}
        title="আবার কুইজ দিতে চান?"
        description="আপনি কি নতুন করে কুইজ শুরু করতে চান? বর্তমান উত্তরগুলো মুছে নতুন করে উত্তর বাছাই করতে পারবেন।"
        confirmText="হ্যাঁ, আবার কুইজ দিন"
        cancelText="বাতিল"
        variant="primary"
      />

      {/* Clear Data Modal */}
      <ConfirmDialog
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleConfirmClear}
        title="সমস্ত সংরক্ষিত ডেটা মুছে ফেলতে চান?"
        description="আপনার সংরক্ষিত সমস্ত শৈশব স্মৃতি ও পরিচয়পত্রের ফলাফল ব্রাউজারের মেমোরি থেকে স্থায়ীভাবে মুছে যাবে। এই কাজ আর ফিরিয়ে আনা যাবে না।"
        confirmText="হ্যাঁ, সব ডেটা মুছুন"
        cancelText="বাতিল"
        variant="danger"
        isSuccess={isClearSuccess}
        successMessage="সব ডেটা সফলভাবে মুছে ফেলা হয়েছে!"
      />
    </div>
  );
}
