import React from 'react';

const SkeletonBox = ({ width = 'w-full', height = 'h-5' }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${width} ${height}`} />
);

const DetailsSkeleton = () => {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
        <div className='flex items-center justify-between mb-4'>
          <SkeletonBox width="w-1/2" height="h-6" />
          <SkeletonBox width="w-5" height="h-5" />
        </div>

        <div className="grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <SkeletonBox width="w-24" height="h-4" />
              <SkeletonBox width="w-28" height="h-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
