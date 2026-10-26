import Feature from '@/features/Users';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'مدیریت کاربران', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="platform"><Feature /></AuthGuard>; }
