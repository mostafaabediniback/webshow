import Feature from '@/features/SettingsPage';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'تنظیمات کانال', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="channel"><Feature /></AuthGuard>; }
