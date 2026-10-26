import Login from '@/features/Login';
import AuthGuard from '@/components/AuthGuard';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('ورود و ثبت‌نام', 'ورود یا ایجاد حساب کاربری در اربعین تی وی.', '/login', { noindex: true });
export default function Page() { return <AuthGuard access="public"><Login /></AuthGuard>; }
