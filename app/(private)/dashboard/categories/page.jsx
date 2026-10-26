import Feature from '@/features/Categories';
import AuthGuard from '@/components/AuthGuard';
export const metadata = { title: 'مدیریت دسته‌بندی‌ها', robots: { index: false, follow: false } };
export default function Page() { return <AuthGuard access="platform"><Feature /></AuthGuard>; }
