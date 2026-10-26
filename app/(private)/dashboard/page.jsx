import Feature from '@/features/Dashboard';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'داشبورد', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="authenticated"><Feature /></AuthGuard>; }
