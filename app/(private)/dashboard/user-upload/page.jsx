import Feature from '@/features/UserVideos';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'بارگذاری ویدیوی کانال', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="channel"><Feature /></AuthGuard>; }
