import Feature from '@/features/VideoEdit';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'ویرایش ویدیو', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="platform"><Feature /></AuthGuard>; }
