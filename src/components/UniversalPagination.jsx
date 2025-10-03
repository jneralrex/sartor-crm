const UniversalPagination = ({ pagination, onPageChange }) => {
  if (!pagination) return null; 

  const { currentPage = 1, totalPages = 1 } = pagination;

  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default UniversalPagination;
