import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

/*
 * The same Cairo the app bundles (app/src/main/res/font/cairo.ttf), so the
 * site and the phone are drawn with one alphabet — Arabic and Latin both.
 */
const cairo = localFont({
  src: '../assets/Cairo.ttf',
  weight: '200 1000',
  display: 'swap',
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'طمأنينة · Tumanina — هاتفك يسكت لوحده وقت الصلاة',
  description:
    'تطبيق أندرويد بيفعّل وضع عدم الإزعاج حوالين كل صلاة من الصلوات الخمس، وبيرجّع الرنّة زي ما كانت بالظبط. نزّل ملف APK مباشرة.',
  openGraph: {
    title: 'طمأنينة · Tumanina',
    description: 'هاتفك يسكت لوحده وقت الصلاة، ويرجع زي ما كان.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6fbf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1f1b' },
  ],
};

/*
 * Language and theme are the visitor's own choice kept in localStorage — the
 * app makes those same two choices in its settings rather than inheriting them
 * from the phone. Applied before the first paint so nothing flashes.
 */
const BOOT = `(function(){try{
var q=new URLSearchParams(location.search);
var l=q.get('lang')||localStorage.getItem('tumanina-lang')||'ar';
var t=q.get('theme')||localStorage.getItem('tumanina-theme')||'system';
var d=document.documentElement;
d.lang=l;d.dir=l==='ar'?'rtl':'ltr';
var dark=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);
d.setAttribute('data-theme',dark?'dark':'light');
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The boot script rewrites lang, dir and data-theme before React arrives,
    // which is the whole point of it — so those three are expected to differ.
    <html lang="ar" dir="rtl" data-theme="light" className={cairo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
