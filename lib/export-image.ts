import { toBlob } from 'html-to-image';

export type ExportFormat = 'png' | 'jpg';
export type CardOrientation = 'portrait' | 'landscape';

export interface ExportOptions {
  format: ExportFormat;
  orientation: CardOrientation;
  archetypeSlug: string;
}

export interface ExportResult {
  success: boolean;
  blob?: Blob;
  objectUrl?: string;
  error?: string;
  tierUsed: 'tier1_direct' | 'tier2_webshare' | 'tier3_modal_fallback';
}

// In-app browser detection
export function detectInAppBrowser(): {
  isInApp: boolean;
  platform: 'facebook' | 'instagram' | 'messenger' | 'other' | null;
} {
  if (typeof window === 'undefined') {
    return { isInApp: false, platform: null };
  }

  const ua = window.navigator.userAgent || window.navigator.vendor || '';

  if (/FBAN|FBAV/i.test(ua)) {
    return { isInApp: true, platform: 'facebook' };
  }
  if (/Instagram/i.test(ua)) {
    return { isInApp: true, platform: 'instagram' };
  }
  if (/Messenger/i.test(ua)) {
    return { isInApp: true, platform: 'messenger' };
  }
  if (/WebView|Android.*Version\/[0-9.]+|wv/i.test(ua)) {
    return { isInApp: true, platform: 'other' };
  }

  return { isInApp: false, platform: null };
}

// Detect operating system
export function getMobileOs(): 'android' | 'ios' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = window.navigator.userAgent || '';
  if (/Android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  return 'desktop';
}

// Trigger opening the current page in the default system browser (Chrome / Safari)
// This bypasses the Facebook / Instagram in-app WebView download block!
export function triggerOpenInExternalBrowser(url?: string): boolean {
  if (typeof window === 'undefined') return false;
  const targetUrl = url || window.location.href;
  const cleanUrl = targetUrl.replace(/^https?:\/\//i, '');
  const os = getMobileOs();

  if (os === 'android') {
    // Android Chrome Intent: triggers Android OS to launch Google Chrome
    const chromeIntent = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
    const genericIntent = `intent://${cleanUrl}#Intent;scheme=https;action=android.intent.action.VIEW;end;`;
    try {
      window.location.href = chromeIntent;
      setTimeout(() => {
        window.location.href = genericIntent;
      }, 800);
      return true;
    } catch {
      window.location.href = genericIntent;
      return true;
    }
  }

  if (os === 'ios') {
    // On iOS Facebook browser:
    // Try opening via googlechrome scheme if installed, or prompt
    try {
      window.location.href = `googlechrome://${cleanUrl}`;
      return true;
    } catch {
      return false;
    }
  }

  window.open(targetUrl, '_blank');
  return true;
}

// Ensure fonts are ready before DOM capture
export async function ensureFontsLoaded(): Promise<void> {
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await Promise.allSettled([
        document.fonts.load('600 24px "Hind Siliguri"'),
        document.fonts.load('600 24px "Noto Sans Bengali"'),
        document.fonts.load('600 24px "Anek Bangla"'),
        document.fonts.ready,
      ]);
    } catch (e) {
      console.warn('[Shoishob Export] Font ready check error, continuing:', e);
    }
  }
}

// Generate Blob from card element with pixelRatio 2 and fallback to 1
export async function generateCardBlob(
  element: HTMLElement,
  format: ExportFormat
): Promise<Blob> {
  await ensureFontsLoaded();

  const isJpg = format === 'jpg';
  const mimeType = isJpg ? 'image/jpeg' : 'image/png';
  const quality = isJpg ? 0.95 : 1.0;

  // Try high-resolution rendering first (pixelRatio: 2)
  try {
    const blob = await toBlob(element, {
      type: mimeType,
      quality,
      pixelRatio: 2,
      cacheBust: true,
      skipAutoScale: false,
    });

    if (blob && blob.size > 1000) {
      return blob;
    }
    throw new Error('Rendered Blob is empty or invalid');
  } catch (highResError) {
    console.warn('[Shoishob Export] High-res render failed, attempting fallback (pixelRatio: 1):', highResError);

    // Memory-safe retry at pixelRatio: 1
    const fallbackBlob = await toBlob(element, {
      type: mimeType,
      quality,
      pixelRatio: 1,
      cacheBust: true,
    });

    if (!fallbackBlob || fallbackBlob.size < 1000) {
      throw new Error('Image export failed to generate a valid image.');
    }
    return fallbackBlob;
  }
}

// Tier 1: Direct Anchor Download
export function triggerDirectDownload(blob: Blob, filename: string): boolean {
  try {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Safely revoke after sufficient delay so the browser can start saving
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 15000);

    return true;
  } catch (err) {
    console.warn('[Shoishob Export] Direct download failed:', err);
    return false;
  }
}

// Tier 2: Web Share API with File
export async function triggerNativeFileShare(
  blob: Blob,
  filename: string,
  title: string
): Promise<boolean> {
  if (typeof navigator === 'undefined' || !('share' in navigator) || !('canShare' in navigator)) {
    return false;
  }

  try {
    const file = new File([blob], filename, { type: blob.type });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title,
        text: 'আমার শৈশবের পরিচয়পত্র! আপনার শৈশব কেমন ছিল?',
        files: [file],
      });
      return true;
    }
    return false;
  } catch (err: unknown) {
    // If user cancelled, that's not an error
    if (err instanceof Error && err.name === 'AbortError') {
      return true;
    }
    console.warn('[Shoishob Export] Web share file failed:', err);
    return false;
  }
}
