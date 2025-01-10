import React from 'react';

export const StorySkeleton: React.FC = () => {
  return (
    <div className="matrix-bg p-4 rounded animate-pulse">
      <div className="h-6 bg-[#002200] rounded w-3/4 mb-4"></div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-4 bg-[#002200] rounded w-12"></div>
          <div className="h-4 bg-[#002200] rounded w-12"></div>
          <div className="h-4 bg-[#002200] rounded w-16"></div>
        </div>
        <div className="h-7 bg-[#002200] rounded w-20"></div>
      </div>
    </div>
  );
};