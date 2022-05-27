import { useState } from "react";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (event, value) => {
    setCurrentPage(value - 1);
  };

  const calculateLastPage = (data) => {
    return Math.ceil(data.total / data.limit);
  };

  return {
    currentPage,
    handlePageChange,
    calculateLastPage,
  };
};
