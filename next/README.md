# Next.js rewrite (stable app router)

این پوشه نسخه بازنویسی‌شده پروژه با Next.js (App Router) است و سرویس‌های API آن با الگوی پروژه React اصلی هم‌راستا شده‌اند.

## Features
- ساختار پایدار Next.js با `app/`
- استفاده از `axios` + service layer مشابه پروژه React
- استفاده از `@tanstack/react-query` برای hooks و state سرور
- Metadata API + OpenGraph/Twitter
- Structured Data (JSON-LD) در صفحه ویدیو
- استفاده از `next/image` برای بهینه‌سازی تصویر
- استخراج UI تکراری در `VideoListSection`

## Environment
فایل `.env.local` بسازید:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-api-base-url
```

## Run
```bash
cd next
npm install
npm run dev
```
