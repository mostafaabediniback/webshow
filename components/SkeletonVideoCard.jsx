import React from 'react';

const SkeletonVideoCard = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-video rounded-xl bg-gradient-to-br from-gray-200 to-gray-300" />
      <div className="mt-3 flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonVideoCard;
