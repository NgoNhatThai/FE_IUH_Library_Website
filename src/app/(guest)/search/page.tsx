import SearchedBook from '@/containers/SearchedBook';
import { Spin } from 'antd';
import { Suspense } from 'react';

const ResultSearchPage = async () => {
  return (
    <Suspense fallback={<Spin />}>
      <div
        id="main-search-product"
        className="flex max-h-screen flex-col bg-[--background-light-color]"
      >
        <SearchedBook />
      </div>
    </Suspense>
  );
};

export default ResultSearchPage;
