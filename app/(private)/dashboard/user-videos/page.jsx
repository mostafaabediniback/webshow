import Feature from '@/features/UploadedVideos';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'ویدیوهای کانال', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="channel"><Feature /></AuthGuard>; }
