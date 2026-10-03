import { Add, ArrowDown2, CloseCircle, Home2, Mobile, Share } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import usePwaInstall from "../hooks/pwa/usePwaInstall";

export default function PwaInstallPrompt() {
  const {
    isOpen, isIos, isInstalling, installError,
    install, postpone, dismissForever,
  } = usePwaInstall();
  const [showInstructions, setShowInstructions] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInstall = () => {
    if (installError || showInstructions) postpone();
    else if (isIos) setShowInstructions(true);
    else install();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby="pwa-install-title"
      aria-describedby="pwa-install-description"
      onCancel={(event) => { event.preventDefault(); postpone(); }}
      onClick={(event) => { if (event.target === event.currentTarget) postpone(); }}
      className="scrollbar-hide fixed inset-x-0 bottom-0 top-auto m-0 max-h-[90dvh] w-full max-w-none overflow-y-auto rounded-t-[28px] border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm sm:inset-0 sm:m-auto sm:w-[calc(100%-2rem)] sm:max-w-md sm:rounded-[28px]"
    >
      <div dir="rtl">
        <div className={`relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 text-center ${showInstructions ? "py-5" : "pb-7 pt-8"}`}>
          <div aria-hidden="true" className="pointer-events-none absolute -left-10 -top-16 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-8 h-48 w-48 rounded-full bg-amber-300/15 blur-3xl" />
          <button
            type="button"
            onClick={postpone}
            aria-label="بستن پیشنهاد نصب"
            className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <CloseCircle size={23} color="currentColor" />
          </button>
          <div className={`relative mx-auto w-fit ${showInstructions ? "mb-2" : "mb-4"}`}>
            <div className="rounded-[25px] border border-white/20 bg-white/10 p-2 shadow-xl backdrop-blur">
              <img src="/icons/app-icon-192-v2.png" width="80" height="80" alt="اربعین تی وی" className={`rounded-[18px] bg-white object-contain ${showInstructions ? "h-16 w-16" : "h-20 w-20"}`} />
            </div>
            <span aria-hidden="true" className="absolute -bottom-1 -right-2 grid h-8 w-8 place-items-center rounded-full border-4 border-slate-900 bg-amber-400 text-slate-950">
              <Add size={19} color="currentColor" />
            </span>
          </div>
          <span className="relative inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-indigo-100">
            نسخهٔ وب‌اپ اربعین‌تی‌وی
          </span>
        </div>

        <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
          <h2 id="pwa-install-title" className="text-center text-xl font-extrabold leading-9">
            یک لمس تا اربعین‌تی‌وی
          </h2>
          <p id="pwa-install-description" className="mt-2 text-center text-sm leading-7 text-slate-500">
            به صفحهٔ اصلی اضافه کنید و هر بار، راحت‌تر به کانال‌ها و ویدیوها برسید.
          </p>

          {showInstructions ? (
            <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
              <ol className="space-y-3 text-sm leading-7 text-slate-700">
                <li className="flex items-start gap-3"><Share size={20} color="currentColor" className="mt-1 shrink-0 text-indigo-600" /><span>منوی مرورگر را باز کنید و «اشتراک‌گذاری» (Share) را بزنید.</span></li>
                <li className="flex items-start gap-3"><Add size={20} color="currentColor" className="mt-1 shrink-0 text-indigo-600" /><span>گزینهٔ «افزودن به صفحهٔ اصلی» (Add to Home Screen) را انتخاب کنید.</span></li>
                <li className="flex items-start gap-3"><Home2 size={20} color="currentColor" className="mt-1 shrink-0 text-indigo-600" /><span>اگر «Open as Web App» نمایش داده شد، آن را روشن بگذارید و «Add» را بزنید.</span></li>
              </ol>
              <p className="mt-3 text-xs leading-6 text-slate-500">اگر این گزینه را نمی‌بینید، همین صفحه را در Safari باز کنید.</p>
            </div>
          ) : installError ? (
            <p role="alert" className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm leading-7 text-amber-900">
              پنجرهٔ نصب باز نشد. از منوی مرورگر، گزینهٔ «نصب برنامه» یا «افزودن به صفحهٔ اصلی» را انتخاب کنید.
            </p>
          ) : (
            <div className="my-5 grid grid-cols-2 gap-2">
              <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-2 py-3 text-xs font-medium text-slate-600"><Home2 size={18} color="currentColor" className="text-indigo-500" />روی صفحهٔ اصلی</div>
              <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-2 py-3 text-xs font-medium text-slate-600"><Mobile size={18} color="currentColor" className="text-indigo-500" />بدون نوار مرورگر</div>
            </div>
          )}

          <button
            type="button"
            onClick={handleInstall}
            disabled={isInstalling}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {showInstructions || installError ? "متوجه شدم" : isIos ? "راهنمای افزودن به صفحهٔ اصلی" : "نصب نسخهٔ وب‌اپ"}
            {!showInstructions && !installError && <ArrowDown2 size={18} color="currentColor" />}
          </button>
          <button type="button" onClick={postpone} className="mt-2 h-11 w-full rounded-xl text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
            بعداً
          </button>
          <button type="button" onClick={dismissForever} className="mx-auto mt-1 block rounded-lg px-3 py-2 text-xs text-slate-400 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
            دیگر نمایش نده
          </button>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
