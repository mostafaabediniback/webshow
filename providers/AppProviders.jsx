"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import GlobalLoading from '@/components/GlobalLoading';
import { hydrateAuthStore } from '@/store/useAuthStore';

const PwaInstallPrompt = dynamic(() => import('@/components/PwaInstallPrompt'), { ssr: false });

export default function AppProviders({ children }) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } }));
  const router = useRouter();
  useEffect(() => {
    hydrateAuthStore();
    const unauthorized = () => {
      client.clear();
      hydrateAuthStore();
      router.replace('/login');
    };
    const changed = () => hydrateAuthStore();
    window.addEventListener('auth:unauthorized', unauthorized);
    window.addEventListener('storage', changed);
    // Do not cache authenticated HTML or API responses in the service worker.
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(error => console.error('Service worker registration failed', error));
    }
    return () => {
      window.removeEventListener('auth:unauthorized', unauthorized);
      window.removeEventListener('storage', changed);
    };
  }, [client, router]);
  return <QueryClientProvider client={client}>
    {children}
    <PwaInstallPrompt />
    <GlobalLoading />
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover theme="colored" limit={3} />
  </QueryClientProvider>;
}
