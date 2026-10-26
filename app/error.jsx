"use client";
import { useEffect } from 'react';
export default function ErrorPage({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main dir="rtl" className="mx-auto max-w-2xl p-12 text-center"><h1 className="text-xl font-bold">دریافت اطلاعات با خطا مواجه شد</h1><p className="my-4">لطفاً اتصال خود را بررسی کنید و دوباره تلاش کنید.</p><button onClick={reset} className="rounded-xl bg-orange-500 px-5 py-3 text-white">تلاش مجدد</button></main>;
}
