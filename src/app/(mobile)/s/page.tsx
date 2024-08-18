import { PAGE_DEFAULT } from '@/constants/defaultValue';
import MobileHeader from '@/containers/Mobile/HeaderSearch';
import MainSearch from '@/containers/Mobile/MainSearch';
import { SearchParams } from '@/types/api';


const ResultSearchPage = async ({
  searchParams,
}: {
  searchParams?: {
    name?: string;
    page?: number;
  };
}) => {
  const params: SearchParams = {
    name: searchParams?.name,
    pageIndex: searchParams?.page || 0,
    pageSize: PAGE_DEFAULT,
    isHaveChildren: false,
    display: true,
    sortBy: 'orderNumber',
  };
  return (
    <div
      id="main-search-product"
      className="max-h-screen flex flex-col bg-[--background-light-color]"
    >
      <MobileHeader />
      <MainSearch params={params} />
    </div>
  );
};

export default ResultSearchPage;
