import VideoSkeleton from '@/components/VideoSkeleton';
export default function Loading() { return <div className="mx-auto max-w-7xl p-6" role="status" aria-label="در حال بارگذاری"><VideoSkeleton count={12} /></div>; }
