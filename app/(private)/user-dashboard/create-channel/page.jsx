import Feature from '@/features/UserCreateChannel';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'ایجاد کانال', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="user"><Feature /></AuthGuard>; }
