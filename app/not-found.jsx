import Link from 'next/link';
export const metadata = { title: 'صفحه پیدا نشد', robots: { index: false, follow: false } };
export default function NotFound() {
  return <main className="mx-auto max-w-2xl p-12 text-center"><h1 className="text-2xl font-bold">صفحه پیدا نشد</h1><p className="my-4">آدرس مورد نظر وجود ندارد یا حذف شده است.</p><Link href="/" className="text-orange-600">بازگشت به خانه</Link></main>;
}
