import Feature from '@/features/Videos';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'مدیریت ویدیوها', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="platform"><Feature /></AuthGuard>; }
