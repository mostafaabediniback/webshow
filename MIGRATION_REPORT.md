# گزارش مهاجرت اربعین تی وی

تاریخ بررسی: ۱۹ اکتبر ۲۰۲۶. تمام پیاده‌سازی و خروجی‌های این کار داخل `next/` قرار دارند.

## خلاصه و معماری

برنامهٔ موجود React 19، Vite 7، JavaScript/JSX، Tailwind 4، React Query 5، Axios، Formik/Yup، Dropzone، Iconsax و MUI بررسی و به Next.js 16.4.2 با App Router منتقل شد. مسیریابی قبلی ۱۹ مسیر فعال داشت؛ مسیر کامنت‌شدهٔ `/dashboard/playlists` فعال نشده است. صفحات `DashboardPlaylists` و `PlaylistCard` برای حفظ ماژول‌های موجود منتقل شده‌اند، اما URL جدیدی برای آن‌ها اختراع نشده است.

صفحه‌ها و layoutهای App Router، دریافت دادهٔ عمومی، metadata و شبکهٔ اولیهٔ کارت‌های خانه و کانال Server Component هستند. فیلتر، اسکرول بی‌نهایت، پخش، منوها، فرم‌ها و داشبوردها مرز کلاینت دارند. درخت کامل برنامه به SPA تبدیل نشده است. `VideoGrid` و کارت‌ها در حالت اولیه مستقیماً روی سرور ساخته و به بخش تعاملی داده می‌شوند؛ بارگذاری صفحات بعدی همچنان با React Query انجام می‌شود. React Query با cache مجزا برای هر پاسخ سرور hydrate می‌شود.

ماژول‌های مستقل سرویس، hook، utility و UI از پیاده‌سازی فعلی بازاستفاده شدند. هیچ import زمان اجرا از `../src` یا وابستگی به `package.json` ریشه وجود ندارد. React Router حذف و adapter کوچک `lib/navigation.jsx` بر پایهٔ `next/link` و `next/navigation` اضافه شده است. این adapter شکل call siteهای قبلی را حفظ می‌کند؛ شناسهٔ کانال دیگر به history state وابسته نیست.

تمام درخواست‌های سرور ناشناس‌اند؛ توکن کاربر، cookie و دادهٔ شخصی بین پاسخ‌ها به اشتراک گذاشته نمی‌شود. محتوای عمومی با `no-store` و SSR پویا دریافت می‌شود، چون وضعیت انتشار ممکن است تغییر کند. تنها نگاشت عمومی شناسه/username کانال‌ها پنج دقیقه revalidate می‌شود. پاسخ فهرست بک‌اند username بسیاری از کانال‌ها را خالی می‌فرستد؛ نگاشت با endpoint موجود جزئیات کانال تکمیل می‌شود. درخواست‌های عمومی 401/403 برای ویدیو یا پلی‌لیست به نمایش محافظت‌شده و `noindex` تبدیل می‌شوند تا قرارداد قبلی `sessionStorage` برای کاربران واردشده حفظ شود.

## ساختار واقعی

```text
next/
├── app/
│   ├── (public)/                 # خانه، کانال، جستجو، ویدیو، ورود و پوستهٔ مشترک
│   ├── (private)/                # dashboard و user-dashboard، layout و loading
│   ├── playlists/[playlistId]/
│   ├── layout.jsx
│   ├── error.jsx
│   ├── not-found.jsx
│   ├── manifest.js
│   ├── robots.js
│   └── sitemap.js
├── components/                   # UI اصلی و اجزای مرزی Next
├── features/                     # جریان‌ها و صفحات منتقل‌شده
├── hooks/                        # auth، video، channel، playlist، users، category و UI
├── layouts/
├── lib/                          # API عمومی سرور، hydration، SEO و navigation
├── providers/
├── services/
├── store/
├── utils/
├── ui/
├── constants/
├── types/
├── public/                       # assets، دادهٔ محلی قبلی، آیکون‌ها، SW و offline
├── styles/globals.css
├── tests/
├── scripts/                      # بررسی مسیر، مرورگر، بک‌اند و حفظ فایل‌ها
├── reports/                      # شواهد واقعی بررسی‌ها
├── .env.example
├── .gitignore
├── AGENTS.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── postcss.config.mjs
├── package.json
├── package-lock.json
├── README.md
└── MIGRATION_REPORT.md
```

`node_modules/`، `.next/`، `.env.local` و تصاویر موقت وجود دارند و توسط Git نادیده گرفته می‌شوند.

## نگاشت مسیرها

پیشوند همهٔ مقصدهای زیر `app/` است. هیچ URL عمومی تغییر نکرده است.

| مسیر React | فایل Next.js | دسترسی و رندر |
| --- | --- | --- |
| `/` | `(public)/page.jsx` | عمومی، SSR |
| `/:username?` | `(public)/[username]/page.jsx` | عمومی، SSR؛ `/` همان خانه است |
| `/search/:q` | `(public)/search/[q]/page.jsx` | عمومی، SSR، noindex |
| `/v/:id` | `(public)/v/[id]/page.jsx` | SSR عمومی؛ دادهٔ محدودشده فقط پس از ورود |
| `/playlists/:playlistId` | `playlists/[playlistId]/page.jsx` | SSR عمومی؛ پلی‌لیست خصوصی فقط پس از ورود |
| `/login` | `(public)/login/page.jsx` | فقط مهمان، noindex |
| `/dashboard` | `(private)/dashboard/page.jsx` | کاربر واردشده |
| `/dashboard/channels` | `(private)/dashboard/channels/page.jsx` | مدیر پلتفرم |
| `/dashboard/upload` | `(private)/dashboard/upload/page.jsx` | مدیر پلتفرم |
| `/dashboard/playlists/:playlistId` | `(private)/dashboard/playlists/[playlistId]/page.jsx` | کاربر واردشده |
| `/dashboard/videos` | `(private)/dashboard/videos/page.jsx` | مدیر پلتفرم |
| `/dashboard/videos/:id` | `(private)/dashboard/videos/[id]/page.jsx` | مدیر پلتفرم |
| `/dashboard/users` | `(private)/dashboard/users/page.jsx` | مدیر پلتفرم |
| `/dashboard/categories` | `(private)/dashboard/categories/page.jsx` | مدیر پلتفرم |
| `/dashboard/user-upload` | `(private)/dashboard/user-upload/page.jsx` | مدیر کانال |
| `/dashboard/user-videos` | `(private)/dashboard/user-videos/page.jsx` | مدیر کانال |
| `/dashboard/settings` | `(private)/dashboard/settings/page.jsx` | مدیر کانال |
| `/user-dashboard` | `(private)/user-dashboard/page.jsx` | نقش user |
| `/user-dashboard/create-channel` | `(private)/user-dashboard/create-channel/page.jsx` | نقش user |

مسیرهای محافظت‌شده فقط پوستهٔ انتظار عمومی را prerender می‌کنند؛ هیچ دادهٔ حساب در HTML ثابت آن‌ها قرار ندارد. ماتریس نقش‌ها عیناً مطابق `App.jsx` اصلی حفظ شده است و enforcement مجوز API همچنان در بک‌اند انجام می‌شود.

## حفظ قابلیت‌ها و تغییرات ضروری

| بخش | نتیجه و دامنهٔ تأیید |
| --- | --- |
| خانه و کانال | دادهٔ واقعی SSR، فیلتر، لیست اولیه، لینک و reload مستقیم کانال تأیید شد؛ hook اسکرول و صفحه‌بندی حفظ شده‌اند. |
| جستجو | صفحهٔ پارامتردار، متن فارسی و cache اولیه بررسی شد؛ جستجوی inline و debounce قبلی حفظ شده است. |
| ویدیو | عنوان و منبع player، حالت موبایل و شبکهٔ مرتبط حفظ و نمایش player با منبع واقعی بررسی شد. دانلود، اشتراک‌گذاری، playlist و انتخاب کیفیت به منطق قبلی متصل‌اند. نمونهٔ بررسی‌شده چند کیفیت نداشت؛ تعویض کیفیت و دانلود کامل تأیید انتهابه‌انتها نشده‌اند. |
| پلی‌لیست | جزئیات و ویدیوهای پلی‌لیست عمومی واقعی با SSR بررسی شد؛ حذف/افزودن و صفحه‌بندی همان سرویس‌ها را دارند. عملیات تغییردهنده اجرا نشد. |
| ورود و ثبت‌نام | فرم ورود، خطای ورودی خالی، تغییر به فرم ثبت‌نام و guard مهمان تأیید شد. ارسال پیامک، ورود واقعی و تکمیل پروفایل بدون حساب آزمایشی اجرا نشد. |
| نشست | کلیدهای sessionStorage، Bearer header، roleها، هدایت پس از ورود و واکنش 401/403 حفظ شده‌اند. snapshot سرور ثابت و انتظار hydration مانع redirect زودهنگام می‌شوند. cache هنگام ورود/خروج پاک می‌شود. |
| آپلود | فایل/URL، chunking پنج مگابایتی، retry، پیشرفت، استخراج frame، crop، کاور، دسته‌بندی و playlist منتقل شده‌اند. Dropzone فقط هنگام نیاز در مرورگر بارگیری می‌شود. آپلود واقعی روی production انجام نشد. |
| مدیریت | کاربران، کانال‌ها، دسته‌بندی، ویرایش و حذف ویدیو، تنظیمات پروفایل/رمز/شبکه‌های اجتماعی و ساخت کانال منتقل و compile شدند. نقش‌ها با آزمون واحد بررسی شدند؛ خواندن/نوشتن با حساب واقعی نیازمند staging است. |
| ظاهر | CSS، فونت‌های Vazir، لوگوها، تصاویر، RTL و breakpointها حفظ شدند؛ خانه در اندازه‌های 1440×1000 و 390×844 تصویربرداری و بازبینی شد. |
| قوانین و modal | بازشدن و بسته‌شدن با Escape بررسی شد. |
| PWA | manifest و آیکون‌های اصلی حفظ، service worker مستقل و صفحهٔ آفلاین اضافه شد. HTML و APIهای کاربر cache نمی‌شوند. نصب روی دستگاه واقعی و iOS آزمایش نشده است. |

اصلاحات سازگاری شامل حذف دسترسی هنگام render به `sessionStorage` و `window`، مقدار اولیهٔ player روی سرور، اصلاح anchorهای تودرتوی کارت، جایگزین تصویر خراب، مستقل‌شدن asset URLها و اصلاح اتصال URL آپلود است. فراخوانی `setSelectedCategories` که در فرم آپلود کاربر تعریف نداشت از reset نسخهٔ مهاجرت‌یافته حذف شد. هیچ‌یک از این اصلاحات به فایل‌های React اصلی اعمال نشده است.

## SEO و کارایی

- Metadata API با عنوان/توضیح مستقل، canonical، Open Graph و Twitter؛ metadata ویدیو، کانال و پلی‌لیست از دادهٔ واقعی تولید می‌شود.
- `lang="fa"`، `dir="rtl"`، heading اصلی و لینک‌های واقعی داخلی حفظ/تکمیل شدند. چون برنامه تک‌زبانه است hreflang چندزبانه ساخته نشده است.
- sitemap از ویدیوها، کانال‌های دارای username و پلی‌لیست‌های صراحتاً عمومی API ساخته می‌شود. تاریخ جعلی تولید نشده است. درخواست صفحات sitemap با هم‌زمانی محدود انجام می‌شود.
- robots و noindex برای ورود، جستجو و پنل‌ها؛ هدر `X-Robots-Tag` برای مسیرهای حساس اضافه شده است.
- JSON-LD نوع `VideoObject` فقط هنگام وجود عنوان، thumbnail و تاریخ قابل‌تبدیل واقعی تولید می‌شود. هیچ آمار، تاریخ یا محتوای ساختگی درج نشده است.
- خطای ناموجود واقعی 404 با جلوگیری از شروع زودهنگام stream در صفحات عمومی بررسی شد. loading در گروه خصوصی و حالت‌های بارگذاری تعاملی باقی مانده است؛ metadata پیش از body تکمیل می‌شود.
- مسیرهای App Router کد را تفکیک می‌کنند؛ uploader و prompt نصب PWA جدا بارگذاری می‌شوند. فونت‌های محلی با `font-display: swap` و preload وزن اصلی استفاده می‌شوند. تصویرهای پویا با URL اصلی بک‌اند و CSS قبلی حفظ شده‌اند؛ optimizer میزبان ناشناخته یا تغییر نسبت تصویر تحمیل نشده است.

## نتایج اعتبارسنجی

| بررسی | نتیجه |
| --- | --- |
| baseline React build | موفق، خروجی فقط داخل `next/reports/baseline-dist` |
| baseline React lint | ۸۱ خطا و ۱۱ هشدار در ۱۲۱ فایل |
| نصب وابستگی مستقل | `npm install` موفق و lockfile مستقل؛ `npm ls --depth=0` کامل |
| development server | اجرای موفق در پورت 3011 و پاسخ واقعی صفحات |
| production build | موفق با Next.js 16.4.2؛ جزئیات `reports/build-output.txt` |
| production server | اجرای موفق با `npm run start` در پورت 3000 |
| TypeScript | سورس اصلی و مهاجرت JS/JSX هستند؛ بررسی مستقل TypeScript کاربرد ندارد. build همهٔ ماژول‌ها را compile کرد. |
| lint نسخهٔ جدید | صفر خطا، ۵۹ هشدار؛ `reports/lint.json` و `reports/lint-output.txt` |
| واحد | هر پنج آزمون نقش‌ها، pagination، SEO، پارامتر فارسی/درصد و پوشش ۱۹ مسیر پاس شدند؛ `reports/unit-tests.txt` |
| HTTP/SSR | هر ۲۵ بررسی پاس شد: محتوای واقعی خانه/کانال/ویدیو/پلی‌لیست، متادیتا، ۱۳ مسیر خصوصی، سه نوع 404، manifest، robots و sitemap؛ `reports/routes-validation.json` |
| مرورگر | فرم‌ها و guardها، فیلتر، player، RTL، نبود overflow موبایل و modal؛ همچنین محتوای خانه، ویدیو، کانال و پلی‌لیست با JavaScript خاموش تأیید شد؛ `reports/browser-validation.json` |
| خطای مرورگر | در اجرای نهایی خطای JavaScript، hydration یا console ثبت نشد. |
| حفظ پروژهٔ اصلی | SHA-256 تعداد ۱۸۲ فایل اصلی بدون تغییر؛ شامل فایل‌های دارای تغییر قبلی کاربر. |

هشدارهای lint عمدتاً متغیرهای استفاده‌نشده، وابستگی effectها و alt برخی تصاویر منتقل‌شده‌اند. قوانین hooks اصلی و `no-undef` فعال‌اند؛ قواعد جدید React Compiler دربارهٔ refs، set-state-in-effect و memoization برای فرم‌ها و پلیرهای imperative قبلی به‌طور محدود غیرفعال شده‌اند تا این مهاجرت به بازنویسی رفتار آن‌ها تبدیل نشود. این موارد پنهان نشده‌اند و ادعای lint بدون هشدار وجود ندارد.

## موارد باقی‌مانده برای پذیرش استقرار

حساب آزمایشی نقش‌های `super_admin`، `admin` و `user` ارائه نشده است. بنابراین ورود واقعی، OTP، انقضای نشست در بک‌اند، آپلود chunk، ویرایش/حذف، تغییر رمز و تنظیمات باید در staging بررسی شوند. آزمون‌های این کار هیچ نوشته‌ای به بک‌اند production ارسال نکردند. کد این قابلیت‌ها منتقل شده، اما برابری کامل انتهابه‌انتها برای آن‌ها تأیید نشده است.

دامنهٔ نهایی در `NEXT_PUBLIC_SITE_URL`، آدرس API، دسترسی شبکهٔ سرور و تنظیم origin بک‌اند باید پیش از deploy تنظیم شوند. کیفیت‌های چندگانه، دانلود طولانی، اشتراک‌گذاری سیستم‌عامل و نصب واقعی PWA به آزمون دستگاه/دادهٔ مناسب نیاز دارند. امتیاز Lighthouse یا Core Web Vitals میدانی اندازه‌گیری نشده است؛ ادعای عددی کارایی یا آمادگی کامل production مطرح نمی‌شود.

دستورهای دقیق نصب، اجرا، build، استقرار و بازاجرای بررسی‌ها در `README.md` آمده‌اند. تنظیمات و قفل وابستگیِ برنامهٔ React اصلی تغییر نکرده‌اند.

مراجع معماری: [Server و Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)، [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) و [رفتار status code در streaming](https://nextjs.org/docs/app/api-reference/file-conventions/loading#status-codes).
