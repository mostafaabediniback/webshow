# اربعین تی وی — نسخه Next.js

رابط وب فارسی و راست‌به‌چپ اربعین تی وی برای نمایش و مدیریت ویدیو، کانال و پلی‌لیست. این نسخه از React/Vite به **Next.js 16.4.2 با App Router** منتقل شده و یک پروژه مستقل در ریشه مخزن است. صفحات عمومی روی سرور رندر می‌شوند و فرم‌ها، پلیر و پنل‌های مدیریت در مرورگر کار می‌کنند.

| مشخصه | مقدار |
| --- | --- |
| مخزن | [mostafaabediniback/webshow](https://github.com/mostafaabediniback/webshow) |
| برنچ این نسخه | [`next-version`](https://github.com/mostafaabediniback/webshow/tree/next-version) |
| نام و نسخه بسته | `arbaeentv-next`، نسخه `1.0.0` |
| زبان سورس | JavaScript / JSX؛ تعریف نوع محدود در `types/` |
| Node.js پیشنهادی | شاخه `24.x`؛ حداقل اعلام‌شده در package برابر `20.9.0` است، اما محدودیت عملی کد پایین‌تر توضیح داده شده است. |
| مدیر بسته | npm با `package-lock.json` |
| روش اجرا | سرور Node.js یا میزبان سازگار با Next.js |
| ریشه پروژه برای استقرار | ریشه همین مخزن (`.`) |

این مخزن فقط فرانت‌اند را دارد. بک‌اند، پایگاه داده، پردازش و نگهداری ویدیو و ارسال OTP باید جداگانه فراهم باشند. بدون بک‌اند سازگار، صفحات داده‌محور و عملیات حساب کاربری کامل کار نمی‌کنند. مقدار دامنه در `.env.example` نمونه تنظیمات است و اثبات انتشار این برنچ روی آن دامنه نیست.

## فهرست

- [قابلیت‌ها](#features)
- [راه‌اندازی سریع](#quick-start)
- [متغیرهای محیطی](#environment)
- [دستورهای پروژه](#commands)
- [معماری و ساختار](#architecture)
- [مسیرها و دسترسی‌ها](#routes)
- [بک‌اند و احراز هویت](#backend)
- [SEO و PWA](#seo-pwa)
- [انتشار و استقرار](#deployment)
- [آزمون و اعتبارسنجی](#verification)
- [عیب‌یابی](#troubleshooting)
- [نگهداری و محدودیت‌های فعلی](#maintenance)

<a id="features"></a>

## قابلیت‌ها

- صفحه اصلی و کانال‌ها با فیلتر، صفحه‌بندی و بارگذاری تدریجی ویدیوها.
- جستجوی فارسی با URL مستقل و امکان بازکردن مستقیم نتیجه.
- صفحه ویدیو با پلیر، انتخاب کیفیت در صورت ارائه توسط بک‌اند، دانلود، اشتراک‌گذاری و ویدیوهای مرتبط.
- نمایش پلی‌لیست عمومی و مدیریت ارتباط ویدیو با پلی‌لیست.
- ورود، ثبت‌نام با OTP و تکمیل اطلاعات حساب.
- پنل مدیر پلتفرم برای کاربران، کانال‌ها، دسته‌بندی و ویدیوها.
- پنل مدیر کانال برای آپلود، مدیریت ویدیو و تنظیمات کانال، پروفایل و شبکه‌های اجتماعی.
- داشبورد کاربر و درخواست ساخت کانال.
- آپلود فایل یا ثبت URL ویدیو، نمایش پیشرفت، استخراج فریم، برش تصویر و انتخاب کاور.
- رابط RTL، فونت محلی Vazir، نمایش موبایل، وضعیت بارگذاری، خطا و فهرست خالی.
- متادیتای اختصاصی، sitemap، robots، manifest و صفحه جایگزین آفلاین.

وجود کد یک قابلیت به معنی تأیید تمام جریان‌های آن در محیط production نیست؛ دامنه آزمون‌های انجام‌شده در بخش اعتبارسنجی آمده است.

<a id="quick-start"></a>

## راه‌اندازی سریع

ابتدا Node.js شاخه `24.x`، npm و Git را نصب کنید. محیط فعلی از Node.js `24.21.0` استفاده می‌کند. مقدار `engines` در package حداقل `20.9.0` را اعلام کرده، اما `next.config.mjs` و برخی اسکریپت‌ها از `import.meta.dirname` استفاده می‌کنند که در شاخه 20 از نسخه `20.11.0` اضافه شده است؛ بنابراین `20.9` و `20.10` برای کد فعلی کافی نیستند. مبنای این تفاوت [مستندات رسمی Node.js](https://nodejs.org/api/esm.html#importmetadirname) است. برای production یک نسخه LTS دارای پشتیبانی انتخاب کنید؛ [وضعیت انتشارهای Node.js](https://nodejs.org/en/about/previous-releases) را پیش از نصب بررسی کنید.

سپس:

```bash
git clone --branch next-version --single-branch https://github.com/mostafaabediniback/webshow.git
cd webshow
npm ci
```

فایل محیطی را فقط در صورتی که از قبل تنظیمات ندارید از نمونه بسازید:

در PowerShell:

```powershell
Copy-Item .env.example .env.local
```

در Linux / macOS:

```bash
cp .env.example .env.local
```

در `.env.local` آدرس واقعی API را جایگزین کنید و برای توسعه، `NEXT_PUBLIC_SITE_URL` را روی `http://localhost:3000` قرار دهید. آدرس `api.example.com` یک placeholder است.

```bash
npm run dev
```

برنامه در [localhost:3000](http://localhost:3000) در دسترس است. برای پورت دیگر:

```bash
npm run dev -- --port 3011
```

در این حالت مبدأ سایت را نیز برای آزمایش لینک‌های canonical روی `http://localhost:3011` تنظیم کنید. پس از تغییر فایل‌های محیطی، سرور توسعه را دوباره اجرا کنید.

<a id="environment"></a>

## متغیرهای محیطی

مرجع اولیه: [`.env.example`](.env.example). فایل `.env.local` در ریشه پروژه قرار می‌گیرد و در Git نادیده گرفته می‌شود.

| متغیر | وضعیت | مصرف‌کننده و کاربرد |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | لازم | آدرس کامل بک‌اند برای مرورگر و آدرس پیش‌فرض درخواست‌های عمومی سرور؛ شامل پیشوند API و ترجیحاً `/` انتهایی. |
| `API_BASE_URL` | اختیاری | آدرس داخلی همان بک‌اند، فقط برای درخواست‌های سرور؛ در صورت نبودن، مقدار عمومی بالا مصرف می‌شود. |
| `NEXT_PUBLIC_SITE_URL` | لازم برای انتشار | مبدأ کامل سایت برای canonical، Open Graph، robots و sitemap؛ بدون مسیر صفحه یا پیشوند API. در نبود مقدار، کد از `http://localhost:3000` استفاده می‌کند. |
| `PORT` | اختیاری، زمان اجرا | پورت سرور production؛ پیش‌فرض `3000`. از گزینه `--port` هم می‌توان استفاده کرد. |
| `TEST_BASE_URL` | اختیاری، فقط آزمون | آدرس سرور در حال اجرا برای اسکریپت‌های بررسی مسیر و مرورگر؛ پیش‌فرض `http://localhost:3000`. |

نمونه **فرضی** برای production؛ دامنه‌ها را با مقادیر استقرار خود جایگزین کنید:

```dotenv
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api/
NEXT_PUBLIC_SITE_URL=https://video.example.com
# اختیاری؛ همین بک‌اند باید از شبکه سرور در دسترس باشد:
# API_BASE_URL=http://backend:8000/api/
```

- متغیرهای `NEXT_PUBLIC_` در خروجی مرورگر هنگام `npm run build` قرار می‌گیرند. تغییر آدرس عمومی API یا سایت پس از build به build و انتشار مجدد نیاز دارد.
- آدرس عمومی API باید از دستگاه کاربر قابل دسترس باشد. آدرس‌هایی مثل `http://backend:8000` فقط برای `API_BASE_URL` در یک شبکه داخلی مناسب‌اند.
- آدرس داخلی و عمومی باید به یک بک‌اند با داده و قرارداد یکسان برسند تا رندر سرور و درخواست‌های مرورگر ناسازگار نشوند.
- متغیرها را پیش از build تنظیم کنید و در زمان اجرای سرور نیز در دسترس نگه دارید. متغیرهای محیط پردازش بر فایل‌های `.env` اولویت دارند.
- رمز، کلید خصوصی و توکن را در متغیرهای `NEXT_PUBLIC_` قرار ندهید. فایل‌های محیطی واقعی را کامیت نکنید.
- اسکریپت‌های Node داخل `scripts/` همه رفتار بارگذاری خودکار `.env` در Next.js را ندارند؛ پیش‌نیاز هرکدام در بخش آزمون توضیح داده شده است.

<a id="commands"></a>

## دستورهای پروژه

تمام دستورها از ریشه مخزن اجرا می‌شوند.

| دستور | کاربرد |
| --- | --- |
| `npm ci` | نصب مطابق lockfile؛ مناسب کلون تازه و فرایند build. |
| `npm run dev` | اجرای سرور توسعه Next.js. |
| `npm run build` | ساخت نسخه production در `.next/`. |
| `npm run start` | اجرای خروجی production؛ ابتدا build لازم است. |
| `npm run lint` | بررسی ESLint؛ هشدارهای موجود ممکن است گزارش شوند. |
| `npm test` | آزمون واحد نقش‌ها، pagination، SEO، پارامتر URL و پوشش مسیرها. |
| `npm run test:routes` | بررسی HTTP/SSR روی سرور در حال اجرا با داده واقعی بک‌اند. |
| `npm run verify:original` | بررسی تاریخی فایل‌های پروژه Vite؛ به ساختار پروژه قدیمی خارج از مخزن مستقل وابسته است. |
| `node scripts/browser-check.mjs` | بررسی مرورگر با Playwright و Chrome؛ مقایسه تصویری به اجرای نسخه Vite هم نیاز دارد. |
| `node scripts/probe-api.mjs` | بررسی فقط خواندنی پاسخ چند endpoint؛ به `.env.local` با مقدار ساده آدرس API نیاز دارد. |

برای بررسی محلی نسخه production:

```bash
npm run build
npm run start -- --port 3000
```

<a id="architecture"></a>

## معماری و ساختار

در صفحات عمومی، مرورگر درخواست صفحه را به App Router می‌فرستد؛ صفحه از طریق `lib/public-api.js` داده بک‌اند را دریافت و HTML اولیه خانه، کانال، ویدیو یا پلی‌لیست عمومی را روی سرور تولید می‌کند. React Query داده اولیه را hydrate می‌کند و فیلترها، صفحه‌بندی و درخواست‌های بعدی را در مرورگر مدیریت می‌کند. برای هر نمونه Provider، QueryClient مستقل ساخته می‌شود.

در جریان حساب کاربری و مدیریت، hookها در مرورگر سرویس Axios را فراخوانی می‌کنند و سرویس، درخواست را با Bearer token به بک‌اند می‌فرستد. کد backend یا Route Handler برای واسطه‌گری API در این مخزن وجود ندارد؛ مرورگر مستقیماً به API تنظیم‌شده متصل می‌شود.

```text
.
├── app/
│   ├── (public)/           # خانه، کانال، جستجو، ویدیو و ورود
│   ├── (private)/          # dashboard و user-dashboard
│   ├── playlists/          # جزئیات پلی‌لیست عمومی/محافظت‌شده
│   ├── layout.jsx          # پوسته اصلی و تنظیمات عمومی
│   ├── error.jsx           # مرز خطا
│   ├── not-found.jsx       # صفحه ناموجود
│   ├── manifest.js
│   ├── robots.js
│   └── sitemap.js
├── components/             # کارت، پلیر، guard، فرم‌ها، آپلود و اجزای مشترک
├── features/               # جریان‌ها و صفحه‌های تعاملی
├── hooks/                  # auth، video، channel، playlist، users، category و UI
├── services/               # ارتباط با API و بخشی از ابزارهای محلی قدیمی
├── lib/                    # API عمومی سرور، SEO، hydration، نقش‌ها و navigation
├── layouts/                # چیدمان‌های قابل استفاده در featureها
├── providers/              # React Query، اعلان‌ها، نشست و ثبت service worker
├── store/                  # وضعیت مشترک ورود و بارگذاری
├── utils/                  # Axios، sessionStorage، pagination و ابزارهای عمومی
├── ui/                     # دکمه، modal، spinner، skeleton، خطا و وضعیت خالی
├── constants/              # ثابت‌های برنامه
├── types/                  # تعریف نوع پلی‌لیست
├── public/                 # فونت، تصویر، آیکون، داده قدیمی، SW و صفحه آفلاین
├── styles/globals.css      # سبک‌های سراسری و RTL
├── tests/                  # آزمون‌های Node
├── scripts/                # ابزارهای اعتبارسنجی و مهاجرت
├── reports/                # خروجی‌های ثبت‌شده بررسی‌ها و فهرست مسیرها
├── .env.example
├── next.config.mjs
├── eslint.config.mjs
├── postcss.config.mjs
├── jsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

گروه‌های `(public)` و `(private)` فقط برای سازمان‌دهی هستند و در URL ظاهر نمی‌شوند. نام مستعار `@/` به ریشه پروژه اشاره می‌کند.

| فناوری | نقش |
| --- | --- |
| Next.js `16.4.2`، React / React DOM `^19.2.0` | App Router، رندر سرور و رابط تعاملی |
| TanStack React Query `^5.90.10`، Axios `^1.13.2` | وضعیت درخواست‌ها و ارتباط با بک‌اند |
| Tailwind CSS `^4.1.17`، MUI `^7.3.6`، Emotion | سبک‌ها و اجزای رابط |
| Formik `^2.4.9`، Yup `^1.7.1` | فرم و اعتبارسنجی |
| Dropzone `6.0.0-beta.2`، react-easy-crop | آپلود و برش کاور |
| React Toastify، React Icons، Iconsax | اعلان و آیکون |
| Zustand | وضعیت بارگذاری؛ نشست ورود با store مبتنی بر `useSyncExternalStore` پیاده شده است. |
| ESLint، Node Test Runner، Playwright | تحلیل سورس، آزمون واحد و بررسی مرورگر |

نسخه‌های جدول مطابق بازه‌های `package.json` هستند؛ نسخه دقیق نصب با `package-lock.json` تعیین می‌شود.

<a id="routes"></a>

## مسیرها و دسترسی‌ها

| مسیر | کاربرد | دسترسی |
| --- | --- | --- |
| `/` | صفحه اصلی | عمومی، SSR |
| `/[username]` | صفحه کانال | عمومی، SSR |
| `/search/[q]` | جستجو | عمومی، SSR، noindex |
| `/v/[id]` | نمایش ویدیو | SSR عمومی؛ محتوای محدودشده پس از ورود |
| `/playlists/[playlistId]` | جزئیات پلی‌لیست | SSR عمومی؛ محتوای محدودشده پس از ورود |
| `/login` | ورود و ثبت‌نام | مهمان، noindex |
| `/dashboard` | داشبورد | کاربر واردشده |
| `/dashboard/channels` | مدیریت کانال‌ها | مدیر پلتفرم |
| `/dashboard/upload` | آپلود مدیر پلتفرم | مدیر پلتفرم |
| `/dashboard/playlists/[playlistId]` | جزئیات مدیریتی پلی‌لیست | کاربر واردشده |
| `/dashboard/videos` | مدیریت ویدیوها | مدیر پلتفرم |
| `/dashboard/videos/[id]` | ویرایش ویدیو | مدیر پلتفرم |
| `/dashboard/users` | مدیریت کاربران | مدیر پلتفرم |
| `/dashboard/categories` | مدیریت دسته‌بندی | مدیر پلتفرم |
| `/dashboard/user-upload` | آپلود کانال | مدیر کانال |
| `/dashboard/user-videos` | ویدیوهای کانال | مدیر کانال |
| `/dashboard/settings` | تنظیمات | مدیر کانال |
| `/user-dashboard` | داشبورد کاربر | نقش `user` |
| `/user-dashboard/create-channel` | ساخت کانال | نقش `user` |

مسیر مستقل `/dashboard/playlists` فعال نیست؛ وجود فایل‌های `DashboardPlaylists` و `PlaylistCard` به معنی داشتن آن URL نیست.

نقش‌های مورد انتظار بک‌اند `super_admin`، `admin` و `user` هستند. مقصد پیش‌فرض پس از ورود به‌ترتیب `/dashboard/channels`، `/dashboard/user-videos` و `/user-dashboard` است. در پیاده‌سازی فعلی، guard پلتفرم نقش‌های `user` و `admin` را هدایت می‌کند و allowlist صریح `super_admin` ندارد؛ نقش‌های ناشناخته باید در بک‌اند رد شوند. قواعد رابط در [`lib/auth-policy.js`](lib/auth-policy.js) و [`utils/auth.js`](utils/auth.js) قرار دارند.

<a id="backend"></a>

## بک‌اند و احراز هویت

### درخواست عمومی و خصوصی

[`lib/public-api.js`](lib/public-api.js) فقط درخواست ناشناس سرور می‌فرستد و cookie یا Authorization کاربر را به بک‌اند منتقل نمی‌کند. درخواست محتوای عمومی `cache: 'no-store'` و timeout برابر ۱۵ ثانیه دارد. تنها نگاشت عمومی نام کاربری به شناسه کانال برای ۳۰۰ ثانیه cache می‌شود.

در مرورگر، [`utils/axiosConfigNew.js`](utils/axiosConfigNew.js) از `NEXT_PUBLIC_API_BASE_URL` استفاده و توکن را به صورت `Authorization: Bearer ...` اضافه می‌کند. خطای 401 یا 403 در درخواست غیرورود/خروجِ دارای توکن، نشست را پاک می‌کند، cache درخواست‌ها را خالی می‌کند و کاربر را به ورود می‌فرستد؛ بنابراین 403 ناشی از نبود مجوز هم می‌تواند باعث خروج شود.

توکن و مشخصات نشست با کلیدهای `token`، `user_id`، `role`، `channel_id` و `name` در `sessionStorage` مرورگر ذخیره می‌شوند. سرور Next.js نشست HttpOnly برای این قرارداد ندارد. guard کلاینت پس از hydration وضعیت ورود را تعیین می‌کند؛ کنترل نهایی دسترسی و اعتبار توکن وظیفه بک‌اند است و `noindex` هم جایگزین احراز هویت نیست.

### قراردادهای اصلی API

این جدول نمای کلی endpointهای مصرف‌شده است. پیشوندی مثل `/api/` از آدرس محیطی می‌آید. جزئیات payload، پارامترها و پاسخ مرجع باید با کد [`services/`](services) و مستندات بک‌اند تطبیق داده شوند.

| حوزه | endpointهای شاخص |
| --- | --- |
| محتوای عمومی | `GET /landing/videos`، `GET /landing/channels`، `GET /search/{q}` |
| ورود و ثبت‌نام | `POST /auth/login`، `POST /auth/logout`، `POST /otp/send`، `POST /otp/check`، `PUT /user/complete-data` |
| ویدیو | `GET /video`، `GET /video/{channelId}`، `GET /video/show/{id}`، `POST /video/upload`، `POST /video/store-video[/{channelId}]`، `POST /video/update-video/{id}`، `DELETE /video/delete/{id}` |
| کانال | `GET /channel`، `GET /channel/show/{id}`، `POST /channel/create`، `PUT /channel/update/{id}`، `DELETE /channel/delete/{id}` |
| پروفایل | `GET /user/me`، `PUT /user/me`، `PUT /user/me-update-pass` |
| دسته‌بندی | `GET /categories`، `POST /categories`، `PUT /categories/{id}` |
| پلی‌لیست | `GET /play-list/index`، `GET /play-list/show/{id}`، `POST /play-list/create`، `POST /play-list/add/{playlistId}/{videoId}`، `POST /play-list/remove/{playlistId}/{videoId}` |

ساختار پاسخ‌های صفحه‌بندی در [`utils/pagination.js`](utils/pagination.js) یکسان‌سازی می‌شود؛ همه اسکریپت‌های آزمون به اندازه این ابزار انعطاف ندارند. فایل `public/data/videos.json` و ابزارهای localStorage در `services/api.js` بخشی از کد قبلی‌اند و جایگزین بک‌اند واقعی برای صفحات عمومی SSR نیستند.

### آپلود و شبکه

در [`components/VideoDropzone.jsx`](components/VideoDropzone.jsx)، آپلود به `/video/upload` مستقیماً از مرورگر انجام می‌شود: قطعه‌های `5 × 1024 × 1024` بایتی و حداکثر سه retry برای قطعه تنظیم شده‌اند. پس از دریافت مسیر موقت، اطلاعات ویدیو و کاور به endpoint ذخیره فرستاده می‌شود. بک‌اند باید قرارداد chunk، فایل multipart و مسیر موقت را پشتیبانی کند.

origin دامنه نهایی و محیط‌های آزمایشی باید در CORS بک‌اند مجاز باشند؛ به‌ویژه هدر Authorization و متدهای مورد استفاده. محدودیت حجم بدنه، timeout و فضای ذخیره‌سازی باید روی **بک‌اند و پروکسی مسیر آپلود** تنظیم شوند؛ تغییر پروکسی فرانت‌اند به‌تنهایی محدودیت آپلود مستقیم به API را رفع نمی‌کند. منابع ویدیو و تصویر هم باید از مرورگر قابل دسترسی و با HTTPS سازگار باشند.

<a id="seo-pwa"></a>

## SEO و PWA

- متادیتای عنوان، توضیح، canonical، Open Graph و Twitter در [`lib/seo.js`](lib/seo.js) و صفحه‌ها تولید می‌شود. زبان سند فارسی و جهت آن RTL است.
- اطلاعات کانال، ویدیو و پلی‌لیست عمومی از بک‌اند وارد metadata می‌شوند. `VideoObject` تنها با داده لازم، از جمله تاریخ واقعی قابل تبدیل، تولید می‌شود.
- `/sitemap.xml` به صورت پویا از ویدیوهای عمومی، کانال‌های دارای نام کاربری و پلی‌لیست‌های صراحتاً عمومی ساخته می‌شود. دسترسی آن به بک‌اند را نیز باید بررسی کرد؛ برای داده زیاد، این مسیر چندین درخواست API انجام می‌دهد.
- `/robots.txt` مسیرهای داشبورد، ورود و جستجو را منع می‌کند. صفحات مربوط noindex دارند و برای پنل‌ها و ورود، هدر `X-Robots-Tag` نیز در `next.config.mjs` تنظیم شده است.
- تنظیم `htmlLimitedBots: /.*/` تکمیل metadata پیش از body را برای همه user agentها فعال می‌کند؛ این انتخاب ممکن است زمان شروع پاسخ را افزایش دهد و باید در تغییرات بعدی آگاهانه بررسی شود.
- `/manifest.webmanifest`، آیکون‌ها، `/sw.js` و `/offline.html` زیرساخت PWA را فراهم می‌کنند. ثبت service worker فقط در production انجام می‌شود.
- service worker درخواست صفحه را ابتدا از شبکه می‌گیرد و در قطع ارتباط صفحه آفلاین را نشان می‌دهد. فایل‌های استاتیک هم‌مبدأ در مسیرهای `/_next/static/`، `/assets/` و `/icons/` cache می‌شوند؛ پاسخ HTML و API کاربر برای استفاده آفلاین ذخیره نمی‌شود و امکان تماشای آفلاین ویدیو پیاده نشده است.
- برای نصب PWA و امکانات وابسته به secure context از HTTPS استفاده کنید؛ localhost استثنای توسعه است. نمایش prompt نصب به مرورگر و سیستم‌عامل بستگی دارد.

<a id="deployment"></a>

## انتشار و استقرار

### تنظیمات مشترک انتشار

این برنامه به اجرای سرور Next.js نیاز دارد. خروجی فعلی static export نیست و بارگذاری صرف فایل‌ها روی GitHub Pages یا هاست استاتیک، مسیرهای SSR را اجرا نمی‌کند. Dockerfile، تنظیم PM2، سرویس systemd یا pipeline انتشار آماده در مخزن وجود ندارد؛ نمونه‌های زیر راهنمای ایجاد استقرارند و با ویرایش README اجرا نمی‌شوند.

| تنظیم | مقدار این پروژه |
| --- | --- |
| Repository | `mostafaabediniback/webshow` |
| Branch | `next-version` |
| Root directory | `.`؛ پوشه تو در توی `next/` وجود ندارد. |
| Install | `npm ci` |
| Build | `npm run build` |
| Start در سرور Node | `npm run start` |
| خروجی build | `.next/`؛ برای میزبان Next.js مقدار پیش‌فرض فریم‌ورک را حفظ کنید. |
| پورت پیش‌فرض | `3000` |
| متغیرها | دو مقدار عمومی API و سایت؛ آدرس داخلی API در صورت نیاز |

قبل از انتشار، دامنه API و سایت را تعیین و متغیرها را **قبل از build** وارد کنید. بک‌اند باید هم از شبکه سرور Next.js و هم از مرورگر کاربران قابل دسترس باشد. محیط staging باید تنظیمات و حساب‌های آزمایشی جدا داشته باشد.

### انتشار روی Vercel

1. مخزن `webshow` را وارد کنید و برنچ مورد نظر را `next-version` قرار دهید. برای انتشار production این نسخه، در تنظیمات پروژه از `Environments → Production → Branch Tracking` برنچ را روی `next-version` قرار دهید؛ اتصال پیش‌فرض مخزن ممکن است از `main` استفاده کند. [راهنمای رسمی اتصال Git و برنچ production](https://vercel.com/docs/git#production-branch).
2. Framework را Next.js و Root Directory را ریشه مخزن قرار دهید. Install Command برابر `npm ci` و Build Command برابر `npm run build` است؛ Output Directory را روی پیش‌فرض Next.js نگه دارید. [راهنمای تنظیم build](https://vercel.com/docs/builds/configure-a-build).
3. Node.js شاخه `24.x` را انتخاب کنید. متغیرهای محیطی را برای Production و در صورت نیاز Preview جدا تنظیم کنید؛ آدرس داخلی API فقط وقتی قابل استفاده است که از زیرساخت میزبان قابل دسترس باشد. [راهنمای متغیرهای محیطی](https://vercel.com/docs/environment-variables).
4. دامنه یا زیردامنه را به پروژه متصل و DNS و HTTPS را مطابق اطلاعات همان میزبان تکمیل کنید. `NEXT_PUBLIC_SITE_URL` باید مبدأ نهایی همان محیط باشد. برای هر hostname مجاز، CORS بک‌اند را هم تنظیم کنید.
5. Deploy کنید و بررسی‌های پذیرش پایین را روی URL نهایی انجام دهید. پس از تغییر متغیر عمومی، Redeploy همراه با build جدید لازم است.

حساب Vercel، پروژه میزبانی، DNS و گواهی دامنه از روی این مخزن قابل تشخیص نیستند؛ برای این موارد مقدار یا وضعیت انتشار فرض نشده است.

### انتشار روی VPS / سرور Linux

روی سروری با Node.js سازگار، npm، Git و دسترسی شبکه به بک‌اند، با کاربر سرویس و در مسیر مورد نظر:

```bash
git clone --branch next-version --single-branch https://github.com/mostafaabediniback/webshow.git
cd webshow
cp .env.example .env.local
# اکنون دامنه سایت و API واقعی را در .env.local وارد کنید.
npm ci
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

برای build وابستگی‌های توسعه هم لازم‌اند؛ پیش از build از نصب با `--omit=dev` استفاده نکنید. دستور `start` در مثال به localhost محدود شده تا reverse proxy ورودی عمومی را مدیریت کند.

پردازش را با مدیر سرویس سرور پایدار نگه دارید. نمونه systemd برای فایلی مثل `/etc/systemd/system/webshow.service`:

```ini
[Unit]
Description=Webshow Next.js
After=network.target

[Service]
Type=simple
User=webshow
WorkingDirectory=/srv/webshow
Environment=NODE_ENV=production
ExecStart=/usr/bin/npm run start -- --hostname 127.0.0.1 --port 3000
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

این نمونه فرض می‌کند کاربر `webshow` از قبل ساخته شده، پروژه در `/srv/webshow` قرار دارد و کاربر سرویس دسترسی لازم به سورس، `.env.local`، وابستگی‌ها و cache در `.next/` دارد. مسیر واقعی npm را با `command -v npm` بررسی کنید؛ در نصب‌های NVM باید PATH و مسیر Node/npm برای systemd صریحاً تنظیم شوند، چون محیط shell تعاملی خودکار بارگذاری نمی‌شود.

پس از ایجاد سرویس مطابق ساختار سرور:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now webshow
sudo systemctl status webshow
journalctl -u webshow -f
```

نمونه reverse proxy اولیه Nginx؛ دامنه فرضی است و تنظیم گواهی HTTPS باید جداگانه تکمیل شود:

```nginx
server {
    listen 80;
    server_name video.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
    }
}
```

با `sudo nginx -t` تنظیمات را بررسی و سپس reload کنید. برای دامنه نهایی گواهی TLS و هدایت HTTP به HTTPS را در reverse proxy یا زیرساخت میزبان فعال کنید. cache عمومی اجباری برای HTML پنل‌ها و پاسخ API تعریف نکنید و هدرهای cache خود Next.js را حفظ کنید. `/sw.js` در تنظیم پروژه `Cache-Control: no-cache` دارد.

### انتقال build، به‌روزرسانی و بازگشت

در استقرار فعلی `output: 'standalone'` فعال نیست. برای انتقال خروجی ساخته‌شده، `.next/`، `public/`، فایل‌های پیکربندی و package، وابستگی‌های runtime سازگار با سیستم مقصد و متغیرهای محیطی لازم‌اند؛ آپلود `.next/` به‌تنهایی کافی نیست. نصب یا build ساخته‌شده روی Windows را به عنوان وابستگی قابل حمل Linux فرض نکنید.

برای انتشار بعدی، commit مورد نظر برنچ را در یک پوشه release جدا دریافت کنید، متغیرهای همان محیط را وارد کنید، `npm ci` و بررسی‌ها و build را اجرا کنید و پس از موفقیت، سرویس را به release جدید متصل و restart کنید. اجرای `npm run build` روی همان `.next/` که سرور زنده از آن سرویس می‌دهد می‌تواند سرویس را مختل کند. commit، تنظیمات محیط و خروجی release قبلی را نگه دارید تا با بازگرداندن release و restart امکان rollback باشد. اگر متغیر عمومی تغییر کرده، rollback باید build سازگار با همان متغیرها را برگرداند.

### پذیرش انتشار

- صفحه اصلی، یک کانال با URL مستقیم، یک ویدیو عمومی و یک پلی‌لیست عمومی را در دسکتاپ و موبایل باز کنید.
- canonical و URLهای sitemap را بررسی کنید؛ نباید به localhost یا دامنه محیط دیگر اشاره کنند.
- `/robots.txt`، `/sitemap.xml`، `/manifest.webmanifest` و `/sw.js` را از دامنه نهایی بررسی کنید.
- نام کاربری و ویدیوی ناموجود باید پاسخ 404 بدهند و مسیرهای خصوصی برای مهمان به ورود هدایت شوند.
- درخواست API، CORS، HTTPS، تصویر و پخش ویدیو را از مرورگر واقعی بررسی کنید.
- در staging با هر سه نقش ورود، خروج، OTP، محدودیت دسترسی، آپلود، ویرایش، حذف و تغییر رمز را بررسی کنید.
- نصب PWA، تغییر کیفیت، دانلود طولانی و اشتراک‌گذاری را روی دستگاه و داده مناسب بررسی کنید.
- خطاهای برنامه، لاگ بک‌اند و مصرف منابع sitemap و آپلود را پس از انتشار پایش کنید.

<a id="verification"></a>

## آزمون و اعتبارسنجی

### بررسی‌های مستقل مخزن

```bash
npm run lint
npm test
npm run build
```

آزمون واحد به حساب یا بک‌اند زنده نیاز ندارد. پنج آزمون موجود ماتریس نقش‌ها، پاسخ‌های صفحه‌بندی، canonical و JSON-LD، پارامترهای فارسی/درصد و وجود ۱۹ مسیر را بررسی می‌کنند. تست واحد تأیید کامل پنل‌های مدیریتی یا آپلود نیست.

### بررسی HTTP / SSR

سرور production را در یک ترمینال اجرا و در ترمینال دوم دستور زیر را اجرا کنید:

```bash
npm run test:routes
```

`scripts/check-routes.mjs` از `NEXT_PUBLIC_API_BASE_URL` در محیط پردازش یا مقدار ساده آن در `.env.local` استفاده می‌کند و سرور را خودش راه نمی‌اندازد. برای پورت دیگر در PowerShell:

```powershell
$env:TEST_BASE_URL = 'http://localhost:3011'
npm run test:routes
```

در Linux / macOS:

```bash
TEST_BASE_URL=http://localhost:3011 npm run test:routes
```

این بررسی فقط خواندنی است، اما به داده واقعی نیاز دارد: ویدیوی عمومی و کانال دارای `username` و پاسخ فهرست به شکل مورد انتظار اسکریپت. بررسی پلی‌لیست عمومی در صورت یافتن نمونه انجام می‌شود. پاسخ API خالی یا تغییر ساختار آن می‌تواند خود اسکریپت را متوقف کند. نتیجه در `reports/routes-validation.json` نوشته می‌شود؛ اجرای مجدد گزارش قبلی را جایگزین می‌کند.

### بررسی مرورگر و ابزارهای مهاجرت

`node scripts/browser-check.mjs` از Playwright با `channel: 'chrome'` استفاده می‌کند؛ Chrome باید روی دستگاه نصب باشد. این اسکریپت برای بررسی رابط و SSR با JavaScript خاموش به سرور برنامه و داده عمومی نیاز دارد و بخشی از آن نسخه اصلی Vite را در `http://127.0.0.1:4173` انتظار دارد. آن نسخه در برنچ مستقل حاضر وجود ندارد، بنابراین اجرای کامل مقایسه تصویری از یک کلون تازه به‌تنهایی ممکن نیست. شناسه‌هایی مثل پلی‌لیست `15` نیز در این اسکریپت ثابت‌اند و برای محیط دیگر باید با fixture مناسب جایگزین شوند. تصاویر در `reports/browser/` و گزارش در `reports/browser-validation.json` نوشته می‌شوند.

`npm run verify:original` ابزار تاریخی مقایسه SHA-256 سورس پروژه Vite با `reports/original-files.json` است. ساختار قدیمی شامل پوشه `next/` داخل پروژه Vite را فرض می‌کند؛ برای اعتبارسنجی مخزن مستقل یا پذیرش انتشار از آن استفاده نکنید.

`node scripts/probe-api.mjs` اطلاعات ساختاری پاسخ چند endpoint عمومی را چاپ می‌کند و مستقیماً `.env.local` را می‌خواند. parser فعلی اسکریپت‌های خواندن این فایل، مقدار تک‌خطی بدون کوتیشن برای `NEXT_PUBLIC_API_BASE_URL` را انتظار دارد؛ فایل نمونه نیز همین قالب را دارد.

### شواهد ثبت‌شده پیش از مستقل‌شدن مخزن

گزارش مهاجرت مورخ **۱۹ اکتبر ۲۰۲۶** نتایج زیر را ثبت کرده است. این نتایج مربوط به همان محیط، داده و نسخه زمان بررسی‌اند و تأیید اجرای جدید یا وضعیت میزبان فعلی نیستند:

| بررسی تاریخی | نتیجه ثبت‌شده |
| --- | --- |
| build و اجرای production | موفق؛ جزئیات در `reports/build-output.txt` |
| lint نسخه Next.js | صفر خطا و ۵۹ هشدار؛ `reports/lint.json` و `reports/lint-output.txt` |
| آزمون واحد | پنج آزمون موفق؛ `reports/unit-tests.txt` |
| HTTP / SSR | ۲۵ بررسی موفق؛ `reports/routes-validation.json` |
| مرورگر | فرم و guard مهمان، فیلتر، player، RTL، موبایل، modal و رندر عمومی بدون JavaScript؛ `reports/browser-validation.json` |
| خطای مرورگر | در اجرای نهایی تاریخی، خطای JavaScript، hydration یا console ثبت نشده است. |
| حفظ پروژه Vite در زمان مهاجرت | ۱۸۲ فایل با SHA-256 بدون تغییر؛ `reports/original-files.json` |

تصاویر مقایسه و build نسخه Vite در `reports/browser/` و `reports/baseline-dist/` توسط Git نادیده گرفته می‌شوند و در کلون تازه موجود نیستند. حساب آزمایشی سه نقش در بررسی تاریخی ارائه نشده بود؛ ورود واقعی، ارسال OTP، آپلود، ویرایش/حذف، تغییر رمز و تنظیمات انتهابه‌انتها تأیید نشده‌اند. کیفیت‌های چندگانه، دانلود کامل، نصب واقعی PWA و رفتار iOS نیز به آزمون جداگانه نیاز دارند. امتیاز Lighthouse یا Core Web Vitals میدانی ثبت نشده است.

<a id="troubleshooting"></a>

## عیب‌یابی

| نشانه | موارد بررسی |
| --- | --- |
| خطای نبود آدرس API یا شکست SSR | وجود `.env.local` در ریشه، مقدار واقعی API، پیشوند `/api/`، دسترسی شبکه سرور و restart پس از تغییر محیط. |
| API روی سرور کار می‌کند ولی مرورگر خطا می‌دهد | آدرس عمومی، CORS و preflight، هدر Authorization، گواهی TLS و mixed content. آدرس داخلی Docker برای مرورگر قابل استفاده نیست. |
| canonical یا sitemap به localhost اشاره دارد | `NEXT_PUBLIC_SITE_URL` را روی مبدأ نهایی تنظیم و build و انتشار مجدد کنید. |
| بعد از تغییر env هنوز API قبلی مصرف می‌شود | متغیرهای عمومی داخل build قرار دارند؛ فقط restart کافی نیست. متغیرهای پنل میزبان یا محیط پردازش با اولویت بالاتر را هم بررسی کنید. |
| خروج ناگهانی از حساب | پاسخ 401/403 API و اعتبار/مجوز توکن را بررسی کنید؛ interceptor فعلی هر دو وضعیت را برای نشست موجود مدیریت می‌کند. |
| خطای 413 یا قطع آپلود | محدودیت بدنه و timeout روی بک‌اند و پروکسی API، پشتیبانی chunk، Authorization و پاسخ `/video/upload`. |
| کانال تازه با username پیدا نمی‌شود | داده `/landing/channels`، پاسخ جزئیات کانال و cache نگاشت پنج‌دقیقه‌ای را بررسی کنید. |
| PWA نصب نمی‌شود | HTTPS، manifest، آیکون‌ها و اجرای production؛ service worker در `dev` ثبت نمی‌شود. پشتیبانی نصب بین مرورگرها متفاوت است. |
| ظاهر قدیمی پس از انتشار | cache مرورگر و service worker را بررسی کنید؛ برای فایل‌های استاتیک با نام ثابت، نسخه cache در `public/sw.js` ممکن است نیاز به افزایش داشته باشد. |
| `next start` خروجی production را پیدا نمی‌کند | در همان release با همان تنظیمات `npm run build` را اجرا و حضور `.next/` را بررسی کنید. |
| `verify:original` یا مقایسه مرورگر شکست می‌خورد | این ابزارها به پروژه اصلی Vite وابسته‌اند؛ کلون مستقل آن را ندارد. |
| فایل `AGENTS.md` دوباره ایجاد می‌شود | Next.js نصب‌شده ممکن است هنگام `next dev` و تشخیص ابزار هوش مصنوعی این فایل راهنما را خودکار تولید کند؛ حذف آن قابلیت تولید خودکار فریم‌ورک را غیرفعال نمی‌کند. |

<a id="maintenance"></a>

## نگهداری و محدودیت‌های فعلی

- پروژه در ابتدا با حفظ رفتار نسخه React/Vite منتقل شده است؛ فایل‌های runtime به سورس قدیمی بیرون مخزن وابسته نیستند. ابزارهای مقایسه تاریخی از این قاعده مستقل‌اند و محدودیتشان بالاتر آمده است.
- برای افزودن صفحه، مسیر را در `app/` تعریف کنید؛ منطق تعاملی را در `features/` و `components/`، درخواست را در `services/` و hook را در `hooks/` قرار دهید. ابزارهای عمومی سرور در `lib/` باید بدون داده شخصی مشترک باقی بمانند.
- دسترسی به `window`، `sessionStorage`، File API و uploader باید در مرز کلاینت و زمان مناسب انجام شود. فایل‌های [`lib/navigation.jsx`](lib/navigation.jsx) و [`lib/route-params.js`](lib/route-params.js) سازگاری navigation و پارامترهای مسیر را مدیریت می‌کنند.
- بعد از تغییر مسیرها، `reports/routes.json` و جدول مسیرهای این README و آزمون پوشش مسیرها را هماهنگ کنید.
- هشدارهای lint تاریخی عمدتاً از متغیرهای استفاده‌نشده، وابستگی effect و alt تصاویر آمده‌اند. برخی قواعد جدید React Compiler برای فرم‌ها و پلیرهای imperative به صورت محدود در `eslint.config.mjs` غیرفعال‌اند؛ این تنظیمات را هنگام بازنویسی آن اجزا دوباره بررسی کنید.
- در تغییر فایل‌های استاتیک با نام ثابت، سیاست cache و نسخه service worker را هم بازبینی کنید. نصب PWA جایگزین تست موبایل و رفتار شبکه ضعیف نیست.
- فایل‌های واقعی `.env*`، `node_modules/`، `.next/` و خروجی‌های حجیم بررسی در Git قرار نمی‌گیرند. فقط `.env.example` با مقدار نمونه نگهداری می‌شود.
- راهنمای نسخه نصب‌شده Next.js داخل `node_modules/next/dist/docs/` موجود است. پیش از تغییر APIها و قراردادهای فریم‌ورک، به همان راهنما و deprecationهای آن مراجعه کنید.
- مجوز بازنشر در فایل `LICENSE` این مخزن تعریف نشده است؛ مقدار `private: true` در package مانع publish تصادفی با npm می‌شود و خود یک مجوز نرم‌افزاری نیست.

این README مرجع مستندات پروژه است؛ محتوای مفید گزارش مهاجرت در آن ادغام شده و فایل‌های Markdown اضافی پروژه حذف شده‌اند.
