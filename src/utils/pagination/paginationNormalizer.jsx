export const paginationNormalizer = (backendPagination = {}) => {
  return {
    currentPage: backendPagination.currentPage || 1,
    totalPages: backendPagination.totalPages || 1,
    totalItems:
      backendPagination.totalLeads ||
      backendPagination.tasksPerPage ||
      backendPagination.totalInvoice ||
      backendPagination.totalItems ||
      backendPagination.count ||
      0,
    limit: backendPagination.limit || 10,
  };
};
  