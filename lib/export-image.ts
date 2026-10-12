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

// Ensure fonts are ready before DOM capture
export async function ensureFontsLoaded(): Promise<void> {
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await document.fonts.ready;
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
