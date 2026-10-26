import Feature from '@/features/Channels';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'مدیریت کانال‌ها', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="platform"><Feature /></AuthGuard>; }
