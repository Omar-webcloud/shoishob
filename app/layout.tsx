import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://shoishob-bd.vercel.app'),
  title: 'শৈশব · আপনার ছোটবেলার গল্পটা কেমন ছিল? | Bangladesh Childhood Generator',
  description:
    'বাংলাদেশের শৈশব, স্মৃতি আর নস্টালজিয়ার একটি অনন্য ইন্টার্যাক্টিভ অভিজ্ঞতা। ১০-১২টি সহজ প্রশ্নের উত্তর দিয়ে নিজের শৈশব পরিচয়পত্র তৈরি করুন ও বন্ধুদের সাথে শেয়ার করুন।',
  icons: {
    icon: '/logo-shoishob.png',
    apple: '/logo-shoishob.png',
  },
  keywords: [
    'শৈশব',
    'Shoishob',
    'Bangladesh Childhood Generator',
    'Bangladesh Nostalgia',
    'বাঙালি শৈশব',
    'স্মৃতি',
    'নব্বইয়ের শৈশব',
    'সিসিমপুর',
    'মীনা',
    'টিফিন',
    'গলির ক্রিকেট',
  ],
  authors: [{ name: 'শৈশব (Shoishob) টিম' }],
  openGraph: {
    title: 'শৈশব · আপনার ছোটবেলার গল্পটা কেমন ছিল?',
    description:
      'বাংলাদেশের শৈশব ও স্মৃতির ব্যক্তিগত পরিচয়পত্র তৈরি করুন ও বন্ধুদের সাথে নস্টালজিয়া ভাগ করে নিন।',
    siteName: 'শৈশব (Shoishob)',
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'শৈশব · Bangladesh Childhood Generator',
    description: 'আপনার শৈশব কোন যুগের ছিল? জেনে নিন শৈশব-এ!',
  },
};

export const viewport: Viewport = {
  themeColor: '#2E6F40',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className="paper-pattern min-h-screen flex flex-col text-[#253D2C] selection:bg-[#CFFFD6] selection:text-[#253D2C]">
        {children}
      </body>
    </html>
  );
}
