const TopSalesRegions = () => {
  const regions = [
    { name: 'Yaba', value: 15642 },
    { name: 'Island', value: 11048 },
    { name: 'Ikorodu', value: 9215 },
    { name: 'Shomolu', value: 8374 },
    { name: 'Lekki', value: 7983 },
  ];

  const maxValue = Math.max(...regions.map(region => region.value));

  return (
    <div className="bg-white p-4 rounded-md shadow-sm w-full">
      <h2 className="font-semibold text-lg mb-4 text-[#1A1C21]">Top Sales Regions</h2>
      <div className="space-y-4">
        {regions.map((region) => (
          <div key={region.name}>
            <div className="flex justify-between text-sm font-medium mb-1 text-[#1A1C21]">
              <span>{region.name}</span>
              <span>{region.value.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-700 rounded-full"
                style={{ width: `${(region.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSalesRegions;
