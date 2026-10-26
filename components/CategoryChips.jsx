import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@/lib/navigation";

function CategoryChips({ channels, activeChannelId, onSelect }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [scrollEdges, setScrollEdges] = useState({ left: false, right: false });

  const list = Array.isArray(channels) ? channels : channels ? [channels] : [];

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateScrollEdges = () => {
      const maxScroll = Math.max(0, element.scrollWidth - element.clientWidth);
      const isRtl = window.getComputedStyle(element).direction === "rtl";
      const min = isRtl ? -maxScroll : 0;
      const max = isRtl ? 0 : maxScroll;
      const current = Math.min(max, Math.max(min, element.scrollLeft));
      const left = current > min + 1;
      const right = current < max - 1;

      setScrollEdges((previous) =>
        previous.left === left && previous.right === right
          ? previous
          : { left, right },
      );
    };

    const observer = new ResizeObserver(updateScrollEdges);
    observer.observe(element);
    element.addEventListener("scroll", updateScrollEdges, { passive: true });

    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", updateScrollEdges);
    };
  }, [list.length]);

  const scrollChannels = (direction) => {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollBy({
      left: direction * element.clientWidth * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const scrollButtonClassName =
    "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/80 bg-white/40 text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_14px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60 backdrop-blur-xl transition-all duration-200 hover:bg-white/95 hover:text-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:ring-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 active:scale-95 disabled:pointer-events-none disabled:opacity-25 disabled:shadow-none md:flex";

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleWheel = (event) => {
      if (
        event.ctrlKey || event.metaKey || event.shiftKey ||
        event.deltaX !== 0 || event.deltaY === 0 || !event.cancelable
      ) return;

      const maxScroll = Math.max(0, element.scrollWidth - element.clientWidth);
      const isRtl = window.getComputedStyle(element).direction === "rtl";
      const min = isRtl ? -maxScroll : 0;
      const max = isRtl ? 0 : maxScroll;
      const current = Math.min(max, Math.max(min, element.scrollLeft));
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1;
      const delta = event.deltaY * unit * (isRtl ? -1 : 1);
      const next = Math.min(max, Math.max(min, current + delta));

      if (next === current) return;

      event.preventDefault();
      element.scrollLeft = next;
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="relative w-full md:px-12">
      <button
        type="button"
        aria-label="اسکرول کانال‌ها به راست"
        title="کانال‌های سمت راست"
        disabled={!scrollEdges.right}
        onClick={() => scrollChannels(1)}
        className={`${scrollButtonClassName} right-0`}
      >
        <ArrowRight2 size={18} color="currentColor" aria-hidden="true" />
      </button>
    <div
      ref={scrollRef}
      role="region"
      aria-label="فهرست کانال‌ها"
      tabIndex={0}
      className="flex w-full flex-nowrap gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden p-2 scrollbar-hide"
    >
      {" "}
      <button
        onClick={() => onSelect(null)}
        className={`flex flex-col items-center gap-2 flex-shrink-0 transition-all duration-200 ${
          activeChannelId === null
            ? "scale-105"
            : "opacity-75 hover:opacity-100 hover:scale-[1.02]"
        }`}
      >
        <div
          onClick={() => navigate("/")}
          className={`w-16 h-16 rounded-[10px] overflow-hidden border-2 shadow-sm flex items-center justify-center transition-all duration-200 ${
            activeChannelId === null
              ? "border-indigo-500 bg-indigo-50"
              : "border-slate-200 bg-slate-100 hover:border-slate-300"
          }`}
        >
          <span
            className={`text-sm font-medium ${activeChannelId === null ? "text-indigo-600" : "text-slate-600"}`}
          >
            همه
          </span>
        </div>
        {/* <span className={`text-xs font-medium truncate max-w-[56px] ${activeChannelId === null ? 'text-slate-900' : 'text-slate-600'}`}>
          همه
        </span> */}
      </button>
      {list.map((channel) => {
        const isActive = activeChannelId == channel.id;

        return (
          <button
            key={channel.id}
            onClick={() => onSelect(channel.id)}
            className={`flex flex-col items-center gap-2 flex-shrink-0 transition-all duration-200 
              //${isActive ? "scale-105" : "opacity-75 hover:opacity-100 hover:scale-[1.02]"}//
              `}
          >
            <div
              onClick={() => navigate("/")}
              className={`w-16 h-16 rounded-[10px] overflow-hidden border-2 shadow-sm transition-all duration-200 ${
                isActive
                  ? "border-indigo-500 ring-2 ring-indigo-200"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <img
                src={channel.image}
                alt={channel.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* <span className={`text-xs font-medium truncate max-w-[56px] ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
              {channel.name}
            </span> */}
          </button>
        );
      })}
    </div>
      <button
        type="button"
        aria-label="اسکرول کانال‌ها به چپ"
        title="کانال‌های سمت چپ"
        disabled={!scrollEdges.left}
        onClick={() => scrollChannels(-1)}
        className={`${scrollButtonClassName} left-0`}
      >
        <ArrowLeft2 size={18} color="currentColor" aria-hidden="true" />
      </button>
    </div>
  );
}

export default CategoryChips;
