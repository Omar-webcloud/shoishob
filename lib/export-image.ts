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

  if (/FBAN|FBAV|FB_IAB|FB4A|FBIOS/i.test(ua)) {
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
    // Android Intent: triggers Android OS to launch Google Chrome or default system browser
    const chromeIntent = `intent://${cleanUrl}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(targetUrl)};end`;
    const genericIntent = `intent://${cleanUrl}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end;`;

    try {
      const link = document.createElement('a');
      link.href = chromeIntent;
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch {
      try {
        window.location.href = chromeIntent;
        return true;
      } catch {
        window.location.href = genericIntent;
        return true;
      }
    }
  }

  if (os === 'ios') {
    // On iOS Facebook browser, try breakout schemes
    try {
      window.location.href = `x-safari-https://${cleanUrl}`;
      return true;
    } catch {
      try {
        window.location.href = `googlechromes://${cleanUrl}`;
        return true;
      } catch {
        return false;
      }
    }
  }

  try {
    const win = window.open(targetUrl, '_blank');
    if (!win) {
      window.location.href = targetUrl;
    }
    return true;
  } catch {
    window.location.href = targetUrl;
    return true;
  }
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

let cachedFontCSS: string | null = null;

// Safely fetch and cache the Google Fonts CSS string.
// Passing this directly as fontEmbedCSS prevents html-to-image from accessing document.styleSheets,
// which completely avoids CORS SecurityError on cross-origin stylesheets or extensions.
export async function getSafeFontEmbedCSS(): Promise<string> {
  if (cachedFontCSS !== null) return cachedFontCSS;
  if (typeof window === 'undefined') return '';

  try {
    const res = await fetch(
      'https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@400;500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700&display=swap'
    );
    if (res.ok) {
      cachedFontCSS = await res.text();
      return cachedFontCSS;
    }
  } catch (err) {
    console.warn('[Shoishob Export] Font CSS prefetch skipped, using fallback:', err);
  }

  cachedFontCSS = '';
  return cachedFontCSS;
}

// Generate Blob from card element with pixelRatio 2 and safe font fallbacks
export async function generateCardBlob(
  element: HTMLElement,
  format: ExportFormat
): Promise<Blob> {
  await ensureFontsLoaded();
  const fontEmbedCSS = await getSafeFontEmbedCSS();

  const isJpg = format === 'jpg';
  const mimeType = isJpg ? 'image/jpeg' : 'image/png';
  const quality = isJpg ? 0.95 : 1.0;

  // 1. Try high-resolution rendering with fontEmbedCSS (pixelRatio: 2)
  try {
    const blob = await toBlob(element, {
      type: mimeType,
      quality,
      pixelRatio: 2,
      cacheBust: true,
      skipAutoScale: false,
      fontEmbedCSS: fontEmbedCSS || undefined,
      skipFonts: !fontEmbedCSS,
    });

    if (blob && blob.size > 1000) {
      return blob;
    }
    throw new Error('Rendered Blob is empty or invalid');
  } catch (highResError) {
    console.warn('[Shoishob Export] High-res render failed, attempting fallback (pixelRatio: 1):', highResError);

    // 2. Retry at pixelRatio: 1 with fontEmbedCSS
    try {
      const fallbackBlob = await toBlob(element, {
        type: mimeType,
        quality,
        pixelRatio: 1,
        cacheBust: true,
        fontEmbedCSS: fontEmbedCSS || undefined,
        skipFonts: !fontEmbedCSS,
      });

      if (fallbackBlob && fallbackBlob.size > 1000) {
        return fallbackBlob;
      }
      throw new Error('Fallback rendered Blob is empty or invalid');
    } catch (fallbackError) {
      console.warn('[Shoishob Export] Fallback render failed, trying ultimate safe render (skipFonts: true):', fallbackError);

      // 3. Ultimate safe retry: skipFonts: true (completely bypasses all stylesheet inspection)
      const safeBlob = await toBlob(element, {
        type: mimeType,
        quality,
        pixelRatio: 1,
        cacheBust: true,
        skipFonts: true,
      });

      if (!safeBlob || safeBlob.size < 1000) {
        throw new Error('Image export failed to generate a valid image.');
      }
      return safeBlob;
    }
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
