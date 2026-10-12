import { toCanvas } from 'html-to-image';

export type ExportFormat = 'png' | 'jpg';
export interface ExportOptions {
  format: ExportFormat;
  archetypeSlug: string;
}

export interface ExportResult {
  success: boolean;
  blob?: Blob;
  objectUrl?: string;
  error?: string;
  tierUsed: 'tier1_direct' | 'tier2_webshare' | 'tier3_modal_fallback';
}

// Convert Blob to base64 Data URL for robust mobile file saving
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error('Could not read blob.'));
    reader.readAsDataURL(blob);
  });
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
export function triggerOpenInExternalBrowser(url?: string): boolean {
  if (typeof window === 'undefined') return false;
  const targetUrl = url || window.location.href;
  const cleanUrl = targetUrl.replace(/^https?:\/\//i, '');
  const os = getMobileOs();

  if (os === 'android') {
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
      await document.fonts.ready;
    } catch (e) {
      console.warn('[Shoishob Export] Font ready check error, continuing:', e);
    }
  }
}

// Two-pass rendering helper: first pass warms up fonts/images, second produces final canvas
async function renderToCanvas(node: HTMLElement, pixelRatio: number): Promise<HTMLCanvasElement> {
  const options = {
    pixelRatio,
    cacheBust: false,
    style: { transform: 'none', margin: '0' },
  };
  // First pass warms up layout, fonts and images
  await toCanvas(node, options);
  // Second pass returns the clean pixel-perfect canvas
  return toCanvas(node, options);
}

// Generate Blob directly from the live DOM node with exact styling
export async function generateCardBlob(
  element: HTMLElement,
  format: ExportFormat
): Promise<Blob> {
  await ensureFontsLoaded();

  const isJpg = format === 'jpg';
  const mimeType = isJpg ? 'image/jpeg' : 'image/png';
  const quality = isJpg ? 0.95 : 1.0;

  // 1. High-res pass at pixelRatio: 2
  try {
    const canvas = await renderToCanvas(element, 2);
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, mimeType, quality)
    );

    if (blob && blob.size > 1000) {
      return blob;
    }
    throw new Error('Rendered high-res canvas produced empty Blob');
  } catch (err) {
    console.warn('[Shoishob Export] High-res render failed, attempting pixelRatio: 1 fallback:', err);

    // 2. Fallback pass at pixelRatio: 1
    const fallbackCanvas = await renderToCanvas(element, 1);
    const fallbackBlob: Blob | null = await new Promise((resolve) =>
      fallbackCanvas.toBlob(resolve, mimeType, quality)
    );

    if (!fallbackBlob || fallbackBlob.size < 1000) {
      throw new Error('Image export failed to generate a valid image.');
    }
    return fallbackBlob;
  }
}

// Tier 1: Direct Anchor Download via Data URL
export async function triggerDirectDownload(blob: Blob, filename: string): Promise<boolean> {
  try {
    const dataUrl = await blobToDataUrl(blob);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.warn('[Shoishob Export] Direct data URL download failed, falling back to ObjectURL:', err);
    try {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 15000);
      return true;
    } catch {
      return false;
    }
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
    if (err instanceof Error && err.name === 'AbortError') {
      return true;
    }
    console.warn('[Shoishob Export] Web share file failed:', err);
    return false;
  }
}
