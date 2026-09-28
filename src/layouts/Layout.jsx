import { useLayoutEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout({ children }) {
  const layoutRef = useRef(null);
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const layout = layoutRef.current;
    const footer = footerRef.current;
    const updateFooterHeight = () => {
      layout.style.setProperty(
        "--footer-height",
        `${footer.getBoundingClientRect().height}px`,
      );
    };

    updateFooterHeight();
    const observer = new ResizeObserver(updateFooterHeight);
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={layoutRef} className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full pb-[var(--footer-height,6rem)]">{children}</main>
      <div ref={footerRef} className="fixed bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
