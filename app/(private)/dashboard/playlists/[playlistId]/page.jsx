import Feature from '@/features/PlaylistDetail';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'مدیریت پلی‌لیست', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="authenticated"><Feature /></AuthGuard>; }
