import React from 'react';

const VehicleTable = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-600 mb-8">We're working on something amazing. Stay tuned!</p>
        <div className="animate-pulse text-2xl font-bold text-gray-800">🚧</div>
      </div>
    </div>
  );
};

export default VehicleTable;
