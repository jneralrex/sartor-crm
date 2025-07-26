const EmployeeSkeletonRow = () => (
  <tr className="animate-pulse border-b">
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-6"></div></td>
    <td className="px-4 py-3 flex items-center gap-2">
      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
        <div className="h-3 bg-gray-100 rounded w-20"></div>
      </div>
    </td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
  </tr>
);

export default EmployeeSkeletonRow;
