import Feature from '@/features/Upload';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'بارگذاری ویدیو', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="platform"><Feature /></AuthGuard>; }
