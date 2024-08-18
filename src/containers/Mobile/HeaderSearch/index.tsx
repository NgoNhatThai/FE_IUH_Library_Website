'use client';
import LeftArrow from '@/assets/svg/left-arrow.svg';
import searchIcon from '@/assets/svg/search.svg';
import { useDebounce } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const MobileHeader: React.FC = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [searchText, setSearchText] = React.useState<string>('');
  const searchDebouce = useDebounce(searchText, 500);

  const handleSearch = (term: string) => {
    setSearchText(term);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchDebouce) {
      params.set('name', searchDebouce);
    } else {
      params.delete('name');
    }
    replace(`${pathname}?${params.toString()}`);
  }, [searchDebouce]);

  return (
    <header className=" bg-[var(--bg-header)] py-2 px-1">
      <div className='container flex items-center'>
        <Link href={'/'} className="text-blue-500 focus:outline-none">
          <Image
            src={LeftArrow}
            width={20}
            height={20}
            alt="back"
            color="white"
          />
        </Link>
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full rounded-md border border-gray-300 px-2 md:px-4 py-1.5 text-sm focus:border-transparent focus:outline-none focus:ring-0"
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Image src={searchIcon} alt="Search Icon" width={20} height={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
