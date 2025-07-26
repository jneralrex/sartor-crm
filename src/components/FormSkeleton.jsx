import React from 'react';

const SkeletonBox = ({ height = 'h-10', width = 'w-full', className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${height} ${width} ${className}`} />
);

const FormSkeleton = () => {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
        <div className="flex justify-between items-center mb-5">
          <SkeletonBox width="w-2/3" height="h-6" />
          <SkeletonBox width="w-5" height="h-5" />
        </div>

        <div className="flex flex-col gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx}>
              <SkeletonBox width="w-1/2" height="h-4" className="mb-2" />
              <SkeletonBox height="h-12" />
            </div>
          ))}

          <SkeletonBox height="h-12" />
        </div>
      </div>
    </div>
  );
};

export default FormSkeleton;
