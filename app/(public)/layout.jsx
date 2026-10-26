import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PublicFrame from '@/components/PublicFrame';
import { Suspense } from 'react';
export default function PublicLayout({ children }) { return <PublicFrame navbar={<Suspense><Navbar /></Suspense>} footer={<Footer />}>{children}</PublicFrame>; }
