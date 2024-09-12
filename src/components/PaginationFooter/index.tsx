import { params } from '@/models/paramModel';
import { useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationFooterProps {
  params: params;
  handleChangePage?: () => void;
}

const PaginationFooter = ({
  params,
  handleChangePage,
}: PaginationFooterProps) => {
  const { currentPage, totalPages } = useMemo(() => {
    return { currentPage: params.pageIndex, totalPages: params.totalPages };
  }, [params]);

  return (
    <div className="flex w-full items-center justify-between rounded-md border-t border-gray-200 bg-gray-100 p-2 md:p-4">
      <button
        onClick={() => handleChangePage && handleChangePage()}
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaChevronLeft />
        <span className="ml-2">Trước</span>
      </button>
      <span className="text-gray-700">
        Trang {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => handleChangePage && handleChangePage()}
        disabled={currentPage === totalPages}
        className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="mr-2">Sau</span>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PaginationFooter;
