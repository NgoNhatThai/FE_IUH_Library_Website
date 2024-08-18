'use client';
import searchIcon from '@/assets/svg/search.svg';
import { PAGE_DEFAULT } from '@/constants/defaultValue';
import { PRODUCT, SEARCH } from '@/constants';
import { useDebounce } from '@/hooks';
import { OrganizationModel } from '@/models';
import { RootState } from '@/redux';
import { productService } from '@/services/productService';
import { QueryKey } from '@/types/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';

const SearchHeader: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showAllResults, setShowAllResults] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const searchDebounce = useDebounce(searchTerm, 1000);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const storeInfo = useSelector<RootState, OrganizationModel>(
    (state) => state.storeStore.storeInfo,
  );

  const { data: productData } = useInfiniteQuery(
    [QueryKey.PRODUCT, storeInfo?.id, searchDebounce],
    async ({ pageParam = 0 }) => {
      if (!storeInfo?.id) return null;
      const params = {
        pageIndex: pageParam,
        pageSize: PAGE_DEFAULT,
        isHaveChildren: false,
        display: true,
        organizationId: storeInfo.id,
        sortBy: 'orderNumber',
        name: searchTerm,
      };
      const response = await productService.products(params);
      return response;
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage?.last) {
          return Number(lastPage?.pageable?.pageNumber || 0) + 1;
        }
        return undefined;
      },
    },
  );

  useEffect(() => {
    if (productData) {
      const products = productData.pages.map((page) => page?.content).flat();
      setSearchResults(products);
    } else {
      setSearchResults([]);
    }
  }, [productData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleShowAllResults = () => {
    setShowAllResults(true);
    router.push(SEARCH);
  };

  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    if (windowWidth < 768) {
      router.push(SEARCH);
    }
  };

  return (
    <div
      className="relative mx-1 flex flex-grow rounded-md border border-gray-300 bg-white md:mx-4"
      onClick={handleOnClick}
    >
      <input
        readOnly={windowWidth < 768}
        type="text"
        placeholder="Tìm kiếm sách ..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full rounded-md border px-2 py-1 pr-5 text-xs text-black focus:border-transparent focus:outline-none sm:py-2 md:pr-8"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center md:pr-3">
        <Image src={searchIcon} alt="Search Icon" width={20} height={20} />
      </div>
      {searchDebounce && searchResults && (
        <div className="absolute left-0 top-full z-10 mt-2 max-h-80 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {searchResults.length > 0 ? (
            <>
              {searchResults
                .slice(0, showAllResults ? searchResults.length : 3)
                .map((result, index) => (
                  <p
                    key={index}
                    className="cursor-pointer border-b border-gray-200 px-4 py-2 text-xs text-[--text-light-color] last:border-b-0 hover:text-blue-500"
                    onClick={() => {
                      setSearchTerm('');
                      router.push(`${PRODUCT}/${result.id}`);
                    }}
                  >
                    {result.name}
                  </p>
                ))}
              {!showAllResults && searchResults.length > 3 && (
                <button
                  onClick={handleShowAllResults}
                  className="w-full px-4 py-2 text-blue-500 hover:bg-gray-100 focus:outline-none"
                >
                  Xem thêm
                </button>
              )}
            </>
          ) : (
            <div className="px-4 py-2 text-gray-500">
              Không tìm thấy sản phẩm
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
