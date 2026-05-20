import React from 'react';

/**
 * Base Skeleton primitive
 * @param {Object} props
 * @param {string} props.className - Tailwind classes for size and shape
 */
const Skeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gradient-to-br from-slate-200 to-slate-300 rounded ${className}`} />
  );
};

/**
 * Pre-defined Video Card Skeleton
 */
export const VideoCardSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-video rounded-xl" />
      <div className="flex gap-3">
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
