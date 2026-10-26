"use client";

import NextLink from 'next/link';
import { useParams as useNextParams, usePathname, useRouter, useSearchParams as useNextSearchParams } from 'next/navigation';
import { forwardRef, useCallback, useMemo } from 'react';

// A small migration adapter keeps the established `to`/navigate call sites;
// all routing and history are owned by the Next.js App Router.
export const Link = forwardRef(function Link({ to, state: _state, replace, children, ...props }, ref) {
  return <NextLink ref={ref} href={to || '/'} replace={replace} {...props}>{children}</NextLink>;
});
export const useParams = useNextParams;
export function useNavigate() {
  const router = useRouter();
  return useCallback((to, options = {}) => {
    if (typeof to === 'number') {
      if (to === -1) router.back();
      else if (to === 1) router.forward();
      else if (to === 0) router.refresh();
      return;
    }
    if (options.replace) router.replace(to, { scroll: options.scroll });
    else router.push(to, { scroll: options.scroll });
  }, [router]);
}
export function useLocation() {
  const pathname = usePathname();
  const searchParams = useNextSearchParams();
  const search = searchParams.toString();
  return useMemo(() => ({ pathname, search: search ? `?${search}` : '', state: null }), [pathname, search]);
}
export function useSearchParams() {
  const params = useNextSearchParams();
  const pathname = usePathname();
  const navigate = useNavigate();
  const setParams = useCallback((value, options) => {
    const next = new URLSearchParams(typeof value === 'function' ? value(new URLSearchParams(params)) : value);
    navigate(`${pathname}${next.size ? `?${next}` : ''}`, options);
  }, [params, pathname, navigate]);
  return [params, setParams];
}
