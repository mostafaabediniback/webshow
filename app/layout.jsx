import AppProviders from '@/providers/AppProviders';
import { siteUrl } from '@/lib/seo';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  metadataBase: siteUrl,
  title: { default: 'اربعین تی وی - تلویزیون اینترنتی جبهه مقاومت', template: '%s | اربعین تی وی' },
  description: 'تلویزیون اینترنتی جبهه مقاومت؛ تماشای ویدیوها و کانال‌های اربعین تی وی.',
  applicationName: 'اربعین تی وی',
  manifest: '/manifest.webmanifest',
  icons: { icon: [{ url: '/icons/app-icon-192-v2.png', sizes: '192x192', type: 'image/png' }], apple: [{ url: '/icons/apple-touch-icon-v2.png', sizes: '192x192' }] },
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'اربعین تی وی' },
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#000000' };

export default function RootLayout({ children }) {
  return <html lang="fa" dir="rtl" data-scroll-behavior="smooth"><head><link rel="preload" href="/assets/fonts/vazir/Vazir-Regular-FD.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body><AppProviders>{children}</AppProviders></body></html>;
}
