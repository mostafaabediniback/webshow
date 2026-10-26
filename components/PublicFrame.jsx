"use client";
import { useLayoutEffect, useRef } from 'react';
export default function PublicFrame({ children, navbar, footer }) {
  const layoutRef = useRef(null);
  const footerRef = useRef(null);
  useLayoutEffect(() => {
    const update = () => layoutRef.current?.style.setProperty('--footer-height', `${footerRef.current?.getBoundingClientRect().height || 0}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={layoutRef} className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 flex flex-col">
    {navbar}<main className="flex-1 w-full pb-[var(--footer-height,6rem)]">{children}</main><div ref={footerRef} className="fixed bottom-0 left-0 w-full">{footer}</div>
  </div>;
}
