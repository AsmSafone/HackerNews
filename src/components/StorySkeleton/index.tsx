import React from 'react';

export const StorySkeleton: React.FC = () => {
  return (
    <div className="matrix-bg p-4 rounded animate-pulse">
      <div className="h-6 bg-[#002200] rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-[#002200] rounded w-24 mb-3"></div>
      <div className="h-8 bg-[#002200] rounded w-20"></div>
    </div>
  );
};