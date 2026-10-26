"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { Spinner } from '@/ui';
import { authRedirect } from '@/lib/auth-policy';

export default function AuthGuard({ children, access = 'authenticated' }) {
  const auth = useAuthStore();
  const ready = auth.hydrated;
  const router = useRouter();
  const target = authRedirect(auth, access);
  useEffect(() => { if (ready && target) router.replace(target); }, [ready, target, router]);
  if (!ready || target) return <div className="flex min-h-[60vh] items-center justify-center" aria-label="در حال بررسی نشست"><Spinner /></div>;
  return children;
}
