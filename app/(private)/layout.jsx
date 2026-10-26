import { Suspense } from 'react';
export const metadata = { robots: { index: false, follow: false } };
export default function PrivateLayout({ children }) { return <Suspense>{children}</Suspense>; }
