import Feature from '@/features/UserDashboard';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'پنل کاربری', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="user"><Feature /></AuthGuard>; }
